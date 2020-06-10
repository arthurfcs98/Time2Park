const firebase = require("firebase/app")
require("firebase/database")
const firebaseConfig = {
  apiKey: "AIzaSyA-USx4ZtknNFCmyzLmMxLYzFzHapg2o8Y",
  authDomain: "primeiro-contato.firebaseapp.com",
  databaseURL: "https://primeiro-contato.firebaseio.com",
  projectId: "primeiro-contato",
  storageBucket: "primeiro-contato.appspot.com",
};

const five = require("johnny-five");
const board = new five.Board();


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase functions 
async function dbStatus(){
  const snapshot = await firebase.database()
    .ref('Status')
    .once("value");
  return snapshot.val();
}

function setStatus(status) {
  firebase.database().ref("Status").set(status);
}
// Initialize the new Board (arduino Uno)
board.on("ready", function() {


  const leds = {
    livre: new five.Led(8),
    ocupado: new five.Led(13),
    reservado: new five.Led(4)
  }

  const sensor = new five.Sensor.Digital(2);

  const dbInitial = 'livre'

  let dbCurrentStatus = dbInitial
  // This will grant access to the led instance
  board.repl.inject({
    livre: leds.livre,
    ocupado: leds.ocupado,
    reservado: leds.reservado
  });  

  const dbChange = firebase.database().ref("Status")

  dbChange.on("value", snapshot => {
    if(snapshot.val() == dbCurrentStatus){
      return console.log('Não entrou no switch')
    }
    switch(snapshot.val()) {
      case 'reservado': 
        dbCurrentStatus = snapshot.val()
        changeLed([snapshot.val(), "livre", 'ocupado'])
        break

      case 'livre': 
        changeLed([snapshot.val(), "reservado", 'ocupado'])
        break

      case 'ocupado': 
        changeLed([snapshot.val(), "livre", 'reservado'])
        break
      default: 
        console.log('Invalid Data')
        break
    }
  })
  
  sensor.on('change', function () {
    setTimeout(() => {
      if(dbCurrentStatus == 'reservado' && this.value){
        return changeLed(['reservado', "livre", 'ocupado'])
      }
      if(this.value){
        dbCurrentStatus = 'livre'
        setStatus(dbCurrentStatus)
        return changeLed(["livre", "reservado", 'ocupado'])
      }
      dbCurrentStatus = 'ocupado'
        setStatus(dbCurrentStatus)
      return changeLed(['ocupado', "reservado", 'livre'])
    }, 2000);
    
  })

  function changeLed(operationLeds) {
    leds[operationLeds[0]].on()
    leds[operationLeds[1]].off()
    leds[operationLeds[2]].off()
  };

})
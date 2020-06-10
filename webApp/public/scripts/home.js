const reservButton = document.querySelector("#reserv")



function reservSpot(event) {
    let status = reservButton.getAttribute('data-state')

    switch(status){
        case 'livre': 
            firebase.database().ref("Status").set('reservado')
            break
        case 'ocupado': 
            alert("Vaga ocupada")
            break
        case 'reservado': 
             alert("Vaga reservada")
            break
        default: 
            console.log('Valor invalido')
    }
}

addEventListener("click", reservSpot)

firebase.database().ref('Status').on("value", snapshot => {
    let dbCurrent = snapshot.val()
    switch(dbCurrent){
        case 'livre': 
            reservButton.setAttribute('data-state', dbCurrent)
            reservButton.src = "/assets/free.svg"
            break
        case 'ocupado': 
            reservButton.setAttribute('data-state', dbCurrent)
            reservButton.src = "/assets/occupied.svg"

            break
        case 'reservado': 
            reservButton.setAttribute('data-state', dbCurrent)
            reservButton.src = "/assets/reserve.svg"
            break
        default: 
            console.log('Valor invalido')
    }

})

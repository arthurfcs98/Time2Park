const submitForm = document.querySelector("form")

function booked(event){
    event.preventDefault()
    const name = document.querySelector("#name").value.toUpperCase()
    const password = document.querySelector("#password").value
    firebase.database().ref("Status").set('reservado')
    firebase.database().ref("Nome").set(name)
    firebase.database().ref("Senha").set(password).then(()=>{
        submitForm.submit()
     })
}
submitForm.addEventListener('submit', booked)

firebase.database().ref('Status').on("value", snapshot => {
    let dbCurrent = snapshot.val()
    if(dbCurrent !== 'livre'){
        const vaga1 = document.querySelector("#vaga1")
        return vaga1.disabled = true
    }
    return vaga1.disabled = false

})
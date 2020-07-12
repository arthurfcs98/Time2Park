let password = ''
const modalSubmit = document.querySelector('#modal form')

firebase.database().ref('Status').on("value", snapshot => {
    const currentStatus = snapshot.val()
    firebase.database().ref('Nome').on("value",snap =>{
        const currentName = snap.val()
        firebase.database().ref('Senha').on("value",snap =>{
            const img = document.querySelector('#img1')
            const currentPassword = snap.val()
            password = currentPassword
            const status = document.querySelector('#status1')
            const nome = document.querySelector('#nome1')

            switch(currentStatus){
                case 'livre':
                    nome.innerHTML = `Nome:  Sem informação`
                    status.innerHTML = `Status: ${currentStatus}`
                    img.src = "/assets/free.svg"
                    break
                case 'ocupado':
                    nome.innerHTML = `Nome: Sem informação`
                    status.innerHTML = `Status: ${currentStatus}`
                    img.src = "/assets/occupied.svg"
                    break
                case 'reservado':
                    nome.innerHTML = `Nome: ${currentName}`
                    status.innerHTML = `Status: ${currentStatus}`
                    img.src = "/assets/reserve.svg"
                    break
                    default:
                        console.log("valor invalido")
            }

            
        })
    })
})

function cancelar(){
    const modal = document.querySelector('#modal')
    modal.classList.remove("hide")
}
function fechar(){
    const modal = document.querySelector('#modal')
    modal.classList.add("hide")
}

modalSubmit.addEventListener('submit', verificarSenha)
function verificarSenha(event){
    event.preventDefault()
    const senha = document.querySelector("#senha").value
    const aviso = document.querySelector("#modal h1")
    if(senha === password){
        const aviso = document.querySelector("#modal h1")
        aviso.innerHTML = 'Cancelamento efetuado'
        modalSubmit.classList.add("hide")
        firebase.database().ref("Status").set('livre')
        firebase.database().ref("Nome").set('')
        firebase.database().ref("Senha").set('').then(()=>{
        modalSubmit.submit()
     })
    }else{
        alert('senha incorreta tente novamente')
    }
}
const express = require('express')
const server = express()

//Start server
server.listen(8000)

//Config the public folder
server.use(express.static('public'))

//Config routes
//home
server.get('/', (req, res) => {
    return res.sendFile(__dirname + "/views/home.html")
})

//reserve

//search


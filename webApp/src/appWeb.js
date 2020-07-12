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
server.get('/book', (req, res) => {
    return res.sendFile(__dirname + "/views/book.html")
})
//success
server.get('/book/success', (req, res) => {
    return res.sendFile(__dirname + "/views/booksuccess.html")
})
//search
server.get('/search', (req, res) => {
    return res.sendFile(__dirname + "/views/search.html")
})

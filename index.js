const express = require('express')
const app = express()


const dataService = require('./services/data.service')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("GET METHOD")
})

app.post('/', (req, res) => {
    res.send("POST METHOD")
})

app.put('/', (req, res) => {
    res.send("PUT METHOD")
})

app.patch('/', (reg, res) => {
    res.send("PATCH METHOD")
})

app.delete('/', (req, res) => {
    res.send("DELETE METHOD")
})



app.post('/register', (req, res) => {
    const result = dataService.register(req.body.acno, req.body.uname, req.body.password)
    res.status(result.statusCode).json(result)

})

app.post('/login', (req, res) => {
    const result = dataService.login(req.body.acno, req.body.pswd)
    res.status(result.statusCode).json(result)
})

app.post('/deposit', (req, res) => {
    const result = dataService.deposit(req.body.acno, req.body.password, req.body.amt)
    res.status(result.statusCode).json(result)
})

app.post('/withdraw', (req, res) => {
    const result = dataService.withdraw(req.body.acno, req.body.password, req.body.amt)
    res.status(result.statusCode).json(result)
})



app.listen(3000, () => {
    console.log("server started at port number:3000")
})

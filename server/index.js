const routerApi = require('./router')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use('/api', routerApi)

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../upload')))

app.listen(3000)
console.log('success listen at port: 3000')

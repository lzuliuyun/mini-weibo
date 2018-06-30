const routerApi = require('./router')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use('/api', routerApi)

app.listen(3000)
console.log('success listen at port: 3000')

const routerApi = require('./router')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const resizeImage = require('./resizeImage')
const RequestSplitter = require('./requestSplitter')
const app = express()

app.use(bodyParser.json())
app.use('/api', routerApi)

// image service
// http://localhost:3000/api/w290/images/upload/0a72cec0-7f44-11e8-9260-c144568577bd.jpeg
app.get(RequestSplitter.urlMatch, (req, res, next) => {
  resizeImage.resize(req, res, next)
})

app.use(express.static(path.join(__dirname, '../dist')))
app.use('/images', express.static(path.join(__dirname, '../images')))

app.listen(3000)
console.log('success listen at port: 3000')

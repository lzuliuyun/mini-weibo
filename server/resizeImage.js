const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const crypto = require('crypto')
const config = require('./config')
const RequestSplitter = require('./requestSplitter')

function cryptStr (str) {
  var md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}

function outputImage (thumbPath, res) {
  var content = fs.readFileSync(thumbPath, 'binary')
  res.writeHead(200, 'Ok')
  res.write(content, 'binary')
  res.end()
}

module.exports = {
  resize (req, res, next) {
    var result = new RequestSplitter(req.path, req.query)
    var options = result.mapOptions()
    res.type(`image/${options.format || 'png'}`)

    var thumbPath = path.join(__dirname, '../' + config.imageStorage.thumb) + cryptStr(req.path) + '.' + options.format
    if (fs.existsSync(thumbPath)) {
      outputImage(thumbPath, res)
    } else {
      this.resizeImage(options, thumbPath, res).then(() => {
        outputImage(thumbPath, res)
      })
    }
  },
  resizeImage (options, thumbPath) {
    // http://localhost:3000/images/upload/0a72cec0-7f44-11e8-9260-c144568577bd.jpeg
    let imagePath = path.join(__dirname, '../' + options.imagefile)

    let transform = sharp(imagePath)
    transform = transform.toFormat(options.format)
    let width = (options.width && parseInt(options.width)) || undefined
    let height = (options.height && parseInt(options.height)) || undefined
    transform = transform.resize(width, height)
    return transform.toFile(thumbPath)
  }
}

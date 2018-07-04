const express = require('express')
const router = express.Router()
const api = require('./api')
const resizeImage = require('./resizeImage')
const RequestSplitter = require('./requestSplitter')
const multer = require('multer')
const config = require('./config')
const uuid = require('uuid/v1')

const storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, config.imageStorage.path)
  },
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split('.')
    cb(null, uuid() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 添加配置文件到muler对象。
const upload = multer({
  storage: storage
})

// mblog
router.get('/mblog', (req, res, next) => {
  api.getMblogs(req, res, next)
})

router.post('/mblog', (req, res, next) => {
  api.addMblog(req, res, next)
})

router.get('/mblog:/id', (req, res, next) => {
  api.getMblog(req, res, next)
})

router.put('/mblog/:id', (req, res, next) => {
  api.updateMblog(req, res, next)
})

router.delete('/mblog/:id', (req, res, next) => {
  api.deleteMblog(req, res, next)
})

router.post('/mblog/:id/praise', (req, res, next) => {
  api.updateMblogPraise(req, res, next)
})

// draft
router.get('/draft', (req, res, next) => {
  api.getDraft(req, res, next)
})

// comment
router.get('/comment', (req, res, next) => {
  api.getComment(req, res, next)
})

router.post('/comment', (req, res, next) => {
  api.addComment(req, res, next)
})

router.delete('/comment/:id', (req, res, next) => {
  api.deleteComment(req, res, next)
})

// image
router.get('/image', (req, res, next) => {
  api.getImage(req, res, next)
})
router.post('/image', upload.array('image[]', 9), (req, res, next) => {
  api.uploadImage(req, res, next)
})

router.delete('/image/:id', (req, res, next) => {
  api.deleteImage(req, res, next)
})

// image service
router.get(RequestSplitter.urlMatch, (req, res, next) => {
  resizeImage.resize(req, res, next)
  // var result = new RequestSplitter(req.path, req.query)
  // var options = result.mapOptions()
  // console.log(options)
  // res.type(`image/${options.format || 'png'}`)

  // var thumbPath = path.join(__dirname, '../' + config.imageStorage.thumb) + cryptStr(req.path) + '.' + options.format

  // resizeImage.resizeImage(options).pipe(res).pipe(fs.createWriteStream(thumbPath))
})

module.exports = router

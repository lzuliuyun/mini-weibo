const express = require('express')
const router = express.Router()
const api = require('./api')

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

router.get('/draft', (req, res, next) => {
  api.getDraft(req, res, next)
})

router.get('/comment', (req, res, next) => {
  api.getComment(req, res, next)
})

router.post('/comment', (req, res, next) => {
  api.addComment(req, res, next)
})

router.delete('/comment/:id', (req, res, next) => {
  api.deleteComment(req, res, next)
})
module.exports = router

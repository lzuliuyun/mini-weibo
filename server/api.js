const mysql = require('mysql')
const dbConfig = require('./config')
const sqlMap = require('./sqlMap')

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  charset: dbConfig.mysql.charset,
  // 多语句查询
  multipleStatements: true
})

module.exports = {
  getMblogs (req, res, next) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.getMblogs
      conn.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  addMblog (req, res, next) {
    var content = req.body.content
    var publish = +req.body.publish || 0
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.addMblog
      var date = +new Date()
      conn.query(sql, [content, date, publish], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  getMblog (req, res, next) {
    var id = req.params.id
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.getMblog
      conn.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  updateMblog (req, res, next) {
    var id = req.params.id
    var content = req.body.content
    var publish = +req.body.publish || 0
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.updateMblog
      conn.query(sql, [content, publish, id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  deleteMblog (req, res, next) {
    var id = req.params.id
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.deleteMblog
      conn.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  updateMblogPraise (req, res, next) {
    var id = req.params.id
    var praise = req.body.praise
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.updateMblogPraise
      conn.query(sql, [praise, id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  getDraft (req, res, next) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.mblog.getDraft
      conn.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  addComment (req, res, next) {
    var mblogid = req.body.mblogid
    var content = req.body.content
    var date = +new Date()
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.comment.addComment
      conn.query(sql, [content, date, mblogid], (err, result) => {
        if (err) throw err
        result.date = date
        res.json(result)
        conn.release()
      })
    })
  },
  getComment (req, res, next) {
    var mblogid = req.query.mblogid
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.comment.getComment
      conn.query(sql, [mblogid], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  deleteComment (req, res, next) {
    var id = req.params.id
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.comment.deleteComment
      conn.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  uploadImage (req, res, next) {
    var files = req.files
    var imageSqlData = []
    var date = +new Date()
    var mblogid = req.body.mblogid
    files.forEach((file) => {
      imageSqlData.push([file.originalname, file.path, date, mblogid])
    })
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.image.addImages
      conn.query(sql, [imageSqlData], (err, result) => {
        if (err) throw err

        var sqlGetImages = sqlMap.image.getImages
        conn.query(sqlGetImages, [mblogid], (err, result) => {
          if (err) throw err

          result = result.filter((curRes) => {
            return !!imageSqlData.find((data) => {
              return data.includes(curRes.path) && data.includes(curRes.name) && data.includes(curRes.date)
            })
          })

          res.json(result)
          conn.release()
        })
      })
    })
  },
  getImage (req, res, next) {
    var mblogid = req.query.mblogid
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.image.getImages
      conn.query(sql, [mblogid], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  },
  deleteImage (req, res, next) {
    var id = req.params.id
    pool.getConnection((err, conn) => {
      if (err) throw err
      var sql = sqlMap.image.deleteImage
      conn.query(sql, [id], (err, result) => {
        if (err) throw err
        res.json(result)
        conn.release()
      })
    })
  }
}

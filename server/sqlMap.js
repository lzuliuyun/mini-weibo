module.exports = {
  mblog: {
    getMblogs: 'select * from mblogView where publish = 1 and isdelete = 0 ORDER BY date DESC',
    addMblog: 'insert into mblog(content, date, publish) VALUES (?, ?, ?)',
    getMblog: 'select * from mblog where id = ? and isdelete = 0',
    updateMblog: 'update mblog set content = ?, publish = ? where id = ?',
    deleteMblog: 'update mblog set isdelete = 1 where id = ?',
    updateMblogPraise: 'update mblog set praise = ? where id = ?',
    getDraft: 'select * from mblog where publish = 0 and isdelete = 0 ORDER BY date DESC'
  },
  comment: {
    addComment: 'insert into comment(content, date, mblogid) values (?, ?, ?)',
    getComment: 'select * from comment where mblogid = ? order by date asc',
    deleteComment: 'delete from comment where id = ?'
  },
  image: {
    addImages: 'insert into image (name, path, date, mblogid) values ?',
    getImages: 'select * from image where mblogid = ? and isdelete = 0 order by date',
    deleteImage: 'update image set isdelete = 1 where id = ?'
  }
}

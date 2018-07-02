module.exports = {
  mblog: {
    getMblogs: 'select * from mblogView where publish = 1 ORDER BY date DESC',
    addMblog: 'insert into mblog(content, date, publish) VALUES (?, ?, ?)',
    getMblog: 'select * from mblog where id = ?',
    updateMblog: 'update mblog set content = ?, publish = ? where id = ?',
    deleteMblog: 'delete from mblog where id = ?',
    updateMblogPraise: 'update mblog set praise = ? where id = ?',
    getDraft: 'select * from mblog where publish = 0 ORDER BY date DESC'
  },
  comment: {
    addComment: 'insert into comment(content, date, mblogid) values (?, ?, ?)',
    getComment: 'select * from comment where mblogid = ? order by date asc',
    deleteComment: 'delete from comment where id = ?'
  }
}

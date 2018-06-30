module.exports = {
  mblog: {
    getMblogs: 'select * from mblog where publish = 1 ORDER BY date DESC',
    addMblog: 'insert into mblog(content, date, publish) VALUES (?, ?, ?)',
    getMblog: 'select * from mblog where id = ?',
    updateMblog: 'update mblog set content = ?, publish = ? where id = ?',
    deleteMblog: 'delete from mblog where id = ?',
    updateMblogPraise: 'update mblog set praise = ? where id = ?'
  }
}

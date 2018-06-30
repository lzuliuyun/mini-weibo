export function getRelativeTimeInfo (time) {
  let timeInfo = ''
  let result = new Date() - new Date(time)
  let minutes = result / 1000 / 60 | 0
  let hours = result / 1000 / 60 / 60 | 0
  let days = result / 1000 / 60 / 60 / 24 | 0
  let months = result / 1000 / 60 / 60 / 24 / 30 | 0
  let years = result / 1000 / 60 / 60 / 24 / 30 / 12 | 0

  // minute
  if (minutes === 0) {
    timeInfo = '刚刚'
  } else if (minutes < 60) {
    timeInfo = minutes + '分钟前'
  } else {
    // hours
    if (hours < 3) {
      timeInfo = hours + '小时前'
    } else if (hours < 24) {
      timeInfo = '今天'
    } else {
      // days
      if (days > 2) {
        if (months === 0) {
          timeInfo = months + '天前'
        } else if (months < 12) {
          timeInfo = months + '月前'
        } else {
          timeInfo = years + '年前'
        }
      } else if (days === 2) {
        timeInfo = '前天'
      } else if (days === 1) {
        timeInfo = '昨天'
      }
    }
  }

  return timeInfo
}

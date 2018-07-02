export function getRelativeTimeInfo (time) {
  let timeInfo = ''
  let timeDayInfo = ''
  let tempTime = new Date(time)
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
      let publishDate = +new Date(time)
      let curDate = new Date()
      let curStartDate = +new Date(curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + (curDate.getDay() + 1))

      timeInfo = publishDate < curStartDate ? '昨天' : '今天'
      timeDayInfo = publishDate < curStartDate ? (tempTime.getMonth() + 1) + '-' + (tempTime.getDay() + 1) : ''
    } else {
      // days
      timeDayInfo = (tempTime.getMonth() + 1) + '-' + (tempTime.getDay() + 1)
      if (days > 2) {
        if (months === 0) {
          timeInfo = days + '天前'
        } else if (months < 12) {
          timeInfo = months + '月前'
        } else {
          timeInfo = years + '年前'
          timeDayInfo = tempTime.getFullYear() + '-' + timeDayInfo
        }
      } else if (days === 2) {
        timeInfo = '前天'
      } else if (days === 1) {
        timeInfo = '昨天'
      }
    }
  }

  return timeInfo + ' ' + timeDayInfo
}

export function throttle (fn, time) {
  let canRun = true
  let timerId = null

  let throttled = function () {
    if (canRun) {
      canRun = false
      timerId = setTimeout(() => {
        fn.apply(this, arguments)
        canRun = true
      }, time)
    }
  }

  throttled.cancel = () => {
    clearTimeout(timerId)
    canRun = false
  }

  return throttled
}

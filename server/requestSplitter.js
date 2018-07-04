// https://github.com/tbasse/resize-server/blob/80e546988201623ae9e066a4755dd18837173343/server.js

var path = require('path')

function RequestSplitter (url, query) {
  this.url = url || ''
  this.urlMatch = RequestSplitter.urlMatch
  this.query = query || ''
}

function fixUrlProtocol (url) {
  return url.replace(/^([a-z]+:)\/+([^\/])/, '$1//$2')
}

RequestSplitter.urlMatch = new RegExp([
  '^\/?(c|w|h)?([0-9]+)x?([0-9]+)?,?',
  '(c|e|w|n(?:e|w)?|s(?:e|w)?)?',
  '\/?(png|jpg)?,?([0-9]+)?',
  '\/(.*)$'
].join(''))

RequestSplitter.prototype.mapOptions = function () {
  var param = this.url.match(this.urlMatch)
  var options

  param[7] = fixUrlProtocol(param[7])

  options = {
    action: param[1] === 'c' ? 'crop' : 'resize',
    width: param[1] === 'h' ? '' : param[2],
    height: param[1] === 'w' ? '' : param[1] === 'h' ? param[2] : param[3],
    gravity: param[4] || 'c',
    format: param[5] || 'jpg',
    quality: param[6] || '80',
    imagefile: param[7],
    url: param[7] + this.buildQueryString()
  }

  options.quality = Math.round(Math.min(100, Math.max(0, options.quality)))
  options.suffix = path.extname(options.imagefile)

  return options
}

RequestSplitter.prototype.buildQueryString = function () {
  var queryArray = []

  for (var i in this.query) {
    if (this.query.hasOwnProperty(i)) {
      queryArray.push(i + '=' + encodeURIComponent(this.query[i]))
    }
  }

  return '?' + queryArray.join('&')
}

module.exports = RequestSplitter

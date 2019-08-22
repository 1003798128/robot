const bytesToSize = function (bytes) {
  if (bytes === 0) return '0 B'
  if (bytes === '') return '-'
  var k = 1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i]
}
const formaTime = function (val) {
  if (val !== '' || undefined || null) {
    return new Date(val).format('yyyy-MM-dd HH:mm')
  } else {
    return '永久有效'
  }
}
const sliceType = function (val, num) {
  if (val !== '' || undefined) {
    var point = val.lastIndexOf('.')
    var type = val.substring(point + 1).toLowerCase()
    if (this.isDir === 1) {
      return 'dir'
    }
    if (type === 'jpg' || type === 'gif' || type === 'JPG' || type === 'GIF' || type === 'png') {
      return 'pic'
    } else if (type === 'avi' || type === 'rmvb' || type === 'rm' || type === 'asf' || type === 'divx' || type === 'mpg' || type === 'mpeg' || type === 'mpe' || type === 'mp4' || type === 'mkv' || type === 'vob ') {
      return 'video'
    } else if (this.isDir === 1) {
      return 'dir'
    } else if (type === 'txt') {
      return 'txt'
    } else if (type === 'pdf') {
      return 'pdf'
    } else if (type === 'doc' || type === 'docx') {
      return 'word'
    } else if (type === 'ppt' || type === 'pptx') {
      return 'ppt'
    } else if (type === 'xls' || type === 'xlsx') {
      return 'excel'
    } else if (type === 'html' || type === 'htm') {
      return 'html'
    } else if (type === 'wps' || type === 'wpt') {
      return 'wps'
    } else if (type === 'zip' || type === 'rar') {
      return 'package'
    } else {
      return 'default'
    }
  }
}

const GetQueryString = function (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

const sliceName = function (val, le) {
  if (val.length > le) {
    return val.substring(0, le / 2) + '...' + val.substring(val.length - le / 2)
  } else {
    return val
  }
}

// eslint-disable-next-line
Array.prototype.remove = function (obj) {
  for (var i = 0; i < this.length; i++) {
    var temp = this[i]
    if (!isNaN(obj)) {
      temp = i
    }
    if (temp == obj) {
      for (var j = i; j < this.length; j++) {
        this[j] = this[j + 1]
      }
      this.length = this.length - 1
    }
  }
}

// eslint-disable-next-line
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12,
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  var week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export {
  bytesToSize,
  formaTime,
  sliceType,
  GetQueryString,
  sliceName
}

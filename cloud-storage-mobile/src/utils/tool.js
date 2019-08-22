let a = {
  transformSize (limit) {
    if (limit === '') {
      return '-'
    }
    var size = ''
    if (limit < 1 * 1024) {
      size = limit.toFixed(2) + 'B'
    } else if (limit < 1 * 1024 * 1024) {
      size = (limit / 1024).toFixed(2) + 'KB'
    } else if (limit < 1 * 1024 * 1024 * 1024) {
      size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }

    var sizestr = size + ''
    var len = sizestr.indexOf('.')
    var dec = sizestr.substr(len + 1, 2)
    if (dec === '00') {
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
    }
    return sizestr
    // if (bytes === 0) return '0 B'
    // if (bytes < 1) return '1 B'
    // if (bytes === '') return '-'
    // var k = 1000
    // var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    // var i = Math.floor(Math.log(bytes) / Math.log(k))
    // return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i]
  },
  transformTime (val) {
    val = new Date(val)
    if (val !== '' || undefined || null) {
      return a.formatTime('yyyy-MM-dd HH:mm', val)
    } else {
      return '-'
    }
  },
  transformFileCategory (val) {
    return val === 1 ? '个人文件' : '共享文件'
  },
  formatTime (fmt, val) {
    var o = {
      'M+': val.getMonth() + 1,
      'd+': val.getDate(),
      'h+': val.getHours() % 12 === 0 ? 12 : val.getHours() % 12,
      'H+': val.getHours(),
      'm+': val.getMinutes(),
      's+': val.getSeconds(),
      'q+': Math.floor((val.getMonth() + 3) / 3),
      'S': val.getMilliseconds()
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
      fmt = fmt.replace(RegExp.$1, (val.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[val.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },
  // 对字符串进行加密
  compileStr (code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
    }
    return escape(c)
  },
  // 对字符串进行解密
  uncompileStr (code) {
    code = unescape(code)
    var c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for (var i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
    }
    return c
  },
  checkVal (value) {
    let pattern = /[\|,/<,/>,\*,\?,\,,\/,\\,\[,\]]/
    if (pattern.test(value)) {
      return false
    } else {
      return true
    }
  },
  checkVal2 (value) {
    let pattern = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
    if (pattern.test(value)) {
      return false
    } else {
      return true
    }
  }
}
export default a

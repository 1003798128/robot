const getLocalStorage = function (localStorageName, key) {
  if (key && window.$storage.get(localStorageName)) {
    return JSON.parse(window.$storage.get(localStorageName))[key]
  } else {
    return window.$storage.get(localStorageName)
  }
}
const getSessionStorage = function (localStorageName, key) {
  if (key && window.sessionStorage[localStorageName]) {
    return JSON.parse(window.sessionStorage[localStorageName])[key]
  } else {
    return window.sessionStorage[localStorageName]
  }
}

const setLocalStorage = function (localStorageName, value) {
  window.$storage.set({ [localStorageName]: JSON.stringify(value) })
}

const newLocalStorage = function (localStorageName, localStorageValue) {
  if (typeof localStorageValue === 'object') {
    window.$storage.set({ [localStorageName]: JSON.stringify(localStorageValue) })
  } else {
    window.$storage.set({ [localStorageName]: localStorageValue })
  }
}

// 根据文件名称来显示文件图标
const getFileTypeIcon = function (fileName) {
  if (fileName !== '' || fileName !== undefined) {
    var point = fileName.lastIndexOf('.')
    var type = fileName.substring(point + 1).toLowerCase()
    if (type === 'jpg' || type === 'gif' || type === 'JPG' || type === 'GIF' || type === 'png') {
      return 'icon-picture-color1'
    } else if (type === 'avi' || type === 'rmvb' || type === 'rm' || type === 'asf' || type === 'divx' || type === 'mpg' || type === 'mpeg' || type === 'mpe' || type === 'mp4' || type === 'mkv' || type === 'vob ') {
      return 'icon-video-color1'
    } else if (type === 'WAVE' || type === 'AIFF' || type === 'MPEG' || type === 'MP3' || type === 'MIDI' || type === 'mp3') {
      return 'icon-music-color1'
    } else if (type === 'txt') {
      return 'icon-txt-color1'
    } else if (type === 'pdf') {
      return 'icon-pdf-color1'
    } else if (type === 'doc' || type === 'docx') {
      return 'icon-word-color1'
    } else if (type === 'ppt' || type === 'pptx') {
      return 'icon-ppt-color1'
    } else if (type === 'xls' || type === 'xlsx') {
      return 'icon-excel-color1'
    } else if (type === 'wps' || type === 'wpt') {
      return 'icon-word-color1'
    } else if (type === 'zip' || type === 'rar') {
      return 'icon-package-color1'
    } else {
      return 'icon-unknown-color1'
    }
  }
}

const bytesToSize = function (bytes) {
  if (bytes === 0) return '0 B'
  if (bytes === '') return '-'
  var k = 1024
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i]
}
const formaTime = function (value) {
  return value.substring(0, 4) + '/' + value.substring(4, 6) + '/' + value.substring(6, 8)
}
let setData_null = function (state) {
  state = state + 'List'
  // 获取登录id
  let userId = JSON.parse(window.sessionStorage.mobileData).id
  // 判断localStorage中是否存在该记录
  if (!window.$storage.get(state)) {
    window.$storage.set({ [state]: JSON.stringify([]) })
  }
  // 取出localStorage中该记录
  let stroge = JSON.parse(window.$storage.get(state))
  if (stroge === null) {
    stroge = []
  }
  stroge.forEach((val, index) => {
    if (val.id === userId) {
      if (state === 'downerrorList') {
        stroge[index].downerrorList = []
      }
      if (state === 'downsuccessList') {
        stroge[index].downsuccessList = []
      }
      if (state === 'uperrorList') {
        stroge[index].uperrorList = []
      }
      if (state === 'upsuccessList') {
        stroge[index].upsuccessList = []
      }
      window.$storage.set({ [state]: JSON.stringify(stroge) })
    }
  })
}
let setData = function (file, state) {
  state = state + 'List'
  // 获取登录id
  let userId = JSON.parse(window.sessionStorage.mobileData).id
  // 判断localStorage中是否存在该记录
  if (!window.$storage.get(state)) {
    window.$storage.set({ [state]: JSON.stringify([]) })
  }
  // 取出localStorage中该记录
  let stroge = JSON.parse(window.$storage.get(state))
  let flag = false
  stroge.forEach((val, index) => {
    if (val.id === userId) {
      if (state === 'downerrorList') {
        stroge[index].downerrorList.push(file)
      }
      if (state === 'downsuccessList') {
        stroge[index].downsuccessList.push(file)
      }
      if (state === 'uperrorList') {
        stroge[index].uperrorList.push(file)
      }
      if (state === 'upsuccessList') {
        if (file.guid) {
          stroge[index].upsuccessList.push(file)
        } else {
          stroge[index].upsuccessList.forEach((value, indx, obj) => {
            if (value.fileId === file.fileId) {
              Object.assign(stroge[index].upsuccessList[indx], file)
            }
          })
        }
      }
      window.$storage.set({ [state]: JSON.stringify(stroge) })
      flag = true
    }
  })
  if (!flag) {
    if (state === 'downerrorList') {
      stroge.push({ id: userId, [state]: [file] })
    }
    if (state === 'downsuccessList') {
      stroge.push({ id: userId, [state]: [file] })
    }
    if (state === 'uperrorList') {
      stroge.push({ id: userId, [state]: [file] })
    }
    if (state === 'upsuccessList') {
      stroge.push({ id: userId, [state]: [file] })
    }
    window.$storage.set({ [state]: JSON.stringify(stroge) })
  }
}

const camera = function (succ) {
  var options = {
    // Some common settings are 20, 50, and 100
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    // In this app, dynamically set the picture source, Camera or photo gallery
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true // Corrects Android orientation quirks
  }
  navigator.camera.getPicture(function cameraSuccess (imageUri) {
    console.log(imageUri)
    window.resolveLocalFileSystemURL(imageUri, function success (fileEntry) {
      console.log(fileEntry)
      fileEntry.file(function (file) {
        console.log(file)
        succ(file)
      }, () => {
        console.log('file失败')
      })
    }, function () {})
  }, function cameraError (error) {
    console.debug('Unable to obtain picture: ' + error, 'app')
  }, options)
}

export default {
  newLocalStorage,
  getLocalStorage,
  getSessionStorage,
  getFileTypeIcon,
  bytesToSize,
  formaTime,
  setLocalStorage,
  setData,
  setData_null,
  camera
}

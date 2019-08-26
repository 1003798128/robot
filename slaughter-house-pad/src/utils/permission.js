const permissions = cordova.plugins.permissions

// const permissionList = [permissions.CAMERA, permissions.REQUEST_INSTALL_PACKAGES, permissions.WRITE_EXTERNAL_STORAGE]
const permissionList = [permissions.REQUEST_INSTALL_PACKAGES, permissions.WRITE_EXTERNAL_STORAGE]

const hasPermission = function (permissionList) {
  const promises = []
  permissionList.forEach((permission) => {
    promises.push(new Promise(function (resolve) {
      permissions.hasPermission(permission, (status) => {
        if (!status.hasPermission) {
          resolve(permission)
        } else {
          resolve()
        }
      }, null)
    }))
  })
  return Promise.all(promises)
}
const permissionRequest = function (permissionList) {
  const promises = []
  console.log('开始')
  permissionList.forEach((permission) => {
    promises.push(new Promise(function (resolve, reject) {
      if (permission) {
        permissions.requestPermission(permission, (status) => {
          console.log('成功')
          console.dir(status)
          if (status.hasPermission) {
            resolve()
          } else {
            reject()
          }
        }, (error) => {
          reject(error)
          console.dir(error)
        })
      } else {
        resolve()
      }
    }))
  })
  return Promise.all(promises)
}

const permissionCheck = function (permissionList) {
  return hasPermission(permissionList).then((permissionList) => {
    return permissionRequest(permissionList)
  })
}

export {
  permissionList,
  permissionCheck
}

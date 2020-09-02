release/js-v2.0
### 初次运行项目依次执行以下命令
```
cd cloud-storage-mobile  ---进入前端mobile工程
cnpm install             ---安装mobile工程依赖
cnpm run build           ---打包mobile项目
cd ../
cordova platforms add android  --增加android工程依赖
cordova build android    ---打包APK项目

打测试包 
cordova build android
打生产包 
cordova build android --release --buildConfig ./build/android/build.json
```

"cordova-android": "^7.0.0"  --- 项目使用android的版本为7.0.0
"cordova-plugin-app-version": "^0.1.9", ---获取当前app的版本号
"cordova-plugin-camera": "^2.4.1",  --- 调用手机的摄像头
"cordova-plugin-compat": "^1.2.0", --- cordova-plugin-camera 插件依赖的插件
"cordova-plugin-file": "^6.0.1",   --- 文件系统插件，存储文件
"cordova-plugin-file-opener2": "^2.0.19", --- 打开本地安装的应用
"cordova-plugin-file-transfer": "^1.7.1",  ---文件上传和下载
"cordova-plugin-media": "^5.0.2", --- 获取app的录音权限
"cordova-plugin-splashscreen": "^5.0.2", --- app设置开机图片
"cordova-plugin-whitelist": "^1.3.3" ----用于配置协议的白名单。在Cordova引用创建时自动添加了这个插件

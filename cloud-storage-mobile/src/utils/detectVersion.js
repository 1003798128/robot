const detectVersion = () => {
  return `<div style="display: none;" class="updateApp">
  <div class="wrapper" style="z-index: 2001;position: absolute;">
    <div class="msbox">
        <div class="msbox-show">
        <div class="logo">
        <span class="iconfont icon-logo"></span>
</div>
        <div class="header">
            <div class="title">发现新版本: <span class="versionId"></span></div>
        </div>
        <div class="contentVersion"></div>
        <div class="footer">
        <span class="delay">稍后更新</span>
        <span class="ok rightNow">确定更新</span>
    </div>
</div>
        <div class="progress-wrapper" style="display: none">
            <p class="progress-title">正在下载新版本</p>
          <div class="progress" style="display: block;">
              <progress max="100" value="0"></progress>
              <em class="proNum">0%</em>
          </div>
          <p class="progress-scale">0/0</p>
        </div>
     </div>
   </div>
  <div class="model" style="z-index: 2000;"></div>
</div>`
}

export default detectVersion

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* background: #f7f7fa; */
  background: white;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
}

* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
  overflow: hidden;
}

body {
  height: auto;
  /* background-color: #ecf0f3; */
}
.icon {
  width: 0.56rem;
  height: 0.51rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.icon-excel-color1 {
  color: #36ab60;
}

.icon-pdf-color1 {
  color: #e0620d;
}

.icon-word-color1 {
  color: #2985fd;
}

.icon-txt-color1 {
  color: #17abe3;
}

.icon-html {
  color: #efc96d;
}

.icon-picture-color1 {
  color: #3ea362;
}

.icon-muisc-color1 {
  color: #ea5986;
}

.icon-folder-color {
  color: #fed531;
}
.icon-groupfolder-color {
  color: #47a3fb;
}
.icon-package-color1 {
  vertical-align: 0.1rem;
}
.icon-folder-add,
.icon-upload,
.icon-file-text1,
.icon-Image-recognition {
  font-size: 0.6rem;
  display: block;
  color: #e4393c;
}

.warn-icon {
  font-size: 0.8rem;
}
.warn-icon + span {
  font-family: PingFang-SC-Medium;
  font-size: 0.34rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.48rem;
  max-height: 300px;
  overflow: auto;
}
.icon-check-circle-o {
  font-size: 50px !important;
}
</style>

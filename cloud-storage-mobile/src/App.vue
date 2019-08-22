<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    background: #f7f7fa;
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
    background-color: #ecf0f3;
  }
  .icon {
    width: .56rem;
    height: .51rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon-excel-color1 {
    color: #36AB60;
  }

  .icon-pdf-color1 {
    color: #E0620D;
  }

  .icon-word-color1 {
    color: #2985FD;
  }

  .icon-txt-color1 {
    color: #17ABE3;
  }

  .icon-html {
    color: #EFC96D;
  }

  .icon-picture-color1 {
    color: #3EA362;
  }

  .icon-muisc-color1 {
    color: #EA5986;
  }

  .icon-folder-color {
    color: #FED531;
  }
  .icon-groupfolder-color{
    color: #47a3fb;
  }
  .icon-package-color1 {
    vertical-align: .1rem;
  }
  .icon-folder-add,.icon-upload,.icon-file-text1,.icon-Image-recognition{
    font-size: .6rem;
    display: block;
    color: #E4393C;
  }

  .warn-icon {
    font-size: .8rem;
  }
  .warn-icon + span {
    font-family: PingFang-SC-Medium;
    font-size: .34rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: .48rem;
    max-height: 300px;
    overflow: auto;
  }
  .icon-check-circle-o {
    font-size: 50px!important;
  }
</style>

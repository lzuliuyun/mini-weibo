<template>
  <div id="app">
    <div class="app-header">
      <div>Wechat SLB and GBB</div>
    </div>
    <div class="app-temp"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-header {
  width: 100%;
  height: 40px;
  vertical-align: middle;
  line-height: 40px;
  text-align: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, .08);
  color: rgba(0,0,0,0.87);
  position: fixed;
  z-index: 10;
  background-color: white;
}

.app-temp {
  height: 50px;
}

#app {
  font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 14px;
}

body {
  margin: 0;
  padding: 0;
}
</style>

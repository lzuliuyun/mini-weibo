<template>
  <div id="app">
    <div class="app-header">
      <router-link to="/">Wechat SLB and GBB</router-link>
    </div>
    <div class="app-temp"></div>
    <div class="app-image-container">
        <image-zoom-display></image-zoom-display>
    </div>
    <div>
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
          </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
      </router-view>
      <!-- <keep-alive exclude="comment">
        <router-view/>
      </keep-alive> -->
    </div>
  </div>
</template>

<script>

import ImageZoomDisplay from 'components/ImageZoomDisplay'

export default {
  name: 'App',
  components: {
    ImageZoomDisplay
  }
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
  position: fixed;
  z-index: 3;
  background-color: white;
}

.app-header a {
  color: rgba(0,0,0,0.87);
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.app-temp {
  height: 50px;
}

#app {
  font-family: Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
}
</style>

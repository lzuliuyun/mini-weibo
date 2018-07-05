<template>
  <div ref="imageZoomContainer"
      class="image-zoom-container"
      @click.prevent="hideImage"
      @touchstart.prevent="imageTouchStart"
      @touchmove.prevent="imageTouchMove"
      @touchend.prevent="imageTouchEnd"
      v-show="images.length">
    <div class="image-container" >
      <img :src="imageSrc" @dblclick="zoomImage">
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data () {
    return {
      touch: {},
      images: [],
      selectIndex: 0
    }
  },
  methods: {
    hideImage () {
      this.selectImage({
        images: [],
        selectIndex: 0
      })
    },
    zoomImage () {
    },
    imageTouchStart (e) {
      this.touch.init = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    imageTouchMove (e) {
      if (!this.touch.init) {
        return
      }

      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const left = 0
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
    },
    imageTouchEnd (e) {
      this.touch.init = false

      if (this.touch.percent === undefined) {
      } else if (this.touch.percent > 0.1) {
        const temp = --this.selectIndex
        this.selectIndex = temp < 0 ? this.images.length - 1 : temp
      } else {
        const temp = ++this.selectIndex
        this.selectIndex = temp === this.images.length ? 0 : temp
      }
    },
    ...mapActions(['selectImage'])
  },
  computed: {
    imageSrc () {
      return (this.images[this.selectIndex] && ('0/' + this.images[this.selectIndex].path)) || ''
    },
    ...mapGetters(['imageZoomList', 'imageZoomIndex'])
  },
  watch: {
    imageZoomList (newData, oldData) {
      this.images = newData
      if (this.images.length) {
        document.body.style.overflow = 'hidden'
        this.$refs.imageZoomContainer.style.top = window.pageYOffset + 'px'
      } else {
        document.body.style.overflow = 'inherit'
      }
    },
    imageZoomIndex (newIndex) {
      this.selectIndex = newIndex
    }
  }
}
</script>

<style scoped>
.image-zoom-container {
  position: absolute;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  background-color: black;
}

.image-zoom-container img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

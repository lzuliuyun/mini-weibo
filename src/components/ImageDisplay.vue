<template>
  <div class="image-display">
    <div class="image-display-container">
      <ul>
        <li v-for="(image, index) in resizeImages" :key="index" @click="onImageClick(index)">
          <div class="image-container">
            <img v-lazy="image.path" alt="加载中...">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      resizeImages: []
    }
  },
  methods: {
    onImageClick (index) {
      this.$emit('imageSelect', index)
    }
  },
  watch: {
    images (newImages, old) {
      this.resizeImages = newImages.map((img) => {
        return {
          id: img.id,
          path: '200\\' + img.path
        }
      })
    }
  }
}
</script>

<style scoped>
 ul {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  ul li {
    float: left;
    list-style: none;
    width: calc(100vw/3);
    height: calc(100vw/3);
    box-sizing: border-box;
    padding: 5px;
    /* display: inline-block; */
    vertical-align: top; /*not required*/
    position: relative;
  }

  ul li img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  ul li .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    /* border: 1px solid #eee;
    border-radius: 3px; */
  }

  ul li.btn-upload div {
    width: 100%;
    height: 100%;
    border: 1px solid black;
  }
</style>

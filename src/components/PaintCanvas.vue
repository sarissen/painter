<template>
  <div ref="container" class="container-fluid">
    <canvas ref="canvas" id="paint">
    </canvas>
  </div>
</template>

<script>
export default {
  name: 'PaintCanvas',
  data() {
    return {
    };
  },
  methods: {
    resize() {
      const dataUrl = this.$refs.canvas.toDataURL();
      this.$refs.canvas.width = this.$refs.container.offsetWidth;
      this.$refs.canvas.height = this.$refs.container.offsetHeight;
      this.loadImage(dataUrl);
    },
    loadImage(image = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg') {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const imageObj = new Image();

      imageObj.onload = () => {
        context.drawImage(imageObj, 0, 0);
      };
      imageObj.src = image;
    },
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize, false);
    this.loadImage();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  canvas {
    position: relative;
    top: 0;
    left: 0;
  }

  .container-fluid {
    padding: 0;
    height: 100%;
  }
</style>

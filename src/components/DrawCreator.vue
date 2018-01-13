<template>
  <div class="page">
    Draw a: {{ choice }}
    <paint-canvas @canvas-change="canvasChanged"/>
  </div>
</template>

<script>
  import PaintCanvas from './PaintCanvas';
  import store from './../classes/Store';

  const choices = ['dog', 'cat', 'school', 'shop', 'bicycle', 'car'];

  export default {
    components: { PaintCanvas },
    name: 'DrawCreator',
    data() {
      return {
        choice: '',
        shared: store.state,
      };
    },
    methods: {
      canvasChanged(dataUrl) {
        const socket = this.shared.socket;
        socket.emit('canvas', dataUrl);
      },
    },
    mounted() {
      this.choice = choices[Math.floor(Math.random() * choices.length)];
    },
  };
</script>

<style scoped lang="scss">
  .page {
    height: 100%;
  }
</style>

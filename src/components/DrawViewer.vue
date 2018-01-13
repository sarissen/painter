<template>
  <div class="container-fluid">
    Make a guess
    <img :src="dataUrl" alt="nodata" />
  </div>
</template>

<script>
  import store from './../classes/Store';

  export default {
    name: 'DrawViewer',
    data() {
      return {
        dataUrl: '',
        shared: store.state,
      };
    },
    mounted() {
      this.socketListeners();
    },
    methods: {
      socketListeners() {
        const socket = this.shared.socket;
        socket.on('canvas', (canvas) => {
          this.dataUrl = canvas;
        });
      },
    },
  };
</script>

<style scoped lang="scss">

</style>

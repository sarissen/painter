<template>
  <div class="page">
    <div class="choice">Draw a: {{ choice }}</div>
    <scoreboard />
    <paint-canvas @canvas-change="canvasChanged"/>
  </div>
</template>

<script>
  import PaintCanvas from './PaintCanvas';
  import store from './../classes/Store';
  import Scoreboard from './Scoreboard';

  const choices = ['dog', 'cat', 'school', 'shop', 'bicycle', 'car', 'axe', 'computer', 'clock', 'chess', 'phone', 'desk', 'curtain', 'table', 'chair', 'wallet', 'key', 'book', 'glasses', 'backpack', 'tree'];

  export default {
    components: {
      Scoreboard,
      PaintCanvas },
    name: 'DrawCreator',
    props: ['id'],
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
      socketListeners() {
        const socket = this.shared.socket;
        socket.on('requestWord', () => {
          this.shared.socket.emit('word', this.choice);
        });
      },
    },
    mounted() {
      this.choice = choices[Math.floor(Math.random() * choices.length)];
      this.shared.socket.emit('rejoin', this.shared.user.name, this.id);
      this.shared.socket.emit('word', this.choice);
      this.socketListeners();
    },
  };
</script>

<style scoped lang="scss">
  .page {
    height: 100%;
    margin-top: 10px;
  }

  .choice {
    font-size: 20px;
    font-weight: bold;
  }
</style>

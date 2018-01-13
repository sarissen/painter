<template>
  <div class="container-fluid">
    <div class="make-guess">Make a guess:</div>
    <input id="guessInput" :disabled="done" v-model="guess" @keyup="checkGuess" type="text" :maxlength="wordLength" />
    <i v-if="done" class="fa fa-check" style="color: lawngreen"></i>
    <div v-if="done">Done in {{ count }} seconds</div>
    <scoreboard />
    <img :src="dataUrl" alt="nodata" />
  </div>
</template>

<script>
  import store from './../classes/Store';
  import Scoreboard from './Scoreboard';

  export default {
    components: { Scoreboard },
    name: 'DrawViewer',
    props: ['id'],
    data() {
      return {
        dataUrl: '',
        shared: store.state,
        word: '',
        wordLength: 1,
        guess: '',
        start: 0,
        count: 0,
        done: false,
      };
    },
    mounted() {
      this.start = new Date().getTime() / 1000;
      this.shared.socket.emit('rejoin', this.shared.user.name, this.id);
      this.socketListeners();
      this.shared.socket.emit('requestWord');
    },
    methods: {
      socketListeners() {
        const socket = this.shared.socket;
        socket.on('canvas', (canvas) => {
          this.dataUrl = canvas;
        });
        socket.on('word', (word) => {
          console.log(`Received a word: ${word}`);
          this.word = word;
          this.wordLength = word.length;
          console.log(this.$refs);
          const input = document.getElementById('guessInput');
          input.style.width = `${24 * this.wordLength}px`;
        });
      },
      checkGuess() {
        if (this.guess === this.word) {
          this.done = true;
          this.count = Math.round((new Date().getTime() / 1000) - this.start);
          this.shared.socket.emit('done', this.count);
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  input {
    background-image: url("./../assets/square.gif");
    width: 195px;
    height: 24px;
    background-size: 24px;
    border: none;
    font-size: 16px;
    padding-left: 6px;
    letter-spacing: 16px;
  }

  .container-fluid {
    margin-top: 15px;
  }

  .make-guess {
    font-size: 20px;
    font-weight: bold;
  }
</style>

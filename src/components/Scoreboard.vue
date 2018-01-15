<template>
  <div class="scoreboard">
    <div class="score-name">Scoreboard</div>
    <div style="display:inline-block">
      <div class="score" v-for="score in scores" :key="score.member">
        {{ score.member }}: {{ score.count }} seconds
      </div>
    </div>
  </div>
</template>

<script>
  import store from './../classes/Store';

  export default {
    name: 'Scoreboard',
    data() {
      return {
        scores: [],
        shared: store.state,
      };
    },
    mounted() {
      this.socketListeners();
    },
    methods: {
      socketListeners() {
        const socket = this.shared.socket;
        socket.on('done', (count, member) => {
          this.scores.push({ count, member });
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .score-name {
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    margin-right: 20px;
  }

  .score {
    display: inline-block;
    margin-right: 10px;
  }
</style>

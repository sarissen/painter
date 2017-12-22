<template>
  <div class="container-fluid" style="margin-top: 20px;">
    <img style="max-width: 100%;margin:auto;margin-bottom: 40px;" :src="image.path" :alt="image.id">

    <div>
      <span class="color" :title="color" v-for="color in image.colors" :style="{ backgroundColor: color }">
      </span>
    </div>
    <div>{{ image.width }} x {{ image.height }}</div>
    <div>{{ image.size }} bytes</div>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './../classes/Store';

  export default {
    name: 'gallery-image',
    props: ['id'],
    data() {
      return {
        image: {},
        shared: store.state,
      };
    },
    mounted() {
      axios.get(`${this.shared.baseUrl}/image/${this.id}`)
        .then((responseData) => {
          // eslint-disable-next-line
          console.log(responseData.data);
          this.image = responseData.data;
          axios.post(`${this.shared.baseUrl}/image/data`, { url: this.image.path })
            .then((response) => {
              // eslint-disable-next-line
              console.log(response.data);
              this.image = Object.assign({}, this.image, response.data);
              console.log(this.image);
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
            });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  };
</script>

<style scoped lang="scss">
  img {
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
  }

  .container {
    margin-top: 40px;
  }

  .color {
    display:inline-block;
    width: 100px;
    height:100px;
  }
</style>

<template>
  <div class="container-fluid gallery">
    <router-link :to="{ name: 'GalleryImage', params: { id: image.id } }" v-for="image in images" :key="image.id">
      <div class="col-sm-3 card">
        <div class="card-block">
          <img class="card-img-top" :src="image.path" :alt="image.id">
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './../classes/Store';

  export default {
    name: 'gallery',
    data() {
      return {
        images: [],
        shared: store.state,
      };
    },
    mounted() {
      axios.get(`${this.shared.baseUrl}/images`)
        .then((response) => {
          // eslint-disable-next-line
          console.log(response.data);
          this.images = response.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
  };
</script>

<style scoped lang="scss">
  .gallery {
    padding: 20px;
  }
</style>

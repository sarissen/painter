<template>
  <div class="container-fluid gallery">
    <div class="row" style="padding: 60px;">
      <router-link style="margin-bottom: 40px;border:none;" class="col-sm-4 card" :to="{ name: 'GalleryImage', params: { id: image.id } }" v-for="image in images" :key="image.id">
        <div class="card-block" style="border: 1px solid rgba(0, 0, 0, 0.125)">
          <img class="card-img-top" :src="image.path" :alt="image.id">
        </div>
      </router-link>
    </div>
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

<template>
  <div class="container-fluid gallery">
    <div class="row">
      <router-link class="col-sm-4 img-tile" :to="{ name: 'GalleryImage', params: { id: image.id } }" v-for="image in images" :key="image.id">
        <div class="card mb-4 mb-sm-0">
          <img class="card-img-top" :src="image.path" :alt="image.id">
          <div class="card-body text-dark" style="text-align: left;">
              <div class="row justify-content-between">
                <div class="col-auto" v-if="image.author">
                  <span class="fa fa-user fa-fw"></span> {{image.author}}
                </div>
                <div class="col-auto" v-else >
                  <span class="fa fa-user-times fa-fw"></span>
                </div>
                <div class="col-auto">
                  <span class="fa fa-thumbs-up fa-fw"></span> {{image.likes}}
                </div>
              </div>
          </div>
          <div class="card-footer">
            <div class="text-muted">
              <span class="fa fa-calendar fa-fw"></span> {{ image.created_at }}<br>
              <span class="fa fa-pencil-square-o fa-fw"></span> {{ image.updated_at}}
            </div>
          </div>
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

  .img-tile:hover {
    text-decoration: none;

    .card {
      border-color: #000;
    }
  }
</style>

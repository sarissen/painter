<template>
  <div class="container-fluid gallery">
    <ul class="nav nav-tabs justify-content-center mb-2">
      <li class="nav-item">
        <a class="nav-link active" href="#" data-toggle="tab" v-on:click="getImages(orderBy, false)">All images</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" v-bind:class="{disabled: loggedOut()}" href="#" data-toggle="tab" v-on:click="getImages(orderBy, true)">Your images</a>
      </li>
    </ul>

    <ul class="nav nav-pills justify-content-center justify-content-sm-end mb-2">
      <li class="nav-item">
        <a class="nav-link disabled text-muted">Order by</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#" data-toggle="tab" v-on:click="getImages('date', showingOwn)">date</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" data-toggle="tab" v-on:click="getImages('likes', showingOwn)">likes</a>
      </li>
    </ul>

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
        showingOwn: false,
        orderBy: 'date',
        shared: store.state,
      };
    },
    mounted() {
      this.getImages('date', false);
    },
    methods: {
      getImages(orderBy, own) {
        axios.get(`${this.shared.baseUrl}/images`, {
          params: {
            own,
            orderBy,
          },
        })
          .then((response) => {
            // eslint-disable-next-line
            console.log(response.data);
            this.images = response.data;
            this.showingOwn = own;
            this.orderBy = orderBy;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      },
      loggedOut() {
        return Object.keys(this.shared.user).length === 0 && this.shared.user.constructor === Object;
      },
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

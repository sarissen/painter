<template>
	<div v-if="openModal" class="card">
    <div class="card-body">
      <h5 class="card-title">Share your creation</h5>
      <div v-if="isSharedOnImgur">
        <p>Your image was successfully shared on imgur!</p>
        <a v-bind:href='imgur.url' target="_blank" class="btn">See it here</a>
      </div>
      <div v-else-if="error">
        <p>An error occcured. We were not able to share your awesome creation on the web.</p>
      </div>
      <div v-else>
        <a href="javascript:void(0)" @click="shareOnFB" class="btn btn-facebook">
          <i class="fa fa-facebook fa-fw"></i>Facebook
        </a>
        <a href="javascript:void(0)" @click="shareOnImgur" class="btn btn-imgur">
          <i class="fa fa-upload fa-fw"></i>Imgur
        </a>
      </div>
      <a href="javascript:void(0)" @click="closeModal" class="btn btn-secondary">Cancel</a>
	 </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './../classes/Store';
  
  export default {
    name: 'Share',
    props: ['image_path', 'gallery_path'],
    data() {
      return {
        state: store.state,
        imgur: {
          shared: false,
          url: null,
          error: false,
        },
      };
    },
    computed: {
      openModal() {
        return this.state.openModal;
      },
      isSharedOnImgur() {
        return this.imgur.shared;
      },
      error() {
        return this.imgur.error;
      }
    },
    methods: {
      shareOnFB() {

        FB.ui({
          method: 'share',
          display: 'popup',
          href: document.URL,
        }, function (response) {
          console.log(response);
        });
      },
      shareOnImgur() {
        axios.post('https://api.imgur.com/3/image', this.image_path, {
          headers: { Authorization: 'Client-ID d13240715f3f9b5' },
        }).then((response) => {
          this.imgur.shared = response;
          this.imgur.url = 'https://imgur.com/' + response.data.data.id;
        }).catch((error) => {
          this.imgur.error = true;
        });
      },
      closeModal() {
        this.state.openModal = false;

        // reset shared state
        this.imgur.shared = false;
        this.imgur.url = null;
        this.imgur.error = false;
      },
    },
    metaInfo: {
      meta: [
        { property: 'og:url', content: document.URL },
        { property: 'og:type', content: 'painting' },
        { property: 'og:title', content: 'My painting' },
        { property: 'og:description', content: 'A painting made in a canvas' },
        { property: 'og:image', content: this.image_path },
      ]
    },
  };
</script>

<style scoped lang="scss">
  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0px 5px 20px 0 rgba(0,0,0,0.75);
  }

  .card .btn {
    display: block;
    margin: 10px 0;
  }

  .btn-facebook {
    background: #3b5998;
    color: white;
  }

  .btn-imgur {
    background: #1bb76e;
    color: white;
  }
</style>
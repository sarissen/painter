<template>
  <div class="navbar navbar-expand-sm  navbar-dark bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Painter</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-content" aria-controls="navbar-content" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <div class="navbar-nav ml-auto">
          <span class="user">{{ user.name }}</span>
          <router-link v-if="loggedIn" class="btn btn-secondary" to="/lobby"><i class="fa fa-list fa-lg mr-2"></i>Create lobby</router-link>
          <router-link v-if="loggedOut" class="btn btn-secondary" to="/register"><i class="fa fa-user fa-lg mr-2"></i>Register</router-link>
          <router-link v-if="loggedOut" class="btn btn-secondary" to="/login"><i class="fa fa-sign-in fa-lg mr-2"></i>Login</router-link>
          <a href="javascript:void(0)" class="btn btn-secondary" @click="logout" v-else><i class="fa fa-sign-in fa-lg mr-2"></i>Logout</a>
          <router-link class="btn btn-secondary" :to="swap"><i class="fa fa-folder fa-lg mr-2"></i>{{ swapText }}</router-link>
          <a href="javascript:void(0)" v-if="shareable" class="btn btn-secondary" @click="share"><i class="fa fa-share fa-lg mr-2"></i>Share</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    // import 'bootstrap/js/src/collapse';

    import axios from 'axios';
    import Store from './../classes/Store';

    export default {
      name: 'PageHeader',
      watch: {
        // eslint-disable-next-line
        '$route'() {
          this.getUser();
        },
      },
      data() {
        return {
          shared: Store.state,
          user: {},
        };
      },
      methods: {
        getUser() {
          axios.get(`${this.shared.baseUrl}/user`)
            .then((response) => {
              // eslint-disable-next-line
              console.log(response.data);
              this.user = response.data;
              this.shared.user = this.user;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
            });
        },
        logout() {
          sessionStorage.removeItem('token');
          this.getUser();
        },
        share() {
          this.shared.openModal = true;
        },
      },
      computed: {
        swap() {
          if (this.$route.name === 'Home') {
            return '/gallery';
          }
          return '/';
        },
        swapText() {
          if (this.$route.name === 'Home') {
            return 'Gallery';
          }
          return 'Paint';
        },
        loggedOut() {
          return Object.keys(this.user).length === 0 && this.user.constructor === Object;
        },
        loggedIn() {
          return !this.loggedOut;
        },
        shareable() {
          return this.$route.name === 'GalleryImage'/* && this.loggedIn */;
        },
      },
      created() {
        this.getUser();
      },
    };
</script>

<style scoped lang="scss">
  .navbar {
    z-index: 40;
  }

  .navbar-brand {
    color: white;
    font-weight: bold;

    &:hover {
      color: white;
    }
  }

  .navbar-nav {
    a {
      margin-top: 5px;

      @media screen and (min-width: 576px) {
        margin-left: 10px;
        margin-top: 0;
      }
    }
  }

  .user {
    color: white;
    line-height: 38px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
  }
</style>

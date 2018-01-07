<template>
  <div class="navbar navbar-expand bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Painter</router-link>
      <div class="navbar-nav ml-auto">
        <span class="user">{{ user.name }}</span>
        <router-link v-if="loggedOut" class="btn btn-secondary" to="/register"><i class="fa fa-user fa-lg mr-2"></i>Register</router-link>
        <router-link v-if="loggedOut" class="btn btn-secondary" to="/login"><i class="fa fa-sign-in fa-lg mr-2"></i>Login</router-link>
        <a href="javascript:void(0)" class="btn btn-secondary" @click="logout" v-else><i class="fa fa-sign-in fa-lg mr-2"></i>Logout</a>
        <router-link class="btn btn-secondary" :to="swap"><i class="fa fa-folder fa-lg mr-2"></i>{{ swapText }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
      },
      mounted() {
        this.getUser();
      },
    };
</script>

<style scoped lang="scss">
  .navbar-brand {
    color: white;
    font-weight: bold;

    &:hover {
      color: white;
    }
  }

  .navbar-nav {
    a {
      margin-left: 10px;
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

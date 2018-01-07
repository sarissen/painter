<template>
  <div class="navbar navbar-expand bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Painter</router-link>
      <div class="navbar-nav ml-auto">
        <router-link class="btn btn-secondary" to="/register"><i class="fa fa-user fa-lg mr-2"></i>Register</router-link>
        <router-link class="btn btn-secondary" to="/login"><i class="fa fa-sign-in fa-lg mr-2"></i>Login</router-link>
        <router-link class="btn btn-secondary" :to="swap"><i class="fa fa-folder fa-lg mr-2"></i>{{ swapText }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'PageHeader',
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
</style>

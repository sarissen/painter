<template>
  <div class="navbar navbar-expand bg-primary">
    <div class="container">
      <router-link to="/" class="navbar-brand">Painter</router-link>
      <div class="navbar-nav ml-auto">
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
</style>

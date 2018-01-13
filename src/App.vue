<template>
  <div id="app">
    <page-header />
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios';
  import PageHeader from './components/PageHeader';

  axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    const result = config;
    console.log('interceptor');
    if (token) {
      if (config.headers) {
        result.headers.Authorization = `Bearer ${token}`;
      } else {
        result.headers = { Authorization: `Bearer ${token}` };
      }
    }
    return result;
  }, (error) => {
    console.log('interceptor error');
    return Promise.reject(error);
  });

  export default {
    components: { PageHeader },
    name: 'app',
  };
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  body,html {
    width: 100%;
    height: 100%;
  }
</style>

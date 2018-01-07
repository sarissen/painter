<template>
  <div class="container">
    <div v-if="showUserAlert" class="alert alert-success" role="alert">
      User created successfully!
    </div>
    <h1>Login</h1>
    <div class="card">
      <form @submit.prevent="onSubmit" ref="form">
        <div class="form-group">
          <label for="username">Email address</label>
          <input type="email" class="form-control" id="username" name="username" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import store from './../classes/Store';

  export default {
    name: 'login',
    data() {
      return {
        shared: store.state,
        showUserAlert: false,
      };
    },
    methods: {
      onSubmit() {
        const form = this.$refs.form;
        const formData = new FormData(form);
        formData.append('grant_type', 'password');
        formData.append('client_id', this.shared.clientId);
        formData.append('client_secret', this.shared.clientSecret);
        formData.append('scope', '*');
        axios.post(`${this.shared.baseUrl}/oauth/token`, formData)
          .then((response) => {
            // eslint-disable-next-line
            console.log('logged in');
            this.shared.token = response.access_token;
            this.$router.push({ name: 'Home' });
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      },
    },
  };
</script>

<style scoped lang="scss">
  .container {
    margin-top: 40px;
  }

  .card {
    padding: 20px;
    text-align: left;
  }
</style>

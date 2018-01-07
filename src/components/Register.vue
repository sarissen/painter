<template>
  <div class="container">
    <h1>Register</h1>
    <div class="card">
      <form @submit.prevent="onSubmit" ref="form">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Name">
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
    name: 'register',
    data() {
      return {
        shared: store.state,
      };
    },
    methods: {
      onSubmit() {
        const form = this.$refs.form;
        const formData = new FormData(form);
        axios.post(`${this.shared.baseUrl}/user`, formData)
          .then((response) => {
            // eslint-disable-next-line
            console.log('user saved');
            this.$router.push({ name: 'Login' });
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

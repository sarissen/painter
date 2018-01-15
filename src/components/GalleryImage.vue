<template>
  <div>
    <share :image_path=this.image.path :gallery_path=$route.path></share>
    <div class="container-fluid" style="margin-top: 20px;">
      <img style="max-width: 100%;margin:auto;margin-bottom: 40px;" :src="image.path" :alt="image.id">

    <div class="row justify-content-center mb-4">
      <div class="col-auto" v-if="image.author">
        <h3><span class="fa fa-user fa-fw"></span> {{image.author}}</h3>
      </div>
      <div class="col-auto" v-else >
        <h3><span class="fa fa-user-times fa-fw"></span></h3>
      </div>
      <div class="col-auto">
        <div v-on:click="changeLike" v-bind:class="{ 'text-primary': image.liked }" id="like-button">
          <h3><span class="fa fa-thumbs-up fa-fw"></span> {{image.likes}}</h3>
        </div>
      </div>
    </div>

    <div>
      <span class="color" :title="color" v-for="color in image.colors" :style="{ backgroundColor: color }">
      </span>
    </div>
    <div>{{ image.width }} x {{ image.height }}</div>
    <div>{{ image.size }} bytes</div>

    <div id="comment-section" class="container">
      <div class="card">
        <div class="card-header bg-dark text-light">
          <h3>
            Comments ({{comments.length}})
          </h3>
        </div>
        <div class="card-body">
          <div class="mb-5" v-if="Object.keys(shared.user).length !== 0 && shared.user.constructor === Object">
            <form @submit.prevent="submitComment" ref="form">
              <div class="form-group">
                <textarea class="form-control" id="text" name="text" placeholder="Enter your comment" rows="3"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Add comment</button>
            </form>
          </div>
          <div class="alert alert-info mb-5" role="alert" v-else><span class="fa fa-info"></span> Log in to write a comment</div>

          <div class="card bg-light mb-3" v-for="comment in comments">
            <div class="card-body" style="text-align: left;">
              <div class="card-title row justify-content-between">
                <div class="col">
                  <h5>
                    <span class="fa fa-user fa-fw d-none d-sm-inline-block"></span> {{comment.author}}
                    <span class="d-none d-sm-inline-block"> {{comment.created_at}}</span>
                    <span class="text-muted" v-if="comment.created_at !== comment.updated_at"> (edited)</span>
                  </h5>
                </div>
                <div class="col-auto">
                  <span class="fa fa-pencil fa-lg fa-fw comment-edit" v-on:click="toggleEditForm(comment)" v-if="comment.author === shared.user.name"></span>
                  <span class="fa fa-times fa-lg fa-fw comment-delete" v-on:click="deleteComment(comment.id)" v-if="comment.author === shared.user.name"></span>
                </div>
              </div>
              <p class="card-text">
                {{comment.text}}
              </p>
              <form @submit.prevent="editComment(comment)" ref="edit" :id="comment.id" class="d-none">
                <div class="form-group">
                  <textarea class="form-control" name="text" rows="3" title="Edit text" v-model="editText"></textarea>
                </div>
                <button class="btn btn-secondary" v-on:click="toggleEditForm(comment)">Cancel</button>
                <button type="submit" class="btn btn-primary">Edit comment</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import axios from 'axios';
  import store from './../classes/Store';
  import Share from './Share';

  export default {
    name: 'gallery-image',
    components: {
      Share,
    },
    props: ['id'],
    data() {
      return {
        image: {},
        comments: [],
        editText: '',
        shared: store.state,
      };
    },
    mounted() {
      axios.get(`${this.shared.baseUrl}/image/${this.id}`)
        .then((responseData) => {
          // eslint-disable-next-line
          console.log(responseData.data);
          this.image = responseData.data;
          this.comments = this.image.comments;
          axios.post(`${this.shared.baseUrl}/image/data`, { url: this.image.path })
            .then((response) => {
              // eslint-disable-next-line
              console.log(response.data);
              this.image = Object.assign({}, this.image, response.data);
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
            });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },
    methods: {
      changeLike() {
        if (this.image.liked) {
          axios.delete(`${this.shared.baseUrl}/image/${this.id}/like`)
            .then((response) => {
              // eslint-disable-next-line
              console.log(response);
              this.image.likes -= 1;
              this.image.liked = false;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
            });
        } else {
          axios.put(`${this.shared.baseUrl}/image/${this.id}/like`)
            .then((response) => {
              // eslint-disable-next-line
              console.log(response);
              this.image.likes += 1;
              this.image.liked = true;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.log(error);
            });
        }
      },
      submitComment() {
        const form = this.$refs.form;
        const formData = new FormData(form);
        formData.append('grant_type', 'password');
        formData.append('client_id', this.shared.clientId);
        formData.append('client_secret', this.shared.clientSecret);
        formData.append('scope', '*');
        axios.post(`${this.shared.baseUrl}/image/${this.id}/comment`, formData)
          .then((response) => {
            const comment = {
              id: response.data.id,
              author: response.data.author,
              text: response.data.text,
              created_at: response.data.created_at,
              updated_at: response.data.updated_at,
            };
            this.comments.unshift(comment);
            // eslint-disable-next-line
            console.log(comment);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      },
      toggleEditForm(comment) {
        this.editText = comment.text;
        $(`#${comment.id}`).toggleClass('d-none');
      },
      editComment(comment) {
        const formData = new FormData();
        formData.append('text', this.editText);
        formData.append('grant_type', 'password');
        formData.append('client_id', this.shared.clientId);
        formData.append('client_secret', this.shared.clientSecret);
        formData.append('scope', '*');
        axios.post(`${this.shared.baseUrl}/comment/${comment.id}`, formData)
          .then((response) => {
            // eslint-disable-next-line
            this.comments.find((el) => {
              return el.id === comment.id;
            }).text = response.data.text;
            this.toggleEditForm(comment);
            // eslint-disable-next-line
            console.log(response);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
          });
      },
      deleteComment(id) {
        axios.delete(`${this.shared.baseUrl}/comment/${id}`)
          .then((response) => {
            // eslint-disable-next-line
            console.log(response);
            // eslint-disable-next-line
            this.comments = this.comments.filter((el) => {
              return el.id !== id;
            });
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
  img {
    box-shadow: 0 0 10px 1px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
  }

  .container {
    margin-top: 40px;
  }

  .color {
    display:inline-block;
    width: 100px;
    height:100px;
  }

  #comment-section {
    margin-bottom: 40px;
  }

  #like-button:hover, .comment-edit:hover, .comment-delete:hover {
    cursor: pointer;
  }

  .comment-edit:hover {
    color: blue;
  }

  .comment-delete:hover {
    color: red;
  }

</style>

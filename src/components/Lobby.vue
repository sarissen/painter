<template>
  <div :data-ready="lobby" class="container">
    <h1>Room: {{ identifier }}</h1>
    <h3>Join link: <a :href="joinUrl">{{ joinUrl }}</a></h3>
    <br/>
    Members:
    <ul>
      <li v-for="member in members" :key="member">
        {{ member }}
      </li>
    </ul>

    <a :if="creator" href="javascript:void(0)" class="btn btn-primary">Start</a>
  </div>
</template>

<script>
  import store from './../classes/Store';
  import utils from './../classes/Utils';

  export default {
    name: 'lobby',
    props: ['id'],
    data() {
      return {
        shared: store.state,
        members: [],
        identifier: this.id,
        ready: false,
        creator: false,
      };
    },
    mounted() {
      this.socketListeners();
    },
    computed: {
      lobby() {
        if (utils.isEmpty(this.shared.user) || this.ready) {
          return false;
        }

        this.ready = true;
        if (!this.identifier) {
          this.createLobby();
        } else {
          this.joinLobby();
        }

        return true;
      },
      joinUrl() {
        if (!this.identifier) {
          return null;
        }
        return `${window.location.protocol}//${window.location.hostname}/lobby/${this.identifier}`;
      },
    },
    methods: {
      addMember(member) {
        if (!this.members.includes(member)) {
          this.members.push(member);
        }
      },
      removeMember(member) {
        this.members.splice(this.members.indexOf(member), 1);
      },
      socketListeners() {
        const socket = this.shared.socket;
        socket.on('identifier', (identifier) => {
          console.log(`Created room ${identifier}`);
          this.identifier = identifier;
        });
        socket.on('member', (member) => {
          console.log(`received member data of: ${member}`);
          this.addMember(member);
        });
        socket.on('joined', (member) => {
          this.addMember(member);
          console.log(`${member} joined our room, sending own member data`);
          socket.emit('member', this.shared.user.name);
        });
        socket.on('disconnected', (member) => {
          this.removeMember(member);
          console.log(`${member} left the room`);
        });
      },
      createLobby() {
        const socket = this.shared.socket;
        console.log('Creating room');
        socket.emit('new');
        this.members.push(this.shared.user.name);
        this.creator = true;
      },
      joinLobby() {
        const socket = this.shared.socket;
        console.log(`Joining room ${this.identifier}`);
        socket.emit('join', this.identifier, this.shared.user.name);
        this.members.push(this.shared.user.name);
      },
    },
  };
</script>

<style scoped lang="scss">
  .container {
    text-align: left;
    margin-top: 40px;
  }
</style>

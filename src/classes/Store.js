import io from 'socket.io-client';

const store = {
  debug: true,
  state: {
    baseUrl: process.env.API_ENDPOINT,
    clientId: '2',
    clientSecret: process.env.CLIENT_SECRET,
    socket: process.env.ENABLE_SOCKETIO ? io(`${window.location.hostname}:3000`) : null,
    user: {},
  },
  /* setMessageAction(newValue) {
    if (this.debug) {
      console.log('setMessageAction triggered with', newValue);
    }
    this.state.message = newValue;
  },
  clearMessageAction() {
    if (this.debug) {
      console.log('clearMessageAction triggered');
    }
    this.state.message = '';
  }, */
};

window.store = store;

export default store;

import io from 'socket.io-client';
import secret from '../../config/clientsecret';

const store = {
  debug: true,
  state: {
    baseUrl: 'http://api.localhost/api/v1',
    clientId: '2',
    clientSecret: secret,
    socket: io(`${window.location.hostname}:3000`),
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

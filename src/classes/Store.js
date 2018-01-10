const store = {
  debug: true,
  state: {
    baseUrl: 'http://api.localhost/api/v1',
    clientId: '2',
    clientSecret: '9ySM1g1vXcXdLeUdl6LdW6wOhAm84a6Qe1PhNzTy',
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

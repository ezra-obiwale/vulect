import axios from 'axios';
import EventBus from '@/helpers/event-bus';
import AppStore from '@/store/app';

let headers = {},
  running = 0;
if (AppStore.state.sd && AppStore.state.sd.uki) 
  headers['Authorization'] = 'Bearer ' + AppStore.state.sd.uki;

const http = {
  axios: axios.create({baseURL: process.env.API_BASE_URL, headers: headers}),
  send(type, args) {
    if (!running) {
      // alert('ajax started');
      EventBus.$emit('ajax.started');
    }
    running++;
    const respond = (func, resp) => {
      running--;
      if (!running) 
        EventBus.$emit('ajax.ended');
      if (!resp) 
        resp = {};
      func(resp.data, resp.headers, resp.status);
    };
    return new Promise(function (resolve, reject) {
      this[type]
        .apply(this, args)
        .then(resp => {
          respond(resolve, resp);
        })
        .catch((error) => { 
          let resp = error.response;
          respond(reject, resp);
        });
    }.bind(this.axios));
  },
  get() {
    return this.send('get', arguments);
  },
  post() {
    return this.send('post', arguments);
  },
  put() {
    return this.send('put', arguments);
  },
  patch() {
    return this.send('patch', arguments);
  },
  delete() {
    return this.send('delete', arguments);
  }
};

export default http;

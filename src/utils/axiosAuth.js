import axios from 'axios';

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('user');

  if ( token != null ) {
    config.headers.Authorization = `${token}`;
  }

  return config;
}, function(err) {
  return Promise.reject(err);
});
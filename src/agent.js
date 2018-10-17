'use strict';
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://127.0.0.1:8000/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', {'user': { email, password }}),
  register: (email, password) =>
    requests.post('/users/register', {'user': { email, password }}),
  saveStaff: user =>
    requests.put('/user', { user: user })
}

const Business = {
    all: () =>
        requests.get('/companies'),
    apps: () =>
        requests.get('/company/apps'),
    create: company =>
        requests.post('/companies', { company: company }),
    current: () =>
        requests.get('/company'),
    retrieve: slug =>
        requests.get(`/companies/${slug}`)
}

const Password = {
    validate: (uidb64, token) =>
        requests.get(`/password/reset/${uidb64}/${token}`),
    submit: ( data, uidb64, token) =>
        requests.post(`/password/reset/${uidb64}/${token}`, data )
}

export default {
  Auth,
  Business,
  Password,
  setToken: _token => { token = _token; }
}

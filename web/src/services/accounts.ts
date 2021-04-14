import axios from 'axios';
import { AccountOptions } from '../types';

function url(path: string = ''): string {
  return `http://localhost:1228/users/${path}`;
}

export function createAccount(options: AccountOptions) {
  return axios({ method: 'POST', url: url(), data: options });
}

export function getAccounts() {
  return axios({ method: 'GET', url: url() });
}

export function getAccount(name: string) {
  return axios({ method: 'GET', url: url(name) });
}

export function editAccount(options: AccountOptions) {
  return axios({
    method: 'PUT',
    url: url(options.login.username),
    data: options
  });
}

export function deleteAccount(name: string) {
  return axios({ method: 'DELETE', url: url(name) });
}

export function login(name: string) {
  return axios({ method: 'POST', url: url(`${name}/login`) });
}

export function logout(name: string) {
  return axios({ method: 'POST', url: url(`${name}/logout`) });
}

import axios from 'axios';

export interface AccountOptions {
  login: {
    username: string;
    password: string;
    sharedSecret: string;
    identity: string;
  };
  status: {
    gameId: number;
    online?: boolean;
  };
  trading: {
    trashLimit: number;
    owners: string[];
    tradeWith0Profit: boolean;
  };
}

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

export function login(name: string) {
  return axios({ method: 'POST', url: url(`${name}/login`) });
}

export function logout(name: string) {
  return axios({ method: 'POST', url: url(`${name}/logout`) });
}

import Account from './account';
import { AccountOptions } from './options';
import { updateAll } from '../server/socket/updater';
import { readAccounts, writeAccounts } from '../storage/accounts';

const accounts = new Map<string, Account>();

readAccounts().then((opt) => {
  opt
    .map((opt) => new Account(opt))
    .forEach((acc) => {
      accounts.set(acc.options.login.username, acc);
    });
});

export function getAll() {
  return [true, [...accounts.values()].map((acc) => acc.serialize())];
}

export function getByName(name: string) {
  const account = accounts.get(name);
  return [!!account, account ? account.serialize() : `Account doesn't exist`];
}

export function login(name: string) {
  const account = accounts.get(name);
  if (!account) {
    return [false, `Account doesn't exist`];
  } else {
    account.login();
    return [true, 'logged in'];
  }
}

export function logout(name: string) {
  const account = accounts.get(name);
  if (!account) {
    return [false, `Account doesn't exist`];
  } else {
    account.logoff();
    return [true, 'logged out'];
  }
}

export function create(options: AccountOptions) {
  const { username } = options.login;
  if (username === '') {
    return [false, `Account name can't be empty`];
  } else if (accounts.has(username)) {
    return [false, 'Account already exists'];
  } else {
    const account = new Account(options);
    accounts.set(username, account);
    emitAccounts();
    saveAccounts();
    return [true, `Created user ${username}`, 201];
  }
}

export function edit(name: string, { status, trading }: AccountOptions) {
  const account = accounts.get(name);
  if (!account) {
    return [false, `Account doesn't exist`];
  } else {
    account.logoff();
    account.options.status = { ...account.options.status, ...status };
    account.options.trading = { ...account.options.trading, ...trading };
    saveAccounts();
    return [true, 'Modified.'];
  }
}

export function remove(name: string) {
  const account = accounts.get(name);
  if (!account) {
    return [false, `Account doesn't exist`];
  } else {
    account.logoff();
    accounts.delete(name);
    emitAccounts();
    saveAccounts();
    return [true, 'Deleted.'];
  }
}

function emitAccounts() {
  updateAll([...accounts.values()]);
}

function saveAccounts() {
  writeAccounts([...accounts.values()].map((acc) => acc.options));
}

import Account, { AccountOptions } from './account';
import { socketUpdater } from '../server/socket/updater';

const accounts = new Map<string, Account>();

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
    update();
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
    update();
    return [true, 'Deleted.'];
  }
}

function update() {
  socketUpdater.updateAll([...accounts.values()]);
}

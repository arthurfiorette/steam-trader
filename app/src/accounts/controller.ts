import Account, { AccountOptions } from './account';

const accounts = new Map<string, Account>();

export function getAll() {
  return [true, [...accounts.values()].map((acc) => acc.options)];
}

export function getByName(name: string) {
  const account = accounts.get(name);
  return [!!account, account?.options];
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
  if (accounts.has(username)) {
    return [false, 'Account already exists'];
  } else {
    const account = new Account(options);
    accounts.set(username, account);
    return [true, `Created user ${username}`, 201];
  }
}

export function edit(name: string, { status, trading }: AccountOptions) {
  const account = accounts.get(name);
  if (!account) {
    return [false, `Account doesn't exist`];
  } else {
    account.options.status = { ...account.options.status, ...status };
    account.options.trading = { ...account.options.trading, ...trading };
    account.logoff();
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
    return [true, 'Deleted.'];
  }
}

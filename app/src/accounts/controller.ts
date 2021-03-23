import Account, { AccountOptions } from './account';

const accounts = new Map<string, Account>();

export function getAll() {
  return [true, [...accounts.values()].map((acc) => acc.options)];
}

export function getByName(name: string) {
  return [true, accounts.get(name)];
}

export function create(options: AccountOptions) {
  const { username } = options.login;
  if (accounts.has(username)) {
    return [false, 'Account already exists'];
  } else {
    const account = new Account(options);
    accounts.set(username, account);
    return [true, 'Created.'];
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

// export function add(acc: Account) {
//   const exists = contains(acc.options.login.username);
//   accounts.set(acc.options.login.username, acc);
//   return exists;
// }

// export function remove(username: string): Account | undefined {
//   const acc = get(username);
//   acc && accounts.delete(username);
//   return acc;
// }

// export function get(username: string) {
//   return accounts.get(username);
// }

// export function getAll() {
//   return [...accounts.values()];
// }

// export function contains(username: string) {
//   return accounts.has(username);
// }

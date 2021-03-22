import Account from '../account/account';

const accounts: Map<string, Account> = new Map();

export function add(acc: Account) {
  accounts.set(acc.options.login.username, acc);
}

export function remove(username: string): Account | undefined {
  const acc = get(username);
  acc && accounts.delete(username);
  return acc;
}

export function get(username: string) {
  return accounts.get(username);
}

export function getAll() {
  return [...accounts.values()];
}

export function contains(username: string) {
  return accounts.has(username);
}

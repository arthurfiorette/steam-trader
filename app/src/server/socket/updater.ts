import Account from '../../accounts/account';
import { io } from '../index';

export function update(acc: Account) {
  io.emit('updateAccount', acc.serialize());
}

export function updateAll(accounts: Account[]) {
  io.emit(
    'updateAccounts',
    accounts.map((acc) => acc.serialize())
  );
}

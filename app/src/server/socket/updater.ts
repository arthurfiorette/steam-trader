import { Server } from 'socket.io';
import Account from '../../accounts/account';

export default class SocketUpdater {
  constructor(public server?: Server) {}

  update(acc: Account) {
    this.server?.emit('updateAccount', acc.serialize());
  }

  updateAll(accounts: Account[]) {
    this.server?.emit(
      'updateAccounts',
      accounts.map((acc) => acc.serialize())
    );
  }
}

export const socketUpdater = new SocketUpdater();

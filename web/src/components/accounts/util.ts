import { AccountOptions } from '../../services/accounts';

// TODO [#3]: Fetch user profile photo correctly
// Probably only possible when Steam WEB API is successfully implemented
export function fetchSteamUserImage() {
  return 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg'; // Default steam profile photo
}

export function emptyAccount(merge?: AccountOptions | any): AccountOptions {
  return {
    login: { username: null, password: null, identity: null, sharedSecret: null },
    status: { gameId: null },
    trading: { owners: [], tradeWith0Profit: false, trashLimit: null },
    ...merge
  };
}

export function hasInvalidKeys(obj: {}): boolean {
  return Object.keys(obj).some((key) => {
    const val = obj[key];
    if (val === null || Number.isNaN(val) || val === undefined || val === '') {
      console.log(key, val);
      console.log(val === null, Number.isNaN(val), val === undefined, val === '');
      return true;
    }
    if (typeof val === 'object') return hasInvalidKeys(val);
    return false;
  });
}

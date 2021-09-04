import { AccountOptions } from '../../types';

export function emptyAccount(merge?: AccountOptions | any): AccountOptions {
  return {
    login: {
      username: undefined,
      password: undefined,
      identity: undefined,
      sharedSecret: undefined
    },
    status: { gameId: -1 },
    trading: { owners: [], tradeWith0Profit: false, trashLimit: 0 },
    ...merge
  };
}

export function hasInvalidKeys(obj: object): boolean {
  return Object.keys(obj).some((key) => {
    const val = obj[key as keyof typeof obj];
    if (val === null || Number.isNaN(val) || val === undefined || val === '') {
      return true;
    }
    if (typeof val === 'object') return hasInvalidKeys(val);
    return false;
  });
}

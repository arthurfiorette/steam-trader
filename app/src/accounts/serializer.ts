import Account from './account';

export function serializer({ online, options }: Account) {
  return { ...options, status: { online } };
}

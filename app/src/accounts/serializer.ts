import Account from './account';

export function serializer({
  online,
  options: { login, status, trading }
}: Account) {
  return { login, status: { ...status, online }, trading };
}

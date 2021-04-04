import { useState, useEffect, Fragment } from 'react';
import Account from './account';
import { Offcanvas, Button } from './login';
import { AccountOptions, getAccounts } from '../../services/accounts';

export default function Accounts() {
  const [accounts, setAccounts] = useState<AccountOptions[]>([]);

  useEffect(() => {
    getAccounts()
      .then((resp) => resp.data.response)
      .then(setAccounts);
  }, []);

  return (
    <Fragment>
      <ul className="overflow-auto p-1" style={{ maxHeight: 'calc(50vh - 60px)' }}>
        <AccountList accounts={accounts} />
      </ul>
      <div className="d-flex mt-2 justify-content-center">
        <Button id="displayOffcanvas" message="Create a new account" />
        <Offcanvas id="displayOffcanvas" onFormEntry={(acc: AccountOptions) => setAccounts([...accounts, acc])} />
      </div>
    </Fragment>
  );
}

function AccountList({ accounts }: any) {
  return accounts.map((acc: AccountOptions) => <Account key={acc.login.username} account={acc} />);
}

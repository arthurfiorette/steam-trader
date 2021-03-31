import { useState, useEffect, Fragment } from 'react';
import Account from './account';
import { Offcanvas, Button } from './offcanvas';
import { AccountOptions, getAccounts } from '../../services/accounts';

export default function Accounts() {
  const [accounts, setAccounts] = useState<AccountOptions[]>([]);
  const id = 'displayOffcanvas';

  useEffect(() => {
    getAccounts()
      .then((resp) => resp.data.response)
      .then((accounts: AccountOptions[]) => setAccounts(accounts));
  }, []);

  return (
    <Fragment>
      <div id="accounts">
        <div id="list" className="overflow-auto p-1" style={{ maxHeight: 'calc(50vh - 60px)' }}>
          {accounts.map((acc) => (
            <Account account={acc} />
          ))}
        </div>
      </div>
      <div className="d-flex mt-2 justify-content-center">
        <Button id={id} message="Create a new account" />
        <Offcanvas id={id} onFormEntry={(acc: AccountOptions) => setAccounts([...accounts, acc])} />
      </div>
    </Fragment>
  );
}

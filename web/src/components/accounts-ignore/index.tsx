import { useState, useEffect, Fragment } from 'react';
import Account from './account';
import { Offcanvas, Button } from './offcanvas';
import { AccountOptions, getAccounts } from '../../services/accounts';

export default function Accounts() {
  const [accounts, setAccounts] = useState<AccountOptions[]>([]);
  const id = 'displayOffcanvas';

  useEffect(() => {
    const interval = setInterval(
      () =>
        getAccounts()
          .then((resp) => resp.data.response)
          .then((accounts: AccountOptions[]) => {
            console.log('updated');
            setAccounts(accounts);
          }),
      5000
    );
    return () => clearInterval(interval);
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

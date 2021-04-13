import { useState, useEffect } from 'react';
import Account from './account';
import { AccountOptions, getAccounts } from '../../services/accounts';
import socket from '../../services/socket';
import Form from './forms/login';
import { ColoredButton } from '../button';
import { GIT_URL } from '../../constants';
import Offcanvas from '../offcanvas';
import AccountList from './accountList';

export default function Accounts() {
  const [accounts, setAccounts] = useState<AccountOptions[]>([]);
  const registerId = 'registerAccount';

  useEffect(() => {
    socket.on('updateAccounts', setAccounts);
    getAccounts()
      .then((resp) => resp.data.response)
      .then(setAccounts);
    return () => setAccounts([]);
  }, []);

  return (
    <>
      <AccountList accounts={accounts} />
      <div className="d-flex mt-2 justify-content-center">
        <ColoredButton
          color="dark"
          data-bs-toggle="offcanvas"
          data-bs-target={`#${registerId}`}
          aria-controls={registerId}>
          Register
        </ColoredButton>
        <Offcanvas id={registerId} title="Register Menu">
          <div className="text-muted mb-4">
            You can get help
            <a href={GIT_URL} target="_blank" className="ms-1">
              here
            </a>
            .
          </div>
          <Form />
        </Offcanvas>
      </div>
    </>
  );
}

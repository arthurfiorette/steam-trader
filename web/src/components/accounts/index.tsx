import React, { useEffect, useState } from 'react';
import { GIT_URL } from '../../constants';
import { getAccounts } from '../../services/accounts';
import socket from '../../services/socket';
import { AccountOptions } from '../../types';
import { ColoredButton } from '../button';
import { Offcanvas } from '../offcanvas';
import { AccountList } from './accountList';
import { LoginForm } from './forms/login';

export const AccountsBox = (({}) => {
  const [accounts, setAccounts] = useState<AccountOptions[]>([]);
  const id = 'registerOffcanvas';

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
          data-bs-target={`#${id}`}
          aria-controls={id}
        >
          Register
        </ColoredButton>
        <Offcanvas id={id} title="Register Menu">
          <OffcanvasHeader />
          <LoginForm />
        </Offcanvas>
      </div>
    </>
  );
}) as React.FC<{}>;

export const OffcanvasHeader = (({}) => {
  return (
    <div className="text-muted mb-4">
      You can get help
      <a href={GIT_URL} target="_blank" className="ms-1">
        here
      </a>
      .
    </div>
  );
}) as React.FC<{}>;

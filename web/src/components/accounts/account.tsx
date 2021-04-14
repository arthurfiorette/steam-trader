import { useState, useEffect } from 'react';
import {
  getAccount,
  logout as logoutAcc,
  login as loginAcc
} from '../../services/accounts';
import { AccountOptions } from "../../types";
import { ColoredIconButton, ColoredButton } from '../button';
import { Power, Person } from 'react-bootstrap-icons';
import socket from '../../services/socket';

type AccountProps = {
  account: AccountOptions;
  onSelect: (acc: AccountOptions) => void;
};

export const Account = (({ account, onSelect }) => {
  const [options, setOptions] = useState<AccountOptions>(account);
  const { login, status } = options;

  useEffect(() => {
    socket.on('updateAccount', (acc: AccountOptions) => {
      if (acc.login.username === login.username) setOptions(acc);
    });

    // FIXME: Check if still needed;
    getAccount(login.username)
      .then((resp) => resp.data.response)
      .then(setOptions);
  }, []);

  return (
    <li
      style={{ backgroundColor: '#fff' }}
      className={`d-flex my-1 p-1 justify-content-between align-items-center shadow-sm border-2 rounded alert alert-${
        status.online ? 'success' : 'danger'
      }`}>
      <div>
        <Person
          size="40px"
          className={`text-${status.online ? 'success' : 'danger'}`}
        />
        <span className="lead ms-3 align-center text-dark align-middle text-capitalize">
          {login.username}
        </span>
      </div>
      <AccountButtons {...{ account, onSelect }} />
    </li>
  );
}) as React.FC<AccountProps>;

const AccountButtons = (({ account, onSelect }) => {
  const { login, status } = account;
  const id = 'editAccount';
  return (
    <div>
      <ColoredIconButton
        icon={Power}
        color={status.online ? 'danger' : 'success'}
        classes="m-0 me-1 p-1"
        onClick={() => (status.online ? logoutAcc : loginAcc)(login.username)}
        iconProps={{ size: '20px' }}
      />
      <ColoredButton
        color="info"
        classes={'m=0 me-1 p-1'}
        onMouseOver={() => onSelect(account)}
        data-bs-toggle="offcanvas"
        data-bs-target={`#${id}`}
        aria-controls={id}>
        Edit
      </ColoredButton>
    </div>
  );
}) as React.FC<AccountProps>;

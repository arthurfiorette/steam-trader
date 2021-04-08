import { useState, useEffect } from 'react';
import { fetchSteamUserImage } from './util';
import { AccountOptions, getAccount, logout as logoutAcc, login as loginAcc } from '../../services/accounts';
import { IconButton } from '../button';
import { PencilFill, Power } from 'react-bootstrap-icons';
import socket from '../../services/socket';

export default function Account({ account }: any) {
  const [{ login, status }, setOptions] = useState<AccountOptions>(account);

  useEffect(() => {
    socket.on('updateAccount', setOptions);

    getAccount(login.username)
      .then(({ data }) => data.response)
      .then(setOptions);
  }, []);

  // TODO [#6]: Handle large user names
  return (
    <li
      className={`d-flex my-1 p-1 justify-content-between align-items-center shadow-sm border-2 rounded alert alert-${
        status.online ? 'success' : 'danger'
      }`}
      style={{ backgroundColor: '#fff' }}>
      <div className="align-items-center">
        <ProfilePhoto account={account} />
        <span className="lead ms-3 align-center text-dark">{login.username}</span>
      </div>
      <div>
        <AccountButton
          icon={Power}
          color={status.online ? 'danger' : 'success'}
          onClick={() => (status.online ? logoutAcc : loginAcc)(login.username)}
        />
        <AccountButton icon={PencilFill} color="info" />
      </div>
    </li>
  );
}

function AccountButton({ icon, color, onClick }: any) {
  return <IconButton icon={icon} color={color} onClick={onClick} classes="m-1 p-1" iconProps={{ className: 'm-1' }} />;
}

// TODO [#4]: Standardize thumbnail images
// The accounts/account.tsx and trades/item.tsx images could be standardized (bootstrap '.img-thumbnail' ??) and extracted to a dedicated file.
function ProfilePhoto({ account }: any) {
  return (
    <img
      className="shadow rounded"
      src={fetchSteamUserImage()}
      alt={`${account.login.username}'s profile photo`}
      height="40px"
      width="40px"
    />
  );
}

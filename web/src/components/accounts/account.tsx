import { useState, useEffect } from 'react';
import { fetchSteamUserImage } from './util';
import { AccountOptions, getAccount, logout, login } from '../../services/accounts';
import { IconButton } from '../button';
import { PencilFill, Power } from 'react-bootstrap-icons';

export default function Account({ account }: any) {
  const [{ login, status }, setOptions] = useState<AccountOptions>(account);

  useEffect(() => {
    const i = setInterval(
      () =>
        getAccount(login.username)
          .then((resp) => resp.data.response)
          .then(setOptions),
      5 * 1000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <li
      className={`d-flex my-1 p-1 justify-content-between align-items-center border border-2 rounded border-${
        status.online ? 'success' : 'danger'
      }`}>
      <div className="align-items-center">
        <ProfilePhoto account={account} />
        <span className="lead ms-3 align-center text-dark">{login.username}</span>
      </div>
      <div>
        <PowerButton status={status} login={login} />
        <AccountButton icon={PencilFill} color="info" />
      </div>
    </li>
  );
}

function PowerButton({ status, login: _login }: any) {
  return (
    <AccountButton
      icon={Power}
      color={status.online ? 'success' : 'danger'}
      onClick={() => (status.online ? logout : login)(_login.username)}
    />
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
      className="shadow border border-2 rounded"
      src={fetchSteamUserImage()}
      alt={`${account.username}'s profile photo`}
      height="40px"
      width="40px"
    />
  );
}

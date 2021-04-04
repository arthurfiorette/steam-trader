import { PencilFill, Power } from 'react-bootstrap-icons';
import { login, logout } from '../../services/accounts';
import { fetchSteamUserImage } from './util';
import { IconButton } from '../button';

export default function Account({ account }: any) {
  return (
    <div className="d-flex my-1 p-1 justify-content-between align-items-center border-bottom rounded">
      <div className="user align-items-center">
        <ProfilePhoto account={account} />
        <span className={`h3 lead ms-3 align-center text-${account.status.online ? 'success' : 'danger'}`}>
          {account.login.username}
        </span>
      </div>
      <div>
        <PowerButton account={account} />
        <AccountButton icon={PencilFill} color="info" onMouseDown={() => {}} />
      </div>
    </div>
  );
}

function PowerButton({ account }: any) {
  const { username } = account.login;
  const { online } = account.status;
  if (online) {
    return <AccountButton icon={Power} color="danger" onClick={() => logout(username)} />;
  } else {
    return <AccountButton icon={Power} color="success" onClick={() => login(username)} />;
  }
}

function AccountButton({ icon, color, onClick }: any) {
  return <IconButton icon={icon} color={color} onClick={onClick} classes={`m-1 p-1`} iconProps={{ className: 'm-1' }} />;
}

// TODO [#4]: Standardize thumbnail images
// The accounts/account.tsx and trades/item.tsx images could be standardized (bootstrap '.img-thumbnail' ??) and extracted to a dedicated file.
function ProfilePhoto({ account }: any) {
  return (
    <img
      className="shadow border rounded"
      src={fetchSteamUserImage()}
      alt={`${account.username}'s profile photo`}
      height="40px"
      width="40px"
    />
  );
}

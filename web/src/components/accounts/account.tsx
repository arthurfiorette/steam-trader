import { PencilFill, Power } from 'react-bootstrap-icons';
import { login, logout } from '../../services/accounts';
import { fetchSteamUserImage } from './util';
import { IconButton } from '../button';

export default function Account({ account }: any) {
  const name = account.login.username;
  return (
    <div className="d-flex my-1 p-1 justify-content-between align-items-center border-bottom rounded">
      <div className="user align-items-center">
        <ProfilePhoto account={account} />
        <span className="h3 lead ms-3 align-center text-muted">{name}</span>
      </div>
      <div>
        <AccountButton icon={Power} color="success" onMouseDown={() => login(name)} />
        <AccountButton icon={Power} color="danger" onMouseDown={() => logout(name)} />
        <AccountButton icon={PencilFill} color="info" onMouseDown={() => {}} />
      </div>
    </div>
  );
}

function AccountButton({ icon, color, onMouseDown }: any) {
  return (
    <IconButton icon={icon} color={color} onMouseDown={onMouseDown} classes={`m-1 p-1`} iconProps={{ className: 'm-1' }} />
  );
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

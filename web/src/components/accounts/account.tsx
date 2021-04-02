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
        <span className="h3 lead ps-3 align-center text-muted">{name}</span>
      </div>
      <div>
        <IconButton icon={Power} color="success" classes="me-2 p-2" onMouseDown={() => login(name)} />
        <IconButton icon={Power} color="danger" classes="me-2 p-2" onMouseDown={() => logout(name)} />
        <IconButton icon={PencilFill} color="info" classes="me-4 p-2" onMouseDown={() => logout(name)} />
      </div>
    </div>
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

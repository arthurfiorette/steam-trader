import { PencilFill, Power } from 'react-bootstrap-icons';
import { login, logout } from '../../services/accounts';
import { fetchSteamUserImage } from './util';

export default function Account({ account }: any) {
  const name = account.login.username;
  return (
    <div className="d-flex my-1 p-1 justify-content-between align-items-center border-bottom rounded">
      <div className="user align-items-center">
        <ProfilePhoto account={account} />
        <span className="h3 lead ps-3 align-center text-muted">{name}</span>
      </div>
      <div>
        <Button Icon={Power} color="success" onMouseDown={() => login(name)} />
        <Button Icon={Power} color="danger" onMouseDown={() => logout(name)} paddingLeft="4" />
        <Button Icon={PencilFill} color="info" onMouseDown={() => {}} />
      </div>
    </div>
  );
}

function Button({ Icon, color, paddingLeft, onMouseDown }: any) {
  return (
    <button type="button" onMouseDown={onMouseDown} className={`p-2 btn btn-${color} me-${paddingLeft ? paddingLeft : '2'}`}>
      <Icon size="20px" />
    </button>
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

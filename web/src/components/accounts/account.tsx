import React from 'react';
import { PencilFill, Power } from 'react-bootstrap-icons';
import { login, logout } from '../../services/accounts';

export default function Account({ account }: any) {
  const name = account.login.username;
  return (
    <div className="d-flex my-1 p-1 justify-content-between align-items-center border border-2 border-secondary rounded">
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

// TODO: Fetch user profile photo correctly
function fetchSteamUserImage(): string {
  // Default steam profile photo
  return 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg';
}

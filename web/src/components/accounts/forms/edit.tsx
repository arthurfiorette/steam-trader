import { useEffect, useState } from 'react';
import { AccountOptions,  editAccount } from '../../../services/accounts';
import { CheckInput, TextInput } from './inputs';
import { emptyAccount, hasInvalidKeys } from '../util';
import { DarkButton, IconButton } from '../../button';
import { PencilSquare } from 'react-bootstrap-icons';

export interface EditProps {
  data?: AccountOptions;
}

export default function EditForm({ data = emptyAccount() }: EditProps) {
  const [{ login, status, trading }, setData] = useState<AccountOptions>(data);
  useEffect(() => {
    setData(data);
  }, [data]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { login, status, trading };
    if (hasInvalidKeys(data)) {
      alert('Invalid login informations');
      return;
    }
    editAccount(data).then((r) => {
      if (r.data.status !== 'Success') alert(r.data.response);
    });
  };

  const onChangeFactory = (cb: (val: any) => any) => {
    return ({
      target: { type, checked, value }
    }: React.ChangeEvent<HTMLInputElement>) => {
      cb(type === 'checkbox' ? checked : value);
      setData({ login, status, trading });
    };
  };

  return (
    <form className="needs-validation" {...{ onSubmit }}>
      <TextInput
        type="text"
        title="Username"
        help="Your steam username"
        inputProps={{ disabled: true, value: login.username }}
      />
      <TextInput
        type="password"
        title="Password"
        help="Your steam password"
        inputProps={{ disabled: true, value: login.username }}
      />
      <TextInput
        type="password"
        title="Shared Secret"
        help="Your steam shared secret"
        inputProps={{ disabled: true, value: login.username }}
      />
      <TextInput
        type="password"
        title="Identity Secret"
        help="Your steam identity secret"
        inputProps={{ disabled: true, value: login.username }}
      />
      <TextInput
        type="number"
        title="Game Id"
        help="A steam game id to keep playing"
        onChange={onChangeFactory((val) => (status.gameId = val))}
        inputProps={{ value: status.gameId }}
      />
      <TextInput
        type="number"
        title="Trash Limit"
        help="The minimum item price accepted"
        onChange={onChangeFactory((val) => (trading.trashLimit = val))}
        inputProps={{ value: trading.trashLimit }}
      />
      <TextInput
        type="number"
        title="Owner Id"
        help="It will ALWAYS accept trades from this steam id"
        onChange={onChangeFactory((val) => (trading.owners = [val]))}
        inputProps={{ value: trading.owners }}
      />
      <CheckInput
        title="Trade With 0 Profit"
        help="Accept trades with the same two prices?"
        onChange={onChangeFactory((val) => (trading.tradeWith0Profit = val))}
        inputProps={{ checked: trading.tradeWith0Profit }}
      />
      <DarkButton type="submit">Edit</DarkButton>
    </form>
  );
}

export function EditButton({ id }: any) {
  return (
    <IconButton
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls={id}
      icon={PencilSquare}
    />
  );
}

import { useState } from 'react';
import { AccountOptions, createAccount } from '../../../services/accounts';
import { CheckInput, TextInput } from './inputs';
import { emptyAccount, hasInvalidKeys } from '../util';
import { DarkButton } from '../../button';

export interface FormProps {
  initialData?: AccountOptions;
  onFormSend?: () => void;
}

export default function Form({ initialData = emptyAccount() }: FormProps) {
  const [{ login, status, trading }, setData] = useState<AccountOptions>(
    initialData
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { login, status, trading };
    if (hasInvalidKeys(data)) {
      alert('Invalid login informations');
      return;
    }
    createAccount(data).then((r) => {
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
        onChange={onChangeFactory((val) => (login.username = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        type="password"
        title="Password"
        help="Your steam password"
        onChange={onChangeFactory((val) => (login.password = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        type="password"
        title="Shared Secret"
        help="Your steam shared secret"
        onChange={onChangeFactory((val) => (login.sharedSecret = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        type="password"
        title="Identity Secret"
        help="Your steam identity secret"
        onChange={onChangeFactory((val) => (login.identity = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        type="number"
        title="Game Id"
        help="A steam game id to keep playing"
        onChange={onChangeFactory((val) => (status.gameId = val))}
      />
      <TextInput
        type="number"
        title="Trash Limit"
        help="The minimum item price accepted"
        onChange={onChangeFactory((val) => (trading.trashLimit = val))}
      />
      <TextInput
        type="number"
        title="Owner Id"
        help="It will ALWAYS accept trades from this steam id"
        onChange={onChangeFactory((val) => (trading.owners = [val]))}
      />
      <CheckInput
        title="Trade With 0 Profit"
        help="Accept trades with the same two prices?"
        onChange={onChangeFactory((val) => (trading.tradeWith0Profit = val))}
      />
      <DarkButton type="submit">Create</DarkButton>
    </form>
  );
}

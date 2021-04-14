import { useState } from 'react';
import { createAccount } from '../../../services/accounts';
import { AccountOptions } from '../../../types';
import { CheckInput, TextInput } from './inputs';
import { emptyAccount, hasInvalidKeys } from '../util';
import { ColoredButton } from '../../button';

export const LoginForm = (({}) => {
  const [{ login, status, trading }, setData] = useState<AccountOptions>(
    emptyAccount()
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
        prefix="edit"
        type="text"
        title="Username"
        help="Your steam username"
        onChange={onChangeFactory((val) => (login.username = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        prefix="edit"
        type="password"
        title="Password"
        help="Your steam password"
        onChange={onChangeFactory((val) => (login.password = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        prefix="edit"
        type="password"
        title="Shared Secret"
        help="Your steam shared secret"
        onChange={onChangeFactory((val) => (login.sharedSecret = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        prefix="edit"
        type="password"
        title="Identity Secret"
        help="Your steam identity secret"
        onChange={onChangeFactory((val) => (login.identity = val))}
        inputProps={{ required: true }}
      />
      <TextInput
        prefix="edit"
        type="number"
        title="Game Id"
        help="A steam game id to keep playing"
        onChange={onChangeFactory((val) => (status.gameId = val))}
      />
      <TextInput
        prefix="edit"
        type="number"
        title="Trash Limit"
        help="The minimum item price accepted"
        onChange={onChangeFactory((val) => (trading.trashLimit = val))}
      />
      <TextInput
        prefix="edit"
        type="number"
        title="Owner Id"
        help="It will ALWAYS accept trades from this steam id"
        onChange={onChangeFactory((val) => (trading.owners = [val]))}
      />
      <CheckInput
        prefix="edit"
        title="Trade With 0 Profit"
        help="Accept trades with the same two prices?"
        onChange={onChangeFactory((val) => (trading.tradeWith0Profit = val))}
      />
      <ColoredButton color="dark" type="submit">
        Create
      </ColoredButton>
    </form>
  );
}) as React.FC<{}>;

import { useState } from 'react';
import { AccountOptions, createAccount } from '../../../services/accounts';
import { getInput } from './inputs';
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

  const INPUTS: [string, string, string, (val: any) => void, {}?][] = [
    [
      'text',
      'Username',
      'Your steam username',
      (val) => (login.username = val),
      { required: true }
    ],
    [
      'password',
      'Password',
      'Your steam password',
      (val) => (login.password = val),
      { required: true }
    ],
    [
      'password',
      'Shared Secret',
      'Your steam shared secret',
      (val) => (login.sharedSecret = val),
      { required: true }
    ],
    [
      'password',
      'Identity Secret',
      'Your steam identity secret',
      (val) => (login.identity = val),
      { required: true }
    ],
    [
      'number',
      'Game Id',
      'A steam game id to keep playing',
      (val) => (status.gameId = val)
    ],
    [
      'number',
      'Trash Limit',
      'The minimum item price accepted',
      (val) => (trading.trashLimit = val),
      { step: 0.01 }
    ],
    [
      'number',
      'Owner Id',
      'It will ALWAYS accept trades from this steam id',
      (val) => (trading.owners = [val])
    ],
    [
      'checkbox',
      'Trade With 0 profit',
      'Accept trades with the same two prices?',
      (val) => (trading.tradeWith0Profit = val)
    ]
  ];

  return (
    <form className="needs-validation" {...{ onSubmit }}>
      {INPUTS.map(([type, title, help, callback, inputProps]: any) => {
        const Input = getInput(type);
        return (
          <Input
            {...{ type, title, help, inputProps }}
            onChange={({
              target: { type, checked, value }
            }: React.ChangeEvent<HTMLInputElement>) => {
              callback(type === 'checkbox' ? checked : value);
              setData({ login, status, trading });
            }}
          />
        );
      })}
      <DarkButton type="submit">Create</DarkButton>
    </form>
  );
}

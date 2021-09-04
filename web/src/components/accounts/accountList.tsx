import React, { useState } from 'react';
import { Trash } from 'react-bootstrap-icons';
import { GIT_URL } from '../../constants';
import { deleteAccount } from '../../services/accounts';
import { AccountOptions } from '../../types';
import { ColoredIconButton } from '../button';
import { If } from '../if';
import { Offcanvas } from '../offcanvas';
import { Account } from './account';
import { EditForm } from './forms/edit';
import { emptyAccount } from './util';

export const AccountList = (({ accounts }) => {
  const [selected, setSelected] = useState<AccountOptions>();

  return (
    <>
      <ul className="overflow-auto p-1" style={{ maxHeight: 'calc(50vh - 60px)' }}>
        {accounts.map((account: AccountOptions) => (
          <Account
            key={account.login.username}
            {...{ account }}
            onSelect={(acc: any) => selected !== acc && setSelected(acc)}
          />
        ))}
      </ul>
      <Offcanvas id="editAccount" title="Edit Menu">
        <If test={!!selected && selected !== emptyAccount()}>
          <OffcanvasHeader {...{ selected }} />
          <EditForm data={selected} />
        </If>
      </Offcanvas>
    </>
  );
}) as React.FC<{ accounts: AccountOptions[] }>;

const OffcanvasHeader = (({ selected }) => {
  return (
    <div className="mb-5 position-relative">
      <div className="text-muted">
        You can get help
        <a href={GIT_URL} target="_blank" className="ms-1">
          here
        </a>
        .
      </div>
      <ColoredIconButton
        icon={Trash}
        color="danger"
        classes="position-absolute top-0 end-0"
        onClick={() => {
          if (selected) {
            deleteAccount(selected.login.username).then((r) => {
              if (r.data.status !== 'Success') alert(r.data.response);
              else alert('Account deleted successfully');
            });
          }
        }}
      />
    </div>
  );
}) as React.FC<{ selected: AccountOptions | undefined }>;

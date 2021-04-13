import { useState } from 'react';
import Account from './account';
import { AccountOptions, deleteAccount } from '../../services/accounts';
import { GIT_URL } from '../../constants';
import EditForm from './forms/edit';
import Offcanvas from '../offcanvas';
import If from '../if';
import { emptyAccount } from './util';
import { IconButton } from '../button';
import { Trash } from 'react-bootstrap-icons';

export default function AccountList({ accounts }: any) {
  const [selected, setSelected] = useState<AccountOptions>();
  const id = 'editAccount';

  return (
    <>
      <ul
        className="overflow-auto p-1"
        style={{ maxHeight: 'calc(50vh - 60px)' }}>
        <AccountArr
          accounts={accounts}
          onSelect={(acc: any) => selected !== acc && setSelected(acc)}
        />
      </ul>
      <Offcanvas id={id} title="Edit Menu">
        <If test={!!selected && selected !== emptyAccount()}>
          <AccountListHeader data={selected} />
          <EditForm data={selected} />
        </If>
      </Offcanvas>
    </>
  );
}

function AccountArr({ accounts, onSelect }: any) {
  return accounts.map((account: AccountOptions) => (
    <Account key={account.login.username} {...{ account, onSelect }} />
  ));
}

function AccountListHeader({ data }: any) {
  return (
    <div className="mb-5 position-relative">
      <div className="text-muted">
        You can get help
        <a href={GIT_URL} target="_blank" className="ms-1">
          here
        </a>
        .
      </div>
      <IconButton
        icon={Trash}
        color="danger"
        classes="position-absolute top-0 end-0"
        onClick={() => {
          deleteAccount(data.login.username).then((r) => {
            if (r.data.status !== 'Success') alert(r.data.response);
            else alert('Account deleted successfully');
          });
        }}
      />
    </div>
  );
}

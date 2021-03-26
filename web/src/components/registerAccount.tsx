import React from 'react';
import Offcanvas from './offCanvas';
import AccountForm from './accountForm';

export default function AccountRegistration({ id }: any) {
  return (
    <Offcanvas id={id} title="Register a new account">
      <div className="text-muted mb-4">
        You can get help here{' '}
        <a href="https://github.com/ArthurFiorette/steam-trader" target="_blank">
          here
        </a>
      </div>
      <AccountForm />
    </Offcanvas>
  );
}

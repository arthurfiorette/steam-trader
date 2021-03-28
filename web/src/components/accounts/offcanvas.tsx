import React from 'react';
import OffcanvasTemplate from '../offcanvas';
import Form from './form';

export function Button({ id, message }: any) {
  return (
    <button
      className="m-1 p-2 me-2 btn btn-success"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls={`${id}`}>
      {message}
    </button>
  );
}

export function Offcanvas({ id, onFormEntry }: any) {
  return (
    <OffcanvasTemplate id={id} title="Register a new account">
      <div className="text-muted mb-4">
        You can get help{' '}
        <a href="https://github.com/ArthurFiorette/steam-trader" target="_blank">
          here
        </a>
      </div>
      <Form onFormEntry={onFormEntry} />
    </OffcanvasTemplate>
  );
}

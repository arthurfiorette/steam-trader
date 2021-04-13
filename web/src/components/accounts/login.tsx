import OffcanvasTemplate from '../offcanvas';
import Form from './forms/login';
import { DarkButton } from '../button';
import { GIT_URL } from '../../constants';

export function Button({ id, message }: any) {
  return (
    <DarkButton
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls={`${id}`}>
      {message}
    </DarkButton>
  );
}

export function Offcanvas({ id }: any) {
  return (
    <OffcanvasTemplate id={id} title="Register a new account">
      <div className="text-muted mb-4">
        You can get help{' '}
        <a href={GIT_URL} target="_blank">
          here
        </a>
        .
      </div>
      <Form />
    </OffcanvasTemplate>
  );
}

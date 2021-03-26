import React from 'react';

export default function RegisterAccount() {
  return (
    <div className="offcanvas offcanvas-start" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
      <div className="offcanvas-header">
        <h5 className="h5">Register a new account</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <form>
          <TextInput type="text" id="username" title="Username" help="Your steam username" />
          <TextInput type="password" id="password" title="Password" help="Your steam password" />
          <TextInput
            type="password"
            id="sharedSecret"
            title="Account Shared Secret"
            help={
              <span>
                Find the account Shared Secret <a href="https://github.com/ArthurFiorette/steam-trader">here</a>.
              </span>
            }
          />
          <TextInput
          type="password"
          id="identity"
          title="Account Identity"
          help={
            <span>
              Find the account Identity <a href="https://github.com/ArthurFiorette/steam-trader">here</a>.
            </span>
          }
        />
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function TextInput({ type, id, help, title }: any) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {title}
      </label>
      <input type={type} className="form-control" id={id} aria-describedby={`${id}Help`} />
      <div id={`${id}Help`} className="form-text">
        {help}
      </div>
    </div>
  );
}

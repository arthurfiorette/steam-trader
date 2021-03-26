import React, { Component } from 'react';
import { PencilFill, Plus, Power } from 'react-bootstrap-icons';
import { AccountOptions } from '../services/accounts';
import RegisterAccount from './registerAccount';

interface AccountState {
  accounts: AccountOptions[];
}

export default class Account extends Component<any, AccountState> {
  renderAccount(acc?: AccountOptions): any {
    return (
      <div className="d-flex my-1 p-1 justify-content-between align-items-center border border-2 border-success rounded">
        <div className="user align-items-center">
          <img className="shadow border rounded" src={this.getUserImage(acc)} alt="" height="40px" width="40px" />
          <span className="h3 lead ps-3 align-center text-muted">{'Hazork'}</span>
        </div>
        <div>
          <button type="button" className="p-2 btn btn-danger me-2">
            <Power size="20px" />
          </button>
          <button type="button" className="p-2 btn btn-info me-2">
            <PencilFill size="20px" />
          </button>
        </div>
      </div>
    );
  }

  // TODO: Fetch user image
  getUserImage(acc?: AccountOptions): string {
    return 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg';
  }

  renderAccounts() {
    return this.state.accounts.map((acc) => this.renderAccount(acc));
  }

  render() {
    return (
      <div style={{ height: '50vh', maxHeight: '50vh' }}>
        <div className="overflow-auto p-1" style={{ maxHeight: 'calc(50vh - 60px)' }}>
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
          {this.renderAccount()}
        </div>
        <div className="d-flex mt-2 justify-content-center">
          <button
            className="m-1 p-2 me-2 btn btn-success"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#registerAccount"
            aria-controls="registerAccount">
            Add new account
          </button>
          <RegisterAccount id="registerAccount"/>
        </div>
      </div>
    );
  }
}
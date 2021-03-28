import React, { Component } from 'react';
import AccountDisplay from './account';
import { Offcanvas, Button } from './offcanvas';
import { AccountOptions, getAccounts } from '../../services/accounts';
import './display.css'

interface DisplayState {
  accounts: AccountOptions[];
}

export default class Display extends Component<any, DisplayState> {
  id = 'displayOffcanvas';

  constructor(props: any) {
    super(props);

    getAccounts()
      .then((resp) => resp.data.response)
      .then((accounts: AccountOptions[]) => this.setState({ accounts }));
  }

  private renderAccounts() {
    if (this.state == null) {
      return 'Loading...';
    } else {
      return this.state.accounts.map((acc) => <AccountDisplay account={acc} />);
    }
  }

  private addAccount = (account: AccountOptions) => {
    this.setState({ accounts: [...this.state.accounts, account] });
  }

  render() {
    return (
      <div id="accounts" style={{ height: '50vh', maxHeight: '50vh' }}>
        <div id="list" className="overflow-auto p-1" style={{ height: '100%', maxHeight: 'calc(50vh - 60px)' }}>
          {this.renderAccounts()}
        </div>
        <div className="d-flex mt-2 justify-content-center">
          <Button id={this.id} message="Create a new account" />
          <Offcanvas id={this.id} onFormEntry={this.addAccount} />
        </div>
      </div>
    );
  }
}

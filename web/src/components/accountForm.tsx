import React, { Component } from 'react';
import { AccountOptions, createAccount } from '../services/accounts';

interface FormState {
  username: string;
  password: string;
  sharedSecret: string;
  identity: string;
  gameId: number;
  trashLimit: number;
  owners: string[];
  tradeWith0Profit: boolean;
  [x: string]: string | boolean | number | string[];
}

export default class Form extends Component<any, FormState> {
  constructor(props: any) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setState({});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <this.TextInput type="text" name="username" title="Username" help="Your steam username" />
        <this.TextInput type="password" name="password" title="Password" help="Your steam password" />
        <this.TextInput type="password" name="sharedSecret" title="Shared Secret" help="Your steam shared secret" />
        <this.TextInput type="password" name="identity" title="Identity" help="Your steam identity number" />
        <this.TextInput type="number" name="gameId" title="Game Id" help="A steam game ID to keep playing" />
        <this.TextInput type="number" name="trashLimit" title="Trash Limit" help="The minimum item price to be exchanged" />
        <this.TextInput
          type="text"
          name="owner"
          title="Owner Id"
          help="The bot will ALWAYS accept trades from this steam id"
        />
        <this.SwitchInput
          name="trade0Profit"
          title="Trade with 0 profit"
          help="Should the bot accept a trade with the same price in both sides?"
        />
        <button type="submit" className="btn btn-outline-success">
          Create
        </button>
      </form>
    );
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(this.state);

    const { username, password, sharedSecret, identity, gameId, owners, trashLimit, tradeWith0Profit } = this.state;

    const options: AccountOptions = {
      login: {
        username,
        password,
        sharedSecret,
        identity
      },
      status: {
        gameId
      },
      trading: {
        owners,
        trashLimit,
        tradeWith0Profit
      }
    };
    
    createAccount(options).then((r) => console.log(r.data));
  }

  TextInput = ({ type, name, help, title }: any) => {
    return (
      <div className="form-floating mb-3">
        <input
          type={type}
          className="form-control"
          name={name}
          placeholder=" "
          onChange={this.handleInputChange}
          aria-describedby={`${name}Help`}
          required
        />
        <label htmlFor={name}>{title}</label>
        <div id={`${name}Help`} className="form-text">
          {help}
        </div>
      </div>
    );
  };

  SwitchInput = ({ name, title, help }: any) => {
    return (
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id={`${name}Id`}
          name={name}
          onChange={(e) => this.handleInputChange(e)}
        />
        <label className="form-check-label" htmlFor={`${name}Id`}>
          {title}
        </label>
        <div id={`${name}Help`} className="form-text">
          {help}
        </div>
      </div>
    );
  };
}

import { Component } from 'react';
import { AccountOptions, createAccount } from '../../services/accounts';

interface FormInputs {
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

interface FormProps {
  onFormEntry: (acc: AccountOptions) => void;
}

export default class Form extends Component<FormProps, FormInputs> {
  private TextInput = ({ type, name, help, title }: any) => (
    <div className="form-floating mb-3">
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={name.toLowerCase()}
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

  private SwitchInput = ({ name, title, help }: any) => (
    <div className="form-check form-switch mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id={`${name}Id`}
        name={name}
        onChange={this.handleInputChange}
        checked
      />
      <label className="form-check-label" htmlFor={`${name}Id`}>
        {title}
      </label>
      <div id={`${name}Help`} className="form-text">
        {help}
      </div>
    </div>
  );

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState({ [target.name]: target.type === 'checkbox' ? target.checked : target.value });
  };

  private handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, sharedSecret, identity, gameId, owners, trashLimit, tradeWith0Profit } = this.state;
    const options = {
      login: { username, password, sharedSecret, identity },
      status: { gameId },
      trading: { owners, trashLimit, tradeWith0Profit }
    };
    createAccount(options).then((r) => {
      if (r.data.status === 'Success') {
        this.props.onFormEntry(options);
      } else {
        alert(r.data.response);
      }
    });
  };

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
          name="owners"
          title="Owner Id"
          help="The bot will ALWAYS accept trades from this steam id"
        />
        <this.SwitchInput
          name="tradeWith0Profit"
          title="Trade with 0 profit"
          help="Should the bot accept a trade with the same price in both sides?"
        />
        <button type="submit" className="btn btn-outline-success">
          Create
        </button>
      </form>
    );
  }
}

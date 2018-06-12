import React, { Component } from 'react';
import { view, store, route } from 'react-easy-stack';
import { FormGroup } from 'material-ui/Form';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import * as app from './appStore';

const buttonStyle = {
  marginTop: 10
};

class Login extends Component {
  store = store();

  onChange = ev => {
    this.store[ev.target.name] = ev.target.value;
  };

  onLogin = async () => {
    await app.login(this.store);
    route({ to: '/' });
  };

  onRegister = async () => {
    await app.register(this.store);
    route({ to: '/' });
  };

  render() {
    return (
      <FormGroup>
        <TextField
          type="email"
          name="email"
          label="Email"
          autoComplete="email"
          margin="dense"
          onChange={this.onChange}
        />
        <TextField
          type="password"
          name="pass"
          label="Password"
          autoComplete="new-password"
          margin="dense"
          onChange={this.onChange}
        />
        <TextField
          name="username"
          label="Username"
          autoComplete="username"
          margin="dense"
          onChange={this.onChange}
        />
        <Button
          onClick={this.onLogin}
          color="primary"
          variant="raised"
          style={buttonStyle}
        >
          Login
        </Button>
        <Button onClick={this.onRegister} variant="raised" style={buttonStyle}>
          Register
        </Button>
      </FormGroup>
    );
  }
}

export default view(Login);

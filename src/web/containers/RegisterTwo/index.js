import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Header from '../../components/HeaderRegister';
import './style.css';

export default class LoginPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="registerContainer">
        <Header />
        <Paper
          className="bodyContainer"
          zDepth={1}
          style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
        >
          <h3 className="pageHeader">Please choose your password</h3>
          <TextField
            floatingLabelText="User Name"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <TextField
            floatingLabelText="Confirm User Name"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <TextField
            type="password"
            floatingLabelText="Password"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <p
            style={{
              fontSize: '12px',
              color: '#9a9a9a',
              lineHeight: '14px',
              margin: 0,
            }}
          >
            Password should be 8-12 characters containing numbers, mixed case alphabets, and special
            characters
          </p>
          <TextField
            type="password"
            floatingLabelText="Confirm Password"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <p
            style={{
              fontSize: '14px',
              color: '#9a9a9a',
            }}
          >
            By clicking Submit, you are agreeing to our Terms of Service Submit
            <FlatButton
              label="Terms of Service"
              style={{
                display: 'inline',
                paddingLeft: '0px',
                border: 'none',
                color: 'blue',
                minWidth: 'none',
              }}
              hoverColor="transparent"
              onClick={this.redirectRegister}
            />
          </p>

          <div className="buttonWrapper">
            <RaisedButton label="Submit" primary />
            <FlatButton
              label="Login"
              icon={<ActionHome color="green" />}
              hoverColor="transparent"
            />
          </div>
        </Paper>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionHome from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Header from '../../components/Header';
import './style.css';

class LoginPage extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.redirectRegister = this.redirectRegister.bind(this);
  }

  redirectRegister() {
    this.props.history.push('/registerOne');
  }

  render() {
    return (
      <div className="loginContainer">
        <Header />
        <Paper
          className="bodyContainer"
          zDepth={1}
          style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}
        >
          <h3 className="pageHeader">Please Login</h3>
          <TextField
            floatingLabelText="User Name"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />

          <TextField
            type="password"
            floatingLabelText="Password"
            floatingLabelStyle={{ color: '#5a5a5a' }}
            fullWidth
          />
          <p
            style={{
              fontSize: '12px',
              color: '#9a9a9a',
              lineHeight: '14px',
              marginTop: 0,
            }}
          >
            Password should be 8-12 characters containing numbers, mixed case alphabets, and special
            characters
          </p>
          <div className="buttonWrapper">
            <RaisedButton label="Login" primary />
            <FlatButton
              label="Forgot Password"
              icon={<ActionHome color="green" />}
              hoverColor="transparent"
              onClick={this.redirectRegister}
            />
            <FlatButton
              label="Register"
              icon={<ActionHome color="green" />}
              hoverColor="transparent"
              onClick={this.redirectRegister}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withRouter(LoginPage);

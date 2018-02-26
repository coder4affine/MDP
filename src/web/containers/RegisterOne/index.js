import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
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
          <h3 className="pageHeader">Please enter your enrollment information</h3>
          <TextField
            floatingLabelText="First Name"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <TextField
            floatingLabelText="Last Name"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />

          <DatePicker
            floatingLabelText="Date of Birth (MM/DD/YYYY)"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <TextField
            floatingLabelText="Medicaid ID"
            fullWidth
            floatingLabelStyle={{ color: '#5a5a5a' }}
          />
          <p
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#9a9a9a',
              textAlign: 'center',
              margin: '5px 0 -20px 0',
            }}
          >
            OR
          </p>
          <TextField floatingLabelText="SSN" fullWidth floatingLabelStyle={{ color: '#5a5a5a' }} />

          <div className="buttonWrapper">
            <RaisedButton label="Next" primary />
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

import React from 'react';
// import PropTypes from 'prop-types';
import appLogo from '../../../images/appLogo.png';
import dxcLogo from '../../../images/dxc_logo.png';
import './style.css';

const Header = () => (
  <header className="loginHeader">
    <div className="language"> English</div>
    <div className="logoAppName">
      <div className="appName">
        <img src={appLogo} width="50" height="50" alt="MDP Logo" />
        <h1 className="appHeader">Mobile Digital Platform</h1>
      </div>
      <div className="vendorName">
        <img src={dxcLogo} width="250" height="50" alt="DXC logo" />
      </div>
    </div>
  </header>
);

Header.propTypes = {};

export default Header;

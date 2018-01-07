import { getAlerts, changeAlertStatus, getFile } from './alertsAction';
import { changeAppRoot, appInitialized } from './app';
import { login, refreshToken, checkUserExist, register, logout } from './authAction';
import getGroupMember from './digitalCardAction';
import loadHome from './homeAction';
import changeLocale from './languageAction';
import getMemberResource from './memberResourceAction';
import setPin from './pinActions';

export default {
  getAlerts,
  changeAlertStatus,
  getFile,
  changeAppRoot,
  appInitialized,
  login,
  refreshToken,
  checkUserExist,
  register,
  logout,
  getGroupMember,
  loadHome,
  changeLocale,
  getMemberResource,
  setPin,
};

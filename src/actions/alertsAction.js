import moment from 'moment';
import * as types from '../constants/actionTypes';
import { refreshToken } from './authAction';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export function getAlerts(token) {
  return (dispatch) => {
    dispatch(Action(types.LOAD_ALERTS));
    return Api.jsonService(`${config.serviceApi}MDP/api/alerts/getAlerts`, 'get', null, token)
      .then((result) => {
        dispatch(Action(types.LOAD_ALERTS_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.LOAD_ALERTS_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function loadAlerts(user) {
  return (dispatch) => {
    if (moment().isBefore(user.expires)) {
      return getAlerts(`${user.token_type} ${user.access_token}`)(dispatch);
    }
    return refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })(dispatch).then(() => getAlerts(user.access_token)(dispatch));
  };
}

import * as types from '../constants/actionTypes';
import Api, { Action } from '../utils/apiUtil';
import * as config from '../config.json';

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

export function changeAlertStatus(token, data) {
  return (dispatch) => {
    dispatch(Action(types.CHANGE_ALERT_STATUS));
    return Api.jsonService(
      `${config.serviceApi}MDP/api/alerts/changeAlertStatus`,
      'post',
      data,
      token,
    )
      .then((result) => {
        dispatch(Action(types.CHANGE_ALERT_STATUS_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.CHANGE_ALERT_STATUS_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function getFile(token, data) {
  return (dispatch) => {
    dispatch(Action(types.GET_FILE));
    return Api.jsonService(`${config.serviceApi}MDP/api/alerts/getFile`, 'post', data, token)
      .then((result) => {
        dispatch(Action(types.GET_FILE_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.GET_FILE_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

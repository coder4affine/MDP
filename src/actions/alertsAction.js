import * as types from '../constants/actionTypes';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export default function getAlerts(token) {
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

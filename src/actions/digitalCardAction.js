import * as types from '../constants/actionTypes';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export default function getGroupMember(token) {
  return (dispatch) => {
    dispatch(Action(types.LOAD_DIGITAL_CARD));
    return Api.jsonService(`${config.serviceApi}MDP/api/cards/getGroupMember`, 'get', null, token)
      .then((result) => {
        if (result.Payload.data) {
          dispatch(Action(types.LOAD_DIGITAL_CARD_SUCCESS, result.Payload.data));
          dispatch(Action(types.SET_USER, result.Payload.data[0]));
          dispatch(Action(types.CARD_CHANGED, result.Payload.data[0]));
        }
      })
      .catch((error) => {
        dispatch(Action(types.LOAD_DIGITAL_CARD_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

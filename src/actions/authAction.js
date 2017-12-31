import moment from 'moment';
import * as types from '../constants/actionTypes';
import { changeAppRoot } from './app';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export function login(data) {
  return (dispatch) => {
    dispatch(Action(types.LOGIN_REQUEST));
    return Api.jsonService(`${config.serviceApi}MDP/api/users/login`, 'post', data)
      .then((result) => {
        if (result.Success) {
          const expires = moment()
            .add(result.Payload.data.expires_in - 10, 'seconds')
            .toDate();
          dispatch(Action(types.LOGIN_SUCCESS, { ...result.Payload.data, expires }));
        }
      })
      .catch((error) => {
        dispatch(Action(types.LOGIN_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function refreshToken(data) {
  return (dispatch) => {
    dispatch(Action(types.LOGIN_REQUEST));
    return Api.encodedService(`${config.serviceApi}token`, 'post', data)
      .then((result) => {
        const expires = moment()
          .add(result.expires_in - 10, 'seconds')
          .toDate();
        dispatch(Action(types.LOGIN_SUCCESS, { ...result, expires }));
      })
      .catch((error) => {
        dispatch(Action(types.LOGIN_FAIL, error));
      });
  };
}

export function checkUserExist(data) {
  return (dispatch) => {
    dispatch(Action(types.CHECK_USER_EXIST_REQUEST));
    return Api.jsonService(`${config.serviceApi}MDP/api/cards/isGroupMemberExist`, 'post', data)
      .then((result) => {
        dispatch(Action(types.CHECK_USER_EXIST_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.CHECK_USER_EXIST_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function register(data) {
  return (dispatch) => {
    dispatch(Action(types.REGISTER_REQUEST));
    const { UserName, Password } = data;
    return Api.jsonService(`${config.serviceApi}MDP/api/users/register`, 'post', data)
      .then(result =>
        login({ UserName, Password })(dispatch).then(() => {
          dispatch(Action(types.REGISTER_SUCCESS, result.Payload.data));
        }))
      .catch((error) => {
        dispatch(Action(types.REGISTER_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(changeAppRoot(types.LOGIN));
    dispatch(Action(types.SET_USER, null));
    dispatch(Action(types.CARD_CHANGED, null));
    dispatch(Action(types.LOGIN_SUCCESS, null));
    dispatch(Action(types.HOME_SUCCESS, null));
    dispatch(Action(types.LOAD_DIGITAL_CARD_SUCCESS, null));
    dispatch(Action(types.LOAD_MEMBER_RESOURCE_SUCCESS, null));
    dispatch(Action(types.LOAD_ALERTS_SUCCESS, null));
  };
}

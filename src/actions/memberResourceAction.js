import moment from 'moment';
import * as types from '../constants/actionTypes';
import { refreshToken } from './authAction';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export function getMemberResource(token) {
  return (dispatch) => {
    dispatch(Action(types.LOAD_MEMBER_RESOURCE));
    return Api.jsonService(
      `${config.serviceApi}MDP/api/memberResource/getMemberResources`,
      'get',
      null,
      token,
    )
      .then((result) => {
        dispatch(Action(types.LOAD_MEMBER_RESOURCE_SUCCESS, result.Payload.data));
      })
      .catch((error) => {
        dispatch(Action(types.LOAD_MEMBER_RESOURCE_FAIL, error.response._bodyText)); // eslint-disable-line
      });
  };
}

export function loadMemberResource(user) {
  return (dispatch) => {
    if (moment().isBefore(user.expires)) {
      return getMemberResource(`${user.token_type} ${user.access_token}`)(dispatch);
    }
    return refreshToken({ refresh_token: user.refresh_token, grant_type: 'refresh_token' })(dispatch).then((data) => {
      console.log(data);
      return getMemberResource(user.access_token)(dispatch);
    });
  };
}

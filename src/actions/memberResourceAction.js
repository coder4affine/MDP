import * as types from '../constants/actionTypes';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export default function getMemberResource(token) {
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

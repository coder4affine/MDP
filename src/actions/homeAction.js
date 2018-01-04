import * as types from '../constants/actionTypes';
import Api, { Action } from '../utils/apiUtil';
import config from '../config';

export default function loadHome() {
  return (dispatch) => {
    dispatch(Action(types.HOME_REQUEST));
    const en = Api.htmlService(`${config.webURI}HtmlFiles/home_en_US.html`);
    const es = Api.htmlService(`${config.webURI}HtmlFiles/home_es_US.html`);

    return Promise.all([en, es])
      .then((result) => {
        dispatch(Action(types.HOME_SUCCESS, {
          en: result[0],
          es: result[1],
        }));
      })
      .catch((error) => {
        dispatch(Action(types.HOME_FAIL, error));
      });
  };
}

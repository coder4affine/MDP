import * as types from '../constants/actionTypes';

export default function setPin(pin) {
  return { type: types.SET_PIN, pin };
}

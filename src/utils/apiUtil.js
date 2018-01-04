import moment from 'moment';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export const Action = (type, payload) => ({
  type,
  payload,
  updatedOn: moment().toDate(),
});

class Api {
  static jsonService(url, method, data, token) {
    let options = { method };
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (data) {
      options = { ...options, body: JSON.stringify(data) };
    }
    if (token) {
      headers = { ...headers, Authorization: token };
    }
    options = { ...options, headers };
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }

  static htmlService(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(checkHttpStatus)
        .then(res => res.text())
        .then(html => resolve(html))
        .catch(err => reject(err));
    });
  }

  static encodedService(url, method, data) {
    const encodedData = Object.keys(data)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');
    return new Promise((resolve, reject) => {
      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: encodedData,
      })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
  }
}

export default Api;

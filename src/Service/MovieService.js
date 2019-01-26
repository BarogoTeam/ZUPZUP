import { BACKEND_URL } from '../Constants';

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

const Header = new Headers();
Header.append("Content-Type", "application/json");

export default class MovieService {
  static getScreenMovies() {
    return fetch(`${BACKEND_URL}/screenMovies`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }
}
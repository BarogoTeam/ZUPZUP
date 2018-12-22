import { BACKEND_URL } from '../Constants';

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export default class AlarmService {

  static getCinemas() {
    const Header = new Headers();
    Header.append("Content-Type", "application/json");

    const myInit = {
      method: 'GET',
      headers: Header
    };

    return fetch(`${BACKEND_URL}/cinemas`, myInit).then((response) => {
      return response.json();
    })
  }
  static getScreens(cinemas, alarmDate) {

    const Header = new Headers();
    Header.append("Content-Type", "application/json");

    const myInit = {
      method: 'GET',
      headers: Header
    };
    const queryString = objToQueryString({
      cinemaIds : cinemas.map(cinema => `${cinema.divisionCode}|${cinema.detailDivisionCode}|${cinema.code}`).join(','),
      alarmDate: alarmDate.format('YYYY-MM-DD')
    });
    return fetch(`${BACKEND_URL}/screens?${queryString}`, myInit).then((response) => {
      return response.json();
    })
  }

  static getMovie(movieCode) {
    const Header = new Headers();
    Header.append("Content-Type", "application/json");

    const myInit = {
      method: 'GET',
      headers: Header
    };
    return fetch(`${BACKEND_URL}/movies/${movieCode}`, myInit).then((response) => {
      return response.json();
    })
  }

}
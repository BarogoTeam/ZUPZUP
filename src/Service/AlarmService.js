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

export default class AlarmService {
  static getCinemas() {
    return fetch(`${BACKEND_URL}/cinemas`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }

  static getScreens(cinemas, alarmDate) {
    const queryString = objToQueryString({
      cinemaIds : cinemas.map(cinema => `${cinema.divisionCode}|${cinema.detailDivisionCode}|${cinema.code}`).join(','),
      alarmDate: alarmDate.format('YYYY-MM-DD')
    });

    return fetch(`${BACKEND_URL}/screens?${queryString}`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }

  static getMovie(movieCode) {
    return fetch(`${BACKEND_URL}/movies/${movieCode}`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }

  static getSeats(screens) {
    return fetch(`${BACKEND_URL}/seats/${JSON.stringify}`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }

  static getAlarms(userKey){
    return fetch(`${BACKEND_URL}/alarms/${userKey}`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }
}
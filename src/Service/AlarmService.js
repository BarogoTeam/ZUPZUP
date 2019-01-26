import { BACKEND_URL } from '../Constants';
import {objToQueryString, Header, responseHandler} from "./ServiceUtil";

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

  static getSeats(cinemaId, screenId, alarmDate) {
    const queryString = objToQueryString({
      cinemaId,
      screenId,
      alarmDate
    });

    return fetch(`${BACKEND_URL}/seats?${queryString}`, {
      method: "GET",
      headers: Header
    }).then((response) => {
      return response.json();
    })
  }

  static getAlarms(){
    return fetch(`${BACKEND_URL}/alarms`, {
      method: "GET",
      headers: Header
    }).then(responseHandler);
  }
}
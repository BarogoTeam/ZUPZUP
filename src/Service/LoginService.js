import { BACKEND_URL } from '../Constants';
import {responseHandler, Header} from "./ServiceUtil";

export default class LoginService {
  static signIn(email, password) {
    return fetch(`${BACKEND_URL}/signIn`, {
      method: "POST",
      headers: Header,
      body: JSON.stringify({
        email,
        password
      })
    }).then(responseHandler);
  }
}

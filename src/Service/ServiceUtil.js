
export function Header() {
  const Header = new Headers();
  Header.append("Content-Type", "application/json");
  Header.append("authorization", "Bearer " + localStorage.getItem("token"));
  return Header;
}

export function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValuePairs.join('&');
}

export function responseHandler(response) {
  return response.ok ? response.json() : Promise.reject(response.json());
}
export const Header = new Headers();
Header.append("Content-Type", "application/json");

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
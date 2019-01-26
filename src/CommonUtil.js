export function ArrayClone(array) {
  return JSON.parse(JSON.stringify(array));
}

export function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}
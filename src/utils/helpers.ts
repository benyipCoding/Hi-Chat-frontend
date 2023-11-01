export const TOKEN_KEY = 'HI_TOKEN';

export function setLocalStorage(data: unknown) {
  return localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
}

export function getLocalStorage() {
  return localStorage.getItem(TOKEN_KEY);
}

export function delLocalStorage() {
  return localStorage.removeItem(TOKEN_KEY);
}

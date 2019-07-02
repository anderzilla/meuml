export const TOKEN_KEY = "@MeuML-Token";
export const TOKEN_EXPIRE_IN = "@MeuML-Token-expire";
export const USER_ID = "@MeuML-UserId";
export const USER_NAME = "@MeuML-UserName";
export const USER_EMAIL = "@MeuML-UserEmail";
export const USER_SELLER_ID = "@MeuML-UserSellerId";
export const API = "https://api.app2.meuml.com";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token,expire) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRE_IN, expire);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const getUserId = () => localStorage.getItem(USER_ID);
export const getUserName = () => localStorage.getItem(USER_NAME);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL);
export const getUserSellerId = () => localStorage.getItem(USER_SELLER_ID);
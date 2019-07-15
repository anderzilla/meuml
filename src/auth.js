import Moment from 'moment';
export const TOKEN_KEY = "@MeuML-Token";
export const TOKEN_EXPIRE_IN = "@MeuML-Token-expire";
export const USER_ID = "@MeuML-UserId";
export const USER_NAME = "@MeuML-UserName";
export const USER_EMAIL = "@MeuML-UserEmail";
export const USER_SELLER_ID = "@MeuML-UserSellerId";
export const API = "https://api.app2.meuml.com";

export const isAuthenticated = () => {

    const expireToken = Moment(localStorage.getItem("@MeuML-Token-expire")).format("DD/MM/YYYY HH:mm");
    const dataFim = Moment().format("DD/MM/YYYY HH:mm");
    if(expireToken > dataFim)
    {
      if(localStorage.getItem(TOKEN_KEY) !== null){
        console.log(localStorage.getItem(TOKEN_KEY));
        return true
      }

    }else{
      console.log("false"+localStorage.getItem(TOKEN_KEY));
    return false
    }

}
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
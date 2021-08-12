import Axios from "axios";
import React, { useContext, useMemo, useState } from "react";
import { useCallback } from "react";

import {
  setToken,
  setInterceptors,
  getToken,
  removeToken,
} from "../tokenService/token";


import { APIURL } from "../utils";

export const UserContext = React.createContext<IUserContextType>({
  user: null,
  userActions: null,
  errors: "",
});

UserContext.displayName = 'Users Context';

export const UserProvider: React.FC = ({ children }) => {
  const [userErrors, setUserErrors] = useState("");
  const [user, setUser] = useState<null | any>(null);
  if (getToken("access_token")) {
    setInterceptors();
  }
  const LoginUser = (user: IUserLogin) => {
    Axios.post(APIURL + "/oauth/token", { ...user, grant_type: 'password', client_id: process.env.REACT_APP_CLIENT_ID })
      .then((res) => {
        setUserErrors("");
        setToken("access_token", res.data.data.access_token);
        setToken("refresh_token", res.data.data.refresh_token);
        setToken("user_data", JSON.stringify(res.data.data.user))
        setUser(res.data.data.user);
        setInterceptors();
      })
      .catch((err) => {
        console.log(err)
        setUserErrors(err.response.data.data);
      });
  };

  const LogoutUser = useCallback(() => {
    setUser({ ...user });
    removeToken("access_token");
    removeToken("refresh_token");
    removeToken("user_data")
  }, [user])

  const recoverPassword = useCallback(async (values:{username:string}) => {
    const res = await Axios.post(APIURL+'/users/recover_password',values)
    return res;
  }, [])

  const updatePassword = useCallback(async (values:{uid:string,password:string})=>{
    const res = await Axios.put(APIURL+'/users/update_password',values);
    if(!res.data.errors){
      window.location.href = '/';
    }
  },[])

  const userActions = useMemo(
    () => ({
      loginUser: (user: IUserLogin) => LoginUser(user),
      logout: () => LogoutUser(),
      recoverPassword,
      updatePassword
    }),
    [LogoutUser]
  );
  let token = getToken("user_data")
  const value = {
    user: token ? JSON.parse(token) : null,
    userActions,
    errors: userErrors,
  };

 
  return (
    <UserContext.Provider value={value} >

      {children}
    </UserContext.Provider>
  );
};

interface IUserContextType {
  user?: any,
  userActions?: any,
  errors?: string
}

export interface IUserLogin {
  email: string,
  password: string
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

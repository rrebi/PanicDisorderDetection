import axios from "axios";
import User from "../models/user";
import {LoginResponse} from "../models/login-response";
import { handleLogout } from "../utils/helpers";

export const logoutUser = (): Promise<string> => {
  
  return new Promise((resolve, reject) => {
    const headers = { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}};
    axios.post("http://127.0.0.1:5000/api/users/logout", {
      username: localStorage.getItem("username"),
    }, headers).then((response) => {
      console.log(response);
      handleLogout();
      resolve(response.data.msg);

    }).catch((error) => {
      console.log(error);
      handleLogout();
      reject("An error occurred while trying to logout.");
    });
  });
  
};

export const loginUser = (username: string, password: string): Promise<LoginResponse> => {
    return new Promise((resolve, reject) => {
      axios.post("http://127.0.0.1:5000/api/users/login", {
        username: username,
        password: password
      })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          reject("Invalid credentials.");
        } else {
          reject("An error occurred while trying to login.");
        }
      });
    });
  };

  const formatDate = (date: Date): string => {
    let stringDate: string = '';
    stringDate += date.getFullYear() + '-';
    stringDate += (date.getMonth() + 1) + '-';
    stringDate += date.getDate();
    return stringDate;
  }

  export const registerUser = (user: User) => {
    console.log(user);
    try {
        
            axios.post("http://127.0.0.1:5000/api/users/register", {
              username: user.username,
              password: user.password,
              first_name: user.first_name
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
                return error.response.data.msg;
            });
    } catch (error) {
        console.log(error);
    }
  };
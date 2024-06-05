import axios from 'axios';
import { Disorder } from '../models/disorder';
import User from '../models/user';

export const getDisorders = async (token: string): Promise<Disorder[]> => {
  const headers = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  return new Promise((resolve, reject) => {
    axios
      .get("http://127.0.0.1:5000/api/disorders", headers)
      .then((response) => {
        console.log(response);
        resolve(response.data.disorders);
      })
      .catch((error) => {
        console.log(error);
        reject("An error occurred while trying to get disorders.");
      });
  });
};

export const getDisorder = async (token: string, id: number): Promise<Disorder> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios
        .get(`http://127.0.0.1:5000/api/disorder/${id}`, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.entry);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to get disorder.");
        });
    });

};

export const updateDisorder = async (token: string, disorder: Disorder): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    console.log(disorder);
    return new Promise((resolve, reject) => {
        axios.put(`http://127.0.0.1:5000/api/disorder/${disorder.id}`, disorder, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to update disorder.");
        });
    });
};

export const deleteDisorder = async (token: string, id: number): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.delete(`http://127.0.0.1:5000/api/disorder/${id}`, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to delete disorder.");
        });
    });
};

export const addDisorder = async (token: string, disorder: Disorder): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.post(`http://127.0.0.1:5000/api/disorders`, disorder, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to add disorder.");
        }
        );
    });
};

export const getUser = async (token: string): Promise<User> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.get("http://127.0.0.1:5000/api/users/account", headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.user);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to get user.");
        });
    });
};


export const updateUser = async (token: string, user: User): Promise<string> => {
    console.log(user);
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    
        return new Promise((resolve, reject) => {
            axios.put("http://127.0.0.1:5000/api/users/account", {
                username: user.username,
                first_name: user.first_name,
            }, headers).then((response) => {
                console.log(response);
                resolve(response.data.msg);
            }).catch((error) => {
                console.log(error);
                reject("An error occurred while trying to update user.");
            });
        });
    
    
};

export const updatePassword = async (token: string, password: string, newPassword: string): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const body = {
        password: password,
        new_password: newPassword
    }
    return new Promise((resolve, reject) => {
        axios.put("http://127.0.0.1:5000/api/users/account/password", body, headers)
        .then((response) => {
            console.log(response);
            resolve(response.data.msg);
        })
        .catch((error) => {
            console.log(error);
            reject("An error occurred while trying to update password.");
        });
    });
};

export const predict = async (token: string, disorderId: number, algorithm: number): Promise<string> => {
    const headers = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    return new Promise((resolve, reject) => {
        axios.get(`http://127.0.0.1:5000/api/predict/${disorderId}/${algorithm}`, headers)
            .then((response) => {
                console.log(response);
                resolve(response.data.prediction);
            })
            .catch((error) => {
                console.log(error);
                reject("An error occurred while trying to predict the disorder.");
            });
    });
};
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token") || null;
    if (token) {
      const verifyToken = async () => {
        const url = "http://127.0.0.1:8000/v1/auth";
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        let response = await fetch(url, options);

        if (response.status === 200) {
          console.log("token valid");
          setAuthenticated(true);
        } else {
          console.log("token invalid");
          window.localStorage.removeItem("token");
          setAuthenticated(false);
        }
      };

      verifyToken();

      console.log(authenticated);
    }
  }, []);

  return (
    <AuthContext.Provider value={[authenticated, setAuthenticated]}>
      {props.children}
    </AuthContext.Provider>
  );
};

const apiCall = async (url, body) => {
  const options = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  };
  return await fetch(url, options);
};

export const Login = async (form) => {
  const url = "http://127.0.0.1:8000/v1/login";
  let user = {
    email: form.userName,
    password: form.password,
  };

  let response = apiCall(url, user);
  response = await response;
  console.log(response.status);
  if (response.status === 200) {
    response = await response.json();
    window.localStorage.setItem("token", response.token);
    return true;
  }
  response = await response.json();
  //   alert(response.message);
  console.log("returning login false");
  return false;
};

export const Signup = async (form) => {
  let user = {
    first_name: form.firstName,
    last_name: form.lastName,
    email: form.userName,
    password: form.password,
  };

  const url = "http://127.0.0.1:8000/v1/signup";
  let response = apiCall(url, user);
  response = await response;
  if (response.status === 201) {
    response = await response.json();
    window.localStorage.setItem("token", response.token);
    return true;
  } else if (response.status === 401) {
    response = await response.json();
    alert(response.message);
    return false;
  }
};

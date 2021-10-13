import "../../sass/main.css";
import { useState, useEffect, useContext } from "react";
import LoginPresentation from "./LoginPresentation";
import { ValidateAll } from "../../util/AuthFormValidation";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import env from "react-dotenv";

const intialErrors = {
  email: "",
  password: "",
};

const Login = () => {
  const [authenticated, setAuthenticated] = useContext(AuthContext);
  const [FormErrors, setFormErrors] = useState({ ...intialErrors });
  const [rememberedUser, setRememberedUser] = useState("");
  const [Form, setForm] = useState({
    email: rememberedUser,
    password: "",
    rememberMe: false,
  });
  const [LoginResponse, setLoginResponse] = useState("");

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    if (email) {
      setForm({ ...Form, email: email });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoginResponse("");
    }, 3000);
  }, [LoginResponse]);

  useEffect(() => {}, [FormErrors]);

  const onChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const HandleRememberMe = (e) => {
    setForm({ ...Form, rememberMe: e.target.checked });
  };

  const HandleValidation = (e, form) => {
    e.preventDefault();
    let errors = { ...intialErrors };
    errors = ValidateAll(errors, form, "login");
    setFormErrors({ ...errors });

    if (!errors.active && form.rememberMe) {
      window.localStorage.setItem("email", form.email);
    }

    if (!errors.active) {
      LoginCall();
    }
  };

  const LoginCall = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${env.API_URL}/login`,
        data: { email: Form.email, password: Form.password },
      });
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        setAuthenticated(true);
      }
    } catch (e) {
      setLoginResponse(e.response.data.message);
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <LoginPresentation
      HandleValidation={HandleValidation}
      FormErrors={FormErrors}
      rememberedUser={rememberedUser}
      onChange={onChange}
      HandleRememberMe={HandleRememberMe}
      Form={Form}
      LoginResponse={LoginResponse}
    />
  );
};

export default Login;

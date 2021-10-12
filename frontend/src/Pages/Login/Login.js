import "../../sass/main.css";
import { useState, useEffect } from "react";
import LoginPresentation from "./LoginPresentation";
import { ValidateAll } from "../../util/AuthFormValidation";

const intialErrors = {
  email: "",
  password: "",
};

const Login = () => {
  const [FormErrors, setFormErrors] = useState({ ...intialErrors });
  const [rememberedUser, setRememberedUser] = useState("");

  useEffect(() => {
    const email = window.localStorage.getItem("email");
    if (email) {
      setRememberedUser(email);
    }
  }, []);

  useEffect(() => {
    console.log(FormErrors);
  }, [FormErrors]);

  const HandleValidation = (e, form) => {
    e.preventDefault();
    let errors = { ...intialErrors };
    errors = ValidateAll(errors, form, "login");
    setFormErrors({ ...errors });

    if (!errors.active && form.rememberMe) {
      window.localStorage.setItem("email", form.email);
    }
  };

  return (
    <LoginPresentation
      HandleValidation={HandleValidation}
      FormErrors={FormErrors}
      rememberedUser={rememberedUser}
    />
  );
};

export default Login;

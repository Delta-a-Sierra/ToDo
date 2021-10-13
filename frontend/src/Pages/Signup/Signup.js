import "../../sass/main.css";
import { useState, useEffect, useContext } from "react";
import SignupPresentation from "./SignupPresentation";
import { ValidateAll } from "../../util/AuthFormValidation";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import env from "react-dotenv";

const intialErrors = {
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  tandc: false,
};

const Signup = () => {
  const [authenticated, setAuthenticated] = useContext(AuthContext);
  const [FormErrors, setFormErrors] = useState({ ...intialErrors });
  const [Form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    password2: "",
    tandc: false,
  });
  const [LoginResponse, setLoginResponse] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoginResponse("");
    }, 3000);
  }, [LoginResponse]);

  useEffect(() => {}, [FormErrors]);

  const onChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const HandleTandC = (e) => {
    setForm({ ...Form, tandc: e.target.checked });
  };

  const HandleValidation = (e, form) => {
    e.preventDefault();
    let errors = { ...intialErrors };
    errors = ValidateAll(errors, form, "signup");
    setFormErrors({ ...errors });

    if (!errors.active) {
      SignupCall();
    }
  };

  const SignupCall = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${env.API_URL}/signup`,
        data: {
          first_name: Form.firstName,
          last_name: Form.lastName,
          email: Form.email,
          password: Form.password,
        },
      });
      if (response.status === 201) {
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
    <SignupPresentation
      HandleValidation={HandleValidation}
      FormErrors={FormErrors}
      onChange={onChange}
      HandleTandC={HandleTandC}
      Form={Form}
      LoginResponse={LoginResponse}
    />
  );
};

export default Signup;

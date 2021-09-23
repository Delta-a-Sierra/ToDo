import "./style.css";
import { useState } from "react";

const intialForm = {
  userName: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
};

const intialErrors = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  password2: "",
  tandc: "",
};

const Form = ({ title, type }) => {
  const [form, setForm] = useState({ ...intialForm });

  const [errors, setErrors] = useState({ ...intialErrors });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    setErrors({ ...intialErrors });
    let newErrors = { ...intialErrors };

    validateName(newErrors);
    validatePassword(newErrors);
    validateEmail(newErrors);
    validatePassword2(newErrors);

    setErrors({ ...newErrors }, () => {
      return !errors.active;
    });
  };

  const validatePassword = (newErrors) => {
    const passwordRegex =
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$";
    const regexContainsCaps = "^(.*[A-Z]).*$";
    const regexContainsLower = "^(.*[a-z]).*$";

    if (!form.password.match(regexContainsCaps)) {
      newErrors.password =
        "Passwords needs to contain atleast 1 captial letter";
      newErrors.active = true;
    }

    if (!form.password.match(regexContainsLower)) {
      newErrors.password =
        "Passwords needs to contain atleast 1 lowercase letter";
      newErrors.active = true;
    }
  };

  const validatePassword2 = (newErrors) => {
    if (form.password !== form.password2) {
      newErrors.password2 = "Passwords do not match";
      newErrors.active = true;
    }
  };

  const validateEmail = (newErrors) => {
    const regexEmail = ".+\\@.+\\..+";

    if (!form.userName.match(regexEmail)) {
      newErrors.userName = "Please enter a valid Email";
      newErrors.active = true;
    }
  };

  const validateName = (newErrors) => {
    if (!form.firstName && type === "signup") {
      console.log("Firstname error");
      newErrors.firstName = "A first name is required";
      newErrors.active = true;
    }
    if (!form.lastName && type === "signup") {
      console.log("lastname error");
      newErrors.lastName = "A last name is required";
      newErrors.active = true;
    }
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
    let response = await fetch(url, options);
    return await response.json();
  };

  const Login = async (e) => {
    e.preventDefault();
    console.log(type);

    const url = "http://127.0.0.1:8000/v1/login";
    let user = {
      email: form.username,
      password: form.password,
    };

    const valid = await validate();

    if (!valid) {
      console.log("there were errors with the form");
    }

    if (valid) {
      console.log("Making Api Call");
      const response = apiCall(url, user);
      window.localStorage.setItem("token", response.token);
    }
  };

  const Signup = async (e) => {
    e.preventDefault();

    let user = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.userName,
      password: form.password,
    };

    const url = "http://127.0.0.1:8000/v1/signup";

    const valid = validate();

    if (!valid) {
      console.log("there were errors with the form");
    }

    if (valid) {
      console.log("Making Api Call");
      // const response = apiCall(url, user);
      // window.localStorage.setItem("token", response.token);
    }
  };

  return (
    <div className="Auth">
      <h1>{title}</h1>
      <form>
        {type === "signup" ? (
          <div className="two-col">
            <div className="input-Container">
              <p
                className={
                  errors.firstName ? "errorText" : "errorText invisible"
                }
              >
                {errors.firstName}
              </p>
              <label className="customInput" htmlFor="firstName">
                <input
                  className="txtInput"
                  id="firstName"
                  name="firstName"
                  onChange={(e) => onChange(e)}
                  value={form.firstName}
                  placeholder="First Name"
                  type="text"
                />
              </label>
            </div>
            <div className="input-Container">
              <p
                className={
                  errors.lastName ? "errorText" : "errorText invisible"
                }
              >
                {errors.lastName}
              </p>
              <label className="customInput" htmlFor="lastName">
                <input
                  className="txtInput"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => onChange(e)}
                  value={form.lastName}
                  placeholder="Last Name"
                  type="text"
                />
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="input-Container">
          <p className={errors.userName ? "errorText" : "errorText invisible"}>
            {errors.userName}
          </p>
          <label className="customInput" htmlFor="username">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 30 24"
            >
              <path
                id="Icon_material-mail-outline"
                data-name="Icon material-mail-outline"
                d="M30,6H6A3,3,0,0,0,3.015,9L3,27a3.009,3.009,0,0,0,3,3H30a3.009,3.009,0,0,0,3-3V9A3.009,3.009,0,0,0,30,6Zm0,21H6V12l12,7.5L30,12ZM18,16.5,6,9H30Z"
                transform="translate(-3 -6)"
                opacity="0.51"
              />
            </svg>

            <input
              className="txtInput"
              id="username"
              name="username"
              onChange={(e) => onChange(e)}
              value={form.userName}
              placeholder="Username"
              type="email"
            />
          </label>
        </div>
        <div className="input-Container">
          <p className={errors.password ? "errorText" : "errorText invisible"}>
            {errors.password}
          </p>
          <label className="customInput" htmlFor="password">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 36 36"
            >
              <path
                id="Icon_awesome-key"
                data-name="Icon awesome-key"
                d="M36,12.375A12.382,12.382,0,0,1,21.317,24.534l-1.688,1.9A1.687,1.687,0,0,1,18.367,27H15.75v2.813A1.687,1.687,0,0,1,14.063,31.5H11.25v2.813A1.687,1.687,0,0,1,9.563,36H1.688A1.687,1.687,0,0,1,0,34.313V28.824a1.688,1.688,0,0,1,.494-1.193L11.871,16.254A12.376,12.376,0,1,1,36,12.375ZM23.625,9A3.375,3.375,0,1,0,27,5.625,3.375,3.375,0,0,0,23.625,9Z"
                opacity="0.51"
              />
            </svg>
            <input
              className="txtInput"
              id="passwrd"
              name="password"
              onChange={(e) => onChange(e)}
              value={form.password}
              placeholder="Password"
              type="password"
            />
          </label>
        </div>
        {type === "signup" ? (
          <div className="input-Container">
            <p
              className={errors.password2 ? "errorText" : "errorText invisible"}
            >
              {errors.password2}
            </p>
            <label className="customInput" htmlFor="password">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                viewBox="0 0 36 36"
              >
                <path
                  id="Icon_awesome-key"
                  data-name="Icon awesome-key"
                  d="M36,12.375A12.382,12.382,0,0,1,21.317,24.534l-1.688,1.9A1.687,1.687,0,0,1,18.367,27H15.75v2.813A1.687,1.687,0,0,1,14.063,31.5H11.25v2.813A1.687,1.687,0,0,1,9.563,36H1.688A1.687,1.687,0,0,1,0,34.313V28.824a1.688,1.688,0,0,1,.494-1.193L11.871,16.254A12.376,12.376,0,1,1,36,12.375ZM23.625,9A3.375,3.375,0,1,0,27,5.625,3.375,3.375,0,0,0,23.625,9Z"
                  opacity="0.51"
                />
              </svg>
              <input
                className="txtInput"
                id="passwrd2"
                name="password2"
                onChange={(e) => onChange(e)}
                value={form.password2}
                placeholder="Confirm Password"
                type="password"
              />
            </label>
          </div>
        ) : (
          ""
        )}

        {type === "signup" ? (
          <div className="checkboxContainer">
            <div>
              <input
                className="checkbox"
                type="checkbox"
                name="rememberMe"
                id="rememmberMe"
              />
              <label htmlFor="rememberMe">
                I agree with <span>Privacy</span> and <span>Policy</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="checkboxContainer">
            <div>
              <input
                className="checkbox"
                type="checkbox"
                name="rememberMe"
                id="rememmberMe"
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <p>Forgot Password ? </p>
          </div>
        )}

        <button onClick={type === "signup" ? Signup : Login}>{title}</button>
      </form>
    </div>
  );
};

export default Form;

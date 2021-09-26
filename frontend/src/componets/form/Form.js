import "./style.css";
import { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext, Login, Signup } from "../../util/contexts/AuthContext";
import { validateAll } from "./AuthFormValidation";

const intialForm = {
  userName: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  tandc: false,
  rememberMe: false,
};

const intialErrors = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  password2: "",
  tandc: "",
  active: false,
};

const Form = ({ title, type }) => {
  const [form, setForm] = useState({ ...intialForm });
  const [errors, setErrors] = useState({ ...intialErrors });
  const [rememberedUser, setRememberedUser] = useState("");

  const [authenticated, setAuthenticated] = useContext(AuthContext);

  // ------------------------- Form update functions -------------------------

  //#region Form Update Function

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleCheckBox = (e) => {
    setForm({ ...form, [e.target.name]: !form[e.target.name] });
  };
  //#endregion

  useEffect(() => {
    if (rememberedUser) {
      console.log(`remembered user: ${rememberedUser}`);
      window.localStorage.setItem("username", rememberedUser);
    } else {
      if (type === "login") {
        const username = window.localStorage.getItem("username") || "";
        setForm({ ...form, userName: username });
      }
    }
  }, [rememberedUser]);

  let newErrors = { ...intialErrors };

  const resetErrors = () => {
    setErrors({ ...intialErrors });
  };

  const formLogin = async (event) => {
    event.preventDefault();
    resetErrors();
    let returnedErrors = validateAll(newErrors, form, type);
    setErrors({ ...returnedErrors });
    const valid = !newErrors.active;
    if (valid) {
      const newAuthen = await Login(form);
      setAuthenticated(newAuthen);
      if (form.rememberMe) {
        console.log("Remeber Me");
        setRememberedUser(form.userName);
      }
    }
  };

  const formSignup = async (event) => {
    event.preventDefault();
    resetErrors();
    let returnedErrors = validateAll(newErrors, form, type);
    setErrors({ ...returnedErrors });
    const valid = !newErrors.active;
    if (valid) {
      const newAuthen = await Login(form);
      setAuthenticated(newAuthen);
    }
  };
  //#endregion

  if (authenticated) {
    return <Redirect to="/" />;
  }

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
              <label
                className={
                  errors.firstName ? "customInput errorInput" : "customInput"
                }
                htmlFor="firstName"
              >
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
              <label
                className={
                  errors.lastName ? "customInput errorInput" : "customInput"
                }
                htmlFor="lastName"
              >
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
          <label
            className={
              errors.userName ? "customInput errorInput" : "customInput"
            }
            htmlFor="username"
          >
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
              id="userName"
              name="userName"
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
          <label
            className={
              errors.password ? "customInput errorInput" : "customInput"
            }
            htmlFor="password"
          >
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
            <label
              className={
                errors.password2 ? "customInput errorInput" : "customInput"
              }
              htmlFor="password"
            >
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
                onClick={(e) => toggleCheckBox(e)}
                className="checkbox"
                type="checkbox"
                name="tandc"
                id="tandc"
              />
              <label htmlFor="rememberMe">
                I agree with <span>Privacy</span> and <span>Policy</span>
              </label>
            </div>
            <p className={!form.tandc ? "errorText" : "errorText invisible"}>
              {errors.tandc}
            </p>
          </div>
        ) : (
          <div className="checkboxContainer">
            <div>
              <input
                onClick={(e) => toggleCheckBox(e)}
                className="checkbox"
                type="checkbox"
                name="rememberMe"
                id="rememmberMe"
              />
              <label htmlFor="rememberMe">Remember Me</label>
              <p>Forgot Password ? </p>
            </div>
          </div>
        )}

        <button onClick={type === "signup" ? formSignup : formLogin}>
          {title}
        </button>
      </form>
      {type === "signup" ? (
        <Link to="/login" className="login-signup-txt">
          Already Have an Account? <span>Login</span>
        </Link>
      ) : (
        <Link to="/Signup" className="login-signup-txt">
          Create an Account? <span>Signup</span>
        </Link>
      )}
    </div>
  );
};

export default Form;

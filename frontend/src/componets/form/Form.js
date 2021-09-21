import "./style.css";
import { useState } from "react";

const Form = ({ title, type }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changeFirstName = (e) => {
    setfirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setlastName(e.target.value);
  };

  return (
    <div className="Auth">
      <h1>{title}</h1>
      <form>
        {type === "signup" ? (
          <div className="two-col">
            <label className="customInput" for="firstName">
              <input
                className="txtInput"
                id="firstName"
                name="firstName"
                onChange={changeFirstName}
                value={firstName}
                placeholder="First Name"
                type="text"
              />
            </label>
            <label className="customInput" for="lastName">
              <input
                className="txtInput"
                id="lastName"
                name="lastName"
                onChange={changeLastName}
                value={lastName}
                placeholder="Last Name"
                type="text"
              />
            </label>
          </div>
        ) : (
          ""
        )}

        <label className="customInput" for="username">
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
            onChange={changeUserName}
            value={userName}
            placeholder="Username"
            type="email"
          />
        </label>
        <label className="customInput" for="password">
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
            onChange={changePassword}
            value={password}
            placeholder="Password"
            type="password"
          />
        </label>
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

        <button>{title}</button>
      </form>
    </div>
  );
};

export default Form;

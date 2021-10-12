import "../sass/main.css";
import { useState } from "react";
import { LargeButton, AuthAside } from "../componets";
import { Link } from "react-router-dom";

const Login = () => {
  const [FormError] = useState(false);

  return (
    <div className="Login">
      <AuthAside />
      <div className="Login__content">
        <div>
          <svg
            id="Logo_v2"
            className="Login__logo"
            data-name="Logo v2"
            xmlns="http://www.w3.org/2000/svg"
            width="115"
            height="113"
            viewBox="0 0 115 113"
          >
            <path
              id="Logo_v2-2"
              data-name="Logo v2"
              d="M74.428,113H9.2A9.131,9.131,0,0,1,0,103.96V9.04A9.131,9.131,0,0,1,9.2,0H74.428a9.131,9.131,0,0,1,9.2,9.04V51.234L56.4,87.886l1.35,1.109a2.515,2.515,0,0,0-2.172,2.342L55.022,98a2.609,2.609,0,0,0,1,2.307,2.333,2.333,0,0,0,2.243.355l6.019-2.177a2.565,2.565,0,0,0,1.636-2.783l1.456,1.2,16.255-21.88V103.96a9.131,9.131,0,0,1-9.2,9.04h0Zm-11.3-92.75A5.912,5.912,0,0,0,58.611,22a6.712,6.712,0,0,0-1.639,4.76A6.706,6.706,0,0,0,58.611,31.5a6.712,6.712,0,0,0,9.03.021,6.665,6.665,0,0,0,1.646-4.763A6.681,6.681,0,0,0,67.64,21.99,5.95,5.95,0,0,0,63.126,20.25Zm-31.7,0A5.906,5.906,0,0,0,26.914,22a6.705,6.705,0,0,0-1.639,4.76A6.706,6.706,0,0,0,26.914,31.5a5.891,5.891,0,0,0,4.514,1.757,5.95,5.95,0,0,0,4.509-1.736,6.665,6.665,0,0,0,1.647-4.763,6.672,6.672,0,0,0-1.647-4.769,5.95,5.95,0,0,0-4.514-1.74Zm14.549.26h-4V33H46a16.425,16.425,0,0,0,2.431-.182,5.611,5.611,0,0,0,2.156-.808,5.787,5.787,0,0,0,1.964-2.119,6.3,6.3,0,0,0,.776-3.123,6.564,6.564,0,0,0-.719-3.15,5.69,5.69,0,0,0-4.172-2.932,18.084,18.084,0,0,0-2.46-.172Zm-23.775,0H11.5v2.381h3.756V33h3.19V22.89H22.2ZM83.628,75.022V51.234L98.612,31.061l12.058,7.52.53-.677L83.631,75.018Zm29.2-39.306h0l-12.059-7.526-.321.41,2.1-2.825a6.821,6.821,0,0,1,5.493-2.814,6.69,6.69,0,0,1,4.282,1.554,7.337,7.337,0,0,1,2.618,4.865,7.528,7.528,0,0,1-1.426,5.4l-.69.928ZM63.134,30.9a2.72,2.72,0,0,1-1.075-.222,2.413,2.413,0,0,1-.93-.743,3.888,3.888,0,0,1-.631-1.271,6.725,6.725,0,0,1-.229-1.907,6.688,6.688,0,0,1,.243-1.921,3.771,3.771,0,0,1,.635-1.291,2.571,2.571,0,0,1,.92-.733,2.776,2.776,0,0,1,2.139.017,2.423,2.423,0,0,1,.926.733,3.9,3.9,0,0,1,.627,1.288,6.72,6.72,0,0,1,.234,1.9,6.708,6.708,0,0,1-.223,1.9,4.094,4.094,0,0,1-.631,1.271,2.377,2.377,0,0,1-.911.743,2.626,2.626,0,0,1-1.094.237Zm-31.7,0a2.74,2.74,0,0,1-1.077-.222,2.4,2.4,0,0,1-.93-.743,3.861,3.861,0,0,1-.631-1.271,6.681,6.681,0,0,1-.23-1.907,6.688,6.688,0,0,1,.243-1.921,3.786,3.786,0,0,1,.635-1.291,2.571,2.571,0,0,1,.92-.733,2.776,2.776,0,0,1,2.139.017,2.427,2.427,0,0,1,.924.733,3.87,3.87,0,0,1,.628,1.288,6.72,6.72,0,0,1,.234,1.9,6.668,6.668,0,0,1-.224,1.9,4.079,4.079,0,0,1-.628,1.271,2.386,2.386,0,0,1-.913.743,2.662,2.662,0,0,1-1.091.239Zm13.791-.243h-.059V22.84h.059c.653,0,1.226.011,1.7.032a3.2,3.2,0,0,1,2.688,1.757,5.458,5.458,0,0,1,.022,4.2,3.152,3.152,0,0,1-1.2,1.342,2.942,2.942,0,0,1-1.4.449c-.453.025-1.039.032-1.811.032Z"
              fill="#fff"
            />
          </svg>
        </div>
        <h1 className="Login__title">Log In</h1>
        <form className="AuthForm">
          <label
            htmlFor="name"
            className={`AuthForm__label ${
              FormError && "AuthForm__label--error"
            }`}
          >
            {FormError && <h4 className="AuthForm__error-txt ">Error text</h4>}
            <svg
              className="AuthForm__input-icon"
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
              className="AuthForm__input"
              type="email"
              placeholder="enter email"
              name="username"
            />
          </label>
          <label
            htmlFor="password"
            className={`AuthForm__label ${
              FormError && "AuthForm__label--error"
            }`}
          >
            {FormError && <h4 className="AuthForm__error-txt ">Error text</h4>}
            <svg
              className="AuthForm__input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
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
              className="AuthForm__input"
              type="password"
              placeholder="enter password"
              name="password"
            />
          </label>
          <label className="AuthForm__checkbox-container" htmlFor="">
            <input type="checkbox" />
            <h3 className="AuthForm__checkbox-text">remember username?</h3>
          </label>
          <LargeButton text="Log in" />
        </form>
        <Link to="/signup">
          <p className="Login__type-swap">
            No Account?{" "}
            <span className="Login__type-swap--bold">Create one</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

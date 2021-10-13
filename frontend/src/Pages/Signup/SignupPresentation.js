import { LargeButton, AuthAside } from "../../componets";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PasswordInput, EmailInput, Checkbox, Input } from "../../componets";

const SignupPresentation = ({
  FormErrors,
  HandleValidation,
  Form,
  HandleTandC,
  onChange,
  LoginResponse,
}) => {
  return (
    <div className="Login">
      <AuthAside
        title="Hello Friend"
        text="Welcome back, log in to continue creating tasks"
        link="/login"
        btnTxt="Log In"
      />
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
        <h1 className="Login__title">Sign Up</h1>
        <form
          title="form"
          className="AuthForm"
          onSubmit={(e) => HandleValidation(e, Form)}
        >
          <div className="AuthForm__row">
            <Input
              FormErrors={FormErrors}
              onChange={onChange}
              Form={Form}
              name="firstName"
              type="text"
              placeholder="enter first name"
            />
            <Input
              FormErrors={FormErrors}
              onChange={onChange}
              Form={Form}
              name="lastName"
              type="text"
              placeholder="enter last name"
            />
          </div>
          <EmailInput
            FormErrors={FormErrors}
            onChange={onChange}
            Form={Form}
            name="email"
            placeholder="enter email"
          />
          <PasswordInput
            FormErrors={FormErrors}
            onChange={onChange}
            Form={Form}
            name="password"
            placeholder="enter password"
          />
          <PasswordInput
            FormErrors={FormErrors}
            onChange={onChange}
            Form={Form}
            name="password2"
            placeholder="confirm password"
          />
          {LoginResponse && (
            <p className="AuthForm__response-txt">{LoginResponse}</p>
          )}
          <Checkbox
            name="tandc"
            onClick={HandleTandC}
            text="Agree to terms and conditions?"
          />
          <LargeButton
            onClick={(e) => HandleValidation(e, Form)}
            text="Sign Up"
          />
        </form>
        <Link to="/login">
          <p className="Login__type-swap">
            Already have an Account?
            <span className="Login__type-swap--bold"> Log In</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignupPresentation;

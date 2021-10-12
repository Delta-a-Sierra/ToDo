import { render, screen, fireEvent } from "@testing-library/react";

// import Login from "../Login";
// import { BrowserRouter } from "react-router-dom";
// import LoginPresentation from "../LoginPresentation";

// const MockErrors = {
//   email: "email not correct",
//   password: "password not correct",
// };

// const MockLoginPresentation = () => {
//   return (
//     <BrowserRouter>
//       <LoginPresentation FormErrors={MockErrors} />
//     </BrowserRouter>
//   );
// };

// const MockLogin = () => {
//   return (
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );
// };

// describe("Form Error Text", () => {
//   it("email Error text is visible when errorform has value for the field", () => {
//     render(<MockLoginPresentation FormErrors={MockErrors} />);
//     const errorTextElement = screen.getByText("email not correct");
//     expect(errorTextElement).toBeInTheDocument();
//   });

//   it("password Error text is visible when errorform has value for the field", () => {
//     render(<MockLoginPresentation FormErrors={MockErrors} />);
//     const errorTextElement = screen.getByText("password not correct");
//     expect(errorTextElement).toBeInTheDocument();
//   });

//   it("email error text is invisible when errorform has no value for the field", () => {
//     render(<MockLoginPresentation FormErrors={{ email: "" }} />);
//     const errorTextElement = screen.getByTestId("errorText-email");
//     expect(errorTextElement).toHaveClass("AuthForm__error-txt--invisible");
//   });

//   it("Password Error text is invisible when errorform has no value for the field", () => {
//     render(<MockLoginPresentation FormErrors={{ password: "" }} />);
//     const errorTextElement = screen.getByTestId("errorText-password");
//     expect(errorTextElement).toHaveClass(
//       "AuthForm__error-txt AuthForm__error-txt--invisible"
//     );
//   });
// });

// describe("form inputs", () => {
//   it("email border is red when it has an error", () => {
//     render(<MockLoginPresentation FormErrors={{ email: "test" }} />);
//     const labelElement = screen.getByTitle("label-email");
//     expect(labelElement).toHaveClass("AuthForm__label--error");
//   });

//   it("password border is red when it has an error", () => {
//     render(<MockLoginPresentation FormErrors={{ password: "test" }} />);
//     const labelElement = screen.getByTitle("label-password");
//     expect(labelElement).toHaveClass("AuthForm__label--error");
//   });
// });

// describe("validation", () => {
//   it("tests that border is red when given invalid details", () => {
//     render(<MockLogin />);
//     const labelElement = screen.getByTitle("label-email");
//     const emailInputElement = screen.getByPlaceholderText("enter email");
//     const errorTextElement = screen.getByTestId("errorText-email");
//     const formElement = screen.getByTitle("form");
//     fireEvent.submit(formElement);
//     expect(labelElement).toHaveClass("AuthForm__label--error");
//   });
// });

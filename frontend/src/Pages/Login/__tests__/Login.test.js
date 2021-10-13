import { render, screen, fireEvent } from "@testing-library/react";

import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/AuthContext";

const MockLogin = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Login Page - Form intergration", () => {
  const names = ["email", "password"];

  it("Test that errors display when you try to log in no inputs", () => {
    render(<MockLogin />);
    const buttonElement = screen.getByRole("button", { name: "Log in" });
    fireEvent.click(buttonElement);

    names.forEach((name) => {
      const errorTxtElement = screen.getByTestId(`errorText-${name}`);
      expect(errorTxtElement).toBeInTheDocument();
    });
  });

  it("Test that correct error text appears when you try to log in", () => {
    render(<MockLogin />);
    const emailInputElement = screen.getByPlaceholderText(`enter email`);
    fireEvent.change(emailInputElement, {
      target: { value: "user@email.com" },
    });
    const buttonElement = screen.getByRole("button", { name: "Log in" });
    fireEvent.click(buttonElement);
    const errorTxtElement = screen.queryByTestId(`errorText-email`);
    const passwordTxtElement = screen.queryByTestId(`errorText-password`);
    expect(errorTxtElement).not.toBeInTheDocument();
    expect(passwordTxtElement).toBeInTheDocument();
  });
});

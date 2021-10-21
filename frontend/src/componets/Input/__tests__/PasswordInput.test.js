import { render, screen } from "@testing-library/react";
import PasswordInput from "../EmailInput";

describe("Email Input Component", () => {
  let name = "email";
  const onChange = jest.fn();
  it("Test error text is invisible when no error text is passed to it", () => {
    render(
      <PasswordInput
        FormErrors={{ [name]: "" }}
        name={name}
        Form={{ [name]: "" }}
        onChange={onChange}
      />
    );
    const errorTextElement = screen.queryByTestId(`errorText-${name}`);
    expect(errorTextElement).not.toBeInTheDocument();
  });

  it("Test error text is visible when a error text is passed to it", () => {
    render(
      <PasswordInput
        FormErrors={{ [name]: "something" }}
        name={name}
        Form={{ [name]: "" }}
        onChange={onChange}
      />
    );
    const errorTextElement = screen.getByTestId(`errorText-${name}`);
    expect(errorTextElement).toBeInTheDocument();
  });

  it("Test border is default when no error is present", () => {
    render(
      <PasswordInput
        FormErrors={{ [name]: "" }}
        name={name}
        Form={{ [name]: "" }}
        onChange={onChange}
      />
    );
    const labelElement = screen.getByTitle(`label-${name}`);
    expect(labelElement).not.toHaveClass("Input__label--error");
  });

  it("Test border is error color when error is present", () => {
    render(
      <PasswordInput
        FormErrors={{ [name]: "test" }}
        name={name}
        Form={{ [name]: "" }}
        onChange={onChange}
      />
    );
    const labelElement = screen.getByTitle(`label-${name}`);
    expect(labelElement).toHaveClass("Input__label--error");
  });
});
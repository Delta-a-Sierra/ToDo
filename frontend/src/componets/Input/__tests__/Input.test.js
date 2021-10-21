import { render, screen } from "@testing-library/react";
import Input from "../EmailInput";

describe("Input Component", () => {
  let name = "firstName";
  const onChange = jest.fn();
  it("Test error text is invisible when no error text is passed to it", () => {
    render(
      <Input
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
      <Input
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
      <Input
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
      <Input
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

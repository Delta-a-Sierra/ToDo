import { fireEvent, render, screen } from "@testing-library/react";
import GroupDropdown from "../GroupDropdown";

describe("GroupsDropdown", () => {
  const FormErrors = {
    Group: "",
  };
  const Form = {
    Group: "",
  };

  const items = [
    {
      name: "mock group",
      description: "for testing",
      icon_id: 1,
      is_fav: false,
    },
    {
      name: "mock group 2",
      description: "for more testing",
      icon_id: 2,
      is_fav: true,
    },
  ];
  const onClick = jest.fn();

  const MockGroupDropdown = () => {
    return (
      <GroupDropdown
        FormErrors={FormErrors}
        onChange={onClick}
        placeholder="Select Group"
        name="Group"
        type="text"
        Form={Form}
        items={items}
      />
    );
  };

  it("test dropwdown is inactive by default", () => {
    render(<MockGroupDropdown />);
    expect(screen.queryByTestId("dropdown-container")).not.toBeInTheDocument();
  });

  it("test dropwdown is active on mouseEnter", () => {
    render(<MockGroupDropdown />);
    const dropdownParent = screen.getByTestId("dropdown-parent");
    fireEvent.mouseEnter(dropdownParent);
    expect(screen.queryByTestId("dropdown-container")).toBeInTheDocument();
  });

  it("test dropwdown is inactive on mouseLeave", () => {
    render(<MockGroupDropdown />);
    const dropdownParent = screen.getByTestId("dropdown-parent");
    const dropdownDropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdownParent);
    fireEvent.mouseLeave(dropdownDropdown);
    expect(screen.queryByTestId("dropdown-container")).not.toBeInTheDocument();
  });

  it("test dropwdown contains all items provided to it", () => {
    render(<MockGroupDropdown />);
    const dropdownParent = screen.getByTestId("dropdown-parent");
    fireEvent.mouseEnter(dropdownParent);
    items.forEach((group) => {
      expect(screen.getByText(group.name)).toBeInTheDocument();
    });
  });

  //   it("test selecting a group will display it in the input", () => {
  //     render(<MockGroupDropdown />);
  //     const inputElement = screen.getByPlaceholderText(/select a group/i);
  //     const dropdownParent = screen.getByTestId("dropdown-parent");
  //     fireEvent.mouseEnter(dropdownParent);
  //     items.forEach((group) => {
  //       const listItem = screen.getByText(group.name);
  //       fireEvent.click(listItem);
  //       expect(inputElement.value).toBe(group.name);
  //     });
  //   });
});

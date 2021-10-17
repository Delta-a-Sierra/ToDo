import { fireEvent, render, screen } from "@testing-library/react";
import GroupDropdown from "../GroupDropdown";
import { GroupProvider } from "../../../contexts/GroupContext";

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
      <GroupProvider>
        <GroupDropdown
          FormErrors={FormErrors}
          onChange={onClick}
          placeholder="Select Group"
          name="Group"
          type="text"
          Form={Form}
          items={items}
        />
      </GroupProvider>
    );
  };

  it("test dropwdown is inactive by default", () => {
    render(<MockGroupDropdown />);
    expect(screen.queryByTestId("dropdown-container")).not.toBeInTheDocument();
  });

  it("test dropwdown is active on mouseEnter", () => {
    render(<MockGroupDropdown />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    expect(screen.queryByTestId("dropdown-container")).toBeInTheDocument();
  });

  it("test dropwdown is inactive on mouseLeave", () => {
    render(<MockGroupDropdown />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    fireEvent.mouseLeave(dropdown);
    expect(screen.queryByTestId("dropdown-container")).not.toBeInTheDocument();
  });

  it("test dropwdown contains all items provided to it", () => {
    render(<MockGroupDropdown />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    items.forEach((group) => {
      expect(screen.getByText(group.name)).toBeInTheDocument();
    });
  });

  it("tests Create New group button display input for new group", () => {
    render(<MockGroupDropdown />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    const CreateNewOption = screen.getByText(/Create New Group/i);
    fireEvent.click(CreateNewOption);
    expect(screen.getByPlaceholderText("name new group")).toBeInTheDocument();
  });

  it("tests expects dropdown to be inactive when new group is active", () => {
    render(<MockGroupDropdown />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    const CreateNewOption = screen.getByText(/Create New Group/i);
    fireEvent.click(CreateNewOption);
    expect(screen.getByTestId("dropdown-parent")).not.toHaveClass(
      "Input__label--active"
    );
  });
});

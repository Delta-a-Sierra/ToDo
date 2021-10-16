import { render, screen, fireEvent, getNodeText } from "@testing-library/react";
import { NewTasks } from "../..";
import { GroupProvider } from "../../../contexts/GroupContext";

describe("New Task", () => {
  const MockNewTask = () => {
    return (
      <GroupProvider>
        <NewTasks />
      </GroupProvider>
    );
  };

  it("test selecting a group will display it in the input", () => {
    render(<MockNewTask />);
    const inputElement = screen.getByPlaceholderText(/select a group/i);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    const listItems = screen.queryAllByTestId("dropdown-item");
    listItems.forEach((item) => {
      fireEvent.click(item);
      const itemValue = getNodeText(item);
      expect(inputElement.value).toBe(itemValue);
    });
  });

  it("tests that new group cancel button hides new group and displays dropdown", () => {
    render(<MockNewTask />);
    const dropdown = screen.getByTestId("dropdown-dropdown");
    fireEvent.mouseEnter(dropdown);
    const CreateNewOption = screen.getByText(/Create New Group/i);
    fireEvent.click(CreateNewOption);
    expect(screen.queryByTestId("dropdown-dropdown")).not.toBeInTheDocument();
    const cancelButton = screen.getByRole("button", { name: "cancel" });
    fireEvent.click(cancelButton);
    expect(screen.getByTestId("dropdown-dropdown")).toBeInTheDocument();
  });
});

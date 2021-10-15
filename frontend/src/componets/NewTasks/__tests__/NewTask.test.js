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
    const dropdownParent = screen.getByTestId("dropdown-parent");
    fireEvent.mouseEnter(dropdownParent);
    const listItems = screen.getAllByTestId("dropdown-item");
    listItems.forEach((item) => {
      fireEvent.click(item);
      const itemValue = getNodeText(item);
      expect(inputElement.value).toBe(itemValue);
    });
  });
});

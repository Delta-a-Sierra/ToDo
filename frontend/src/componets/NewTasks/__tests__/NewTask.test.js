import {
  render,
  screen,
  fireEvent,
  getNodeText,
  getByTestId,
} from "@testing-library/react";
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

  it("test validation for username field when entry is added", () => {
    render(<MockNewTask />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(screen.queryByText("Required")).toBeInTheDocument();
  });

  it("test validation for due date field when invalid date is input", () => {
    render(<MockNewTask />);
    fireEvent.change(screen.getByPlaceholderText("dd/mm/yyyy"), {
      target: { value: "32/1/2021" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(screen.queryByText("Invalid Date")).toBeInTheDocument();
  });

  it("tests that validtion works for if a task group wasn't selected", () => {
    render(<MockNewTask />);
    fireEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(screen.queryByText("No group selected")).toBeInTheDocument();
  });

  describe("Group dropdown", () => {
    it("test that confirming new group creates a new group", async () => {
      render(<MockNewTask />);
      fireEvent.mouseEnter(screen.getByTestId("dropdown-dropdown"));
      const CreateNewOption = await screen.findByText(/Create New Group/i);
      fireEvent.click(CreateNewOption);
      let newGroupInput = screen.getByPlaceholderText(/name new group/i);
      fireEvent.change(newGroupInput, { target: { value: "name" } });
      expect(screen.getByPlaceholderText(/name new group/i).value).toBe("name");
      const confrimGroupBtn = screen.getByTestId("newGroup-button-confirm");
      fireEvent.click(confrimGroupBtn);
      const dropwdown = await screen.findByTestId("dropdown-dropdown");
      expect(dropwdown.value).toBe("name");
    });

    it("test ensures you can't create group with an empty string", async () => {
      render(<MockNewTask />);
      let dropdown = screen.getByTestId("dropdown-dropdown");
      fireEvent.mouseEnter(dropdown);
      const CreateNewOption = await screen.findByText(/Create New Group/i);
      fireEvent.click(CreateNewOption);
      const newGroupInput = screen.getByPlaceholderText(/name new group/i);
      fireEvent.change(newGroupInput, { target: { value: "" } });
      const confrimGroupBtn = screen.getByTestId("newGroup-button-confirm");
      fireEvent.click(confrimGroupBtn);
      const errortext = await screen.findByText("Name cannot be empty");
      expect(errortext).toBeInTheDocument();
    });
  });
});

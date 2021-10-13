import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nav from "../Nav";
import NavPresentation from "../NavPresentation";
import { AuthProvider } from "../../../contexts/AuthContext";

describe("Nav", () => {
  const MockNav = () => {
    return (
      <BrowserRouter>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  let clickable = ["faves", "groups", "account"];
  let clickableObject = [
    { tab: "faves", title: "Favourites" },
    { tab: "groups", title: "Groups" },
    { tab: "account", title: "Account" },
  ];

  it("popout is close by default", () => {
    render(<MockNav />);
    const popout = screen.queryByTestId("nav-popout");
    expect(popout).not.toBeInTheDocument();
  });

  it("Click nav icons should display popout", () => {
    render(<MockNav />);

    clickable.forEach((tab) => {
      const tabElement = screen.getByTestId(`nav-icon-${tab}`);
      fireEvent.click(tabElement);
      const popout = screen.getByTestId("nav-popout");
      expect(popout).toBeInTheDocument();
      fireEvent.click(tabElement);
    });
  });

  it("tests that popout shows correct group name", () => {
    render(<MockNav />);

    clickableObject.forEach((item) => {
      const tabElement = screen.getByTestId(`nav-icon-${item.tab}`);
      fireEvent.click(tabElement);
      const titleElement = screen.getByText(item.title);
      expect(titleElement).toBeInTheDocument();
      fireEvent.click(tabElement);
    });
  });

  describe("Popout", () => {
    const MockPresentation = () => {
      return (
        <BrowserRouter>
          <AuthProvider>
            <NavPresentation
              PopUpActive={true}
              TogglePopup={mockToggle}
              list={mockList}
              PopOutTitle="test"
            />
          </AuthProvider>
        </BrowserRouter>
      );
    };
    const mockToggle = jest.fn();
    const mockList = [
      { name: "just a group 1", id: 1 },
      { name: "just a group 2", id: 2 },
      { name: "just a group 3", id: 3 },
    ];

    it("test that all items from list are displayed", () => {
      render(<MockPresentation />);
      mockList.forEach((item) => {
        const listElement = screen.getByRole("link", { name: item.name });
        expect(listElement).toBeInTheDocument();
      });
    });
  });
});

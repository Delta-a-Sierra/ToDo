import { useState, useEffect, useContext } from "react";
import NavPresentation from "./NavPresentation";
import { AuthContext } from "../../contexts/AuthContext";

const list = [
  { name: "just a group 1", id: 1 },
  { name: "just a group 2", id: 1 },
  { name: "just a group 3", id: 1 },
];

const Nav = () => {
  const [PopUpActive, setPopUpActive] = useState(false);
  const [PopOutTitle, setPopoutTitle] = useState(false);
  const [List, setList] = useState([...list]);
  const [authenticated, setAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    switch (PopOutTitle) {
      case "Groups":
        setList([...List]);
        break;
      case "Favourites":
        console.log("faves");
        setList([...List]);
        break;
      default:
        setList([...List]);
        break;
    }
  }, [PopOutTitle]);

  const TogglePopup = (title, listItems) => {
    setPopUpActive((prev) => !prev);
    setPopoutTitle(title);
  };

  const Logout = (e) => {
    window.localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <NavPresentation
      PopUpActive={PopUpActive}
      TogglePopup={TogglePopup}
      PopOutTitle={PopOutTitle}
      list={List}
      Logout={Logout}
    />
  );
};

export default Nav;

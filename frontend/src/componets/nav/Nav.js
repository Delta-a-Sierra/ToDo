import { useState, useEffect, useContext } from "react";
import NavPresentation from "./NavPresentation";
import { AuthContext } from "../../contexts/AuthContext";
import { GroupContext } from "../../contexts/GroupContext";

const Nav = () => {
  const [PopUpActive, setPopUpActive] = useState(false);
  const [PopOutTitle, setPopoutTitle] = useState(false);
  const [List, setList] = useState([]);
  const [GroupState] = useContext(GroupContext);
  const [authenticated, setAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    console.log("rerender");
    switch (PopOutTitle) {
      case "Groups":
        setList([...GroupState.groups]);
        break;
      case "Favourites":
        setList([...GetFaves(GroupState.groups)]);
        break;
      default:
        setList([...GroupState.groups]);
        break;
    }
  }, [PopOutTitle, GroupState]);

  const TogglePopup = (title) => {
    if (title !== PopOutTitle) {
      setPopUpActive(false);
      setPopoutTitle(title);
      setPopUpActive(true);
      return;
    }
    setPopUpActive((prev) => !prev);
  };

  const ClosePopup = () => {
    setPopUpActive(false);
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
      ClosePopup={ClosePopup}
    />
  );
};

const GetFaves = (groups) => {
  const faves = groups.filter((group) => {
    if (group.is_fav) {
      return group;
    }
  });
  return faves;
};

export default Nav;

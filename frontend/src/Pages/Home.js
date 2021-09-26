import { AuthContext } from "../util/contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router";

const Home = () => {
  const [authenticated, setAuthenticated] = useContext(AuthContext);

  const logOut = () => {
    window.localStorage.removeItem("token");
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1> you are authenticated</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;

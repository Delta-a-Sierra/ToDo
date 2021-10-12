import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router";

const Home = () => {
  const [authenticated] = useContext(AuthContext);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1> you are authenticated</h1>
    </div>
  );
};

export default Home;

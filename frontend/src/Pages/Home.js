import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { LoadingScreen, Nav } from "../componets";

const Home = () => {
  const [authenticated] = useContext(AuthContext);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("authenticated changed");
  }, [authenticated]);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (Loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="Home">
      <div className="Home__content"></div>
      <Nav />
    </div>
  );
};

export default Home;

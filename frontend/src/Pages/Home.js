import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { LoadingScreen, MobileNav } from "../componets";

const Home = () => {
  const [authenticated] = useContext(AuthContext);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (Loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="Home">
      <div className="Home__content"></div>
      <h1> you are authenticated</h1>
      <MobileNav />
    </div>
  );
};

export default Home;

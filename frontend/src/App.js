import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home.js"
import Login from "./Pages/Login.js";
import Signup from "./Pages/Signup.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />

          </Route>

          <Route exact path="/Login">
            <Login />
            

          </Route>

          <Route exact path="/Signup">
            <Signup />

          </Route>

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;

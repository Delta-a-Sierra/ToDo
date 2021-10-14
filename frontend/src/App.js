import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Home, Signup } from "./Pages";
import { GroupProvider } from "./contexts/GroupContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <GroupProvider>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </GroupProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

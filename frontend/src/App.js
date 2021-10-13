import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home, Signup } from "./Pages";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AuthProvider>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </AuthProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, Home, Signup, Group } from "./Pages";
import { GroupProvider } from "./contexts/GroupContext";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <GroupProvider>
            <Route exact path="/">
              <TaskProvider>
                <Home />
              </TaskProvider>
            </Route>
            <Route path="/groups/:groupid">
              <TaskProvider>
                <Group />
              </TaskProvider>
            </Route>
          </GroupProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

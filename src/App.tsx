import React from "react";
import { Route } from "react-router-dom";
import { SessionStatusHistory } from "./components/Session/SessionStatusHistory.component";

const history = [
  ["COMING_SOON", "2022-03-08T14:00:00"],
  ["AVAILABLE", "2022-03-09T14:00:00"],
  ["PREPARING", "2022-03-10T14:00:00"],
  ["CHARGING", "2022-03-11T14:00:00"],
];
function App() {
  return (
    <div className="App">
      <Route path="/login">
        <div>
          <SessionStatusHistory data={history} />
        </div>
      </Route>
    </div>
  );
}

export default App;

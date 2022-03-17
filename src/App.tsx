import React from "react";
import { Route } from "react-router-dom";
import { SessionStatusHistory } from "./components/Session/SessionStatusHistory.component";

const history = [
  {title:"COMING_SOON", date:new Date()},
  {title:"AVAILABLE", date:new Date()},
  {title:"PREPARING", date:new Date()},
  {title:"CHARGING", date:new Date()},
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

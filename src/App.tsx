import React from "react";
import { Link, Route } from "react-router-dom";
import { AppHeader, AppSideBar, Label, Wiki } from "./components/_ui";
import "./App.scss";

const history = [
  {title:"COMING_SOON", date:new Date()},
  {title:"AVAILABLE", date:new Date()},
  {title:"PREPARING", date:new Date()},
  {title:"CHARGING", date:new Date()},
];
function App() {
  return (
    <div className="App">
      <AppSideBar />
      <AppHeader />

      <div className="absolute left-60 right-0 top-20  pl-10 pr-10 pt-10 bottom-0 overflow-auto">
        <Route path="/wiki">
          <Wiki />
        </Route>

        <div className="absolute right-2 bottom-2"><Link to={'/wiki'}><Label text="wiki" /></Link></div>
      </div>
    </div>
  );
}

export default App;

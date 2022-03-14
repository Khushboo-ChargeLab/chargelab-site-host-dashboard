import React from "react";
import { Route } from "react-router-dom";
import { Pill, FormInput } from "./components/_ui";
import {
  ChargerStatus,
  CHARGE_STATUS,
} from "./components/Charger/ChargerStatus.component";

function App() {
  return (
    <div className="App">
      <Route path="/login">
        <div>
          <FormInput
            value="sample"
            error={"invalid email !"}
            placeholder="Enter your email"
            label="Email"
          />
          <Pill label="Peter G."></Pill>
          <Pill
            label="Peter G."
            isButton
            onClick={() => {
              console.log("clicked");
            }}
          ></Pill>
          <ChargerStatus status={CHARGE_STATUS.COMING_SOON} />
          <ChargerStatus status={CHARGE_STATUS.AVAILABLE} />
          <ChargerStatus status={CHARGE_STATUS.OFFLINE} />
        </div>
      </Route>
    </div>
  );
}

export default App;

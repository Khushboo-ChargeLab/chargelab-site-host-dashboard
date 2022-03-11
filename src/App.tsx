import React from 'react';
import { Route } from "react-router-dom";
import { FormInput } from './components/_ui/Input.component';

function App() {
  return (
    <div className="App">
     
      <Route path="/login">
        <div>
        <FormInput value="sample" error={'invalid email !'} placeholder='Enter your email' label='Email' />
        </div>
        
      </Route>
    </div>
    
  );
}

export default App;

import React from 'react';
import { Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };

  const a = 12389.12
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
      {t('hello_world')}
      </h1>
      <button onClick={() => changeLanguage("en-US")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
      <button onClick={() => changeLanguage("fr")}>Français</button>
      <br/><br/>
      <h1 className="text-3xl font-bold underline">
      {new Date().toMMDDhhmma()}
      </h1>
      <br/><br/>
      <h1 className="text-3xl font-bold underline">
      {a.toLocaleCurrency('EUR')}
      </h1>
      <Route path="/login">
        <div>
        
        </div>
        
      </Route>
    </div>
    
  );
}

export default App;

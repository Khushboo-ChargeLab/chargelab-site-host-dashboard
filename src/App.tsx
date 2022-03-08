import React from 'react';
import { Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useExport } from './hooks'

const data = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng:string) => {
    i18n.changeLanguage(lng);
  };
  const { setExport } = useExport();
  const a = 12389.12
  console.log(a.toLocaleCurrency('EUR'))
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
      {t('hello_world')} {new Date().toMMDDhhmma()} {a.toLocaleCurrency('EUR')}
      </h1>
      <div>
        <button onClick={() => changeLanguage("en-US")}>English</button>
        <button onClick={() => changeLanguage("es")}>Español</button>
        <button onClick={() => changeLanguage("fr")}>Français</button>
      </div>
        <div>
        <button onClick={() => setExport(data,'csv','testcsv')}>{t('export_csv')}</button>
        <button onClick={() => setExport(data,'pdf','testpdf')}>{t('export_pdf')}</button>
        </div>
      <Route path="/login">
        <div>
        
        </div>
        
      </Route>
    </div>
    
  );
}

export default App;

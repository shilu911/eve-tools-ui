import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {I18nContext, I18nManager} from '@shopify/react-i18n';
import './App.css';
import AppContext, { defaultAppContextValue } from './context/AppContext';
import Main from './page/main/Main';

const locale = defaultAppContextValue.language;
const i18nManager = new I18nManager({
  locale,
  onError(error: any) {
    console.error(error)
  },
});

function App() {

  return (
    <AppContext.Provider value={defaultAppContextValue}>
      <I18nContext.Provider value={i18nManager}>
        <Router>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </I18nContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

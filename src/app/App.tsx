import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './App.module.css';

import Dashboard from './pages/dashboard/Dashboard';
import Password from './pages/Password/Password';
import AddCredential from './pages/AddCredentials/AddCredentials';

function App(): JSX.Element {
  return (
    <>
      <h1 className={styles.header}>Password manager</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/password/:service">
            <Password />
          </Route>
          <Route path="/addCredential">
            <AddCredential />
          </Route>
          <Route path="/searchCredential">
            <AddCredential />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

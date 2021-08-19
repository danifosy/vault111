import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Password from './pages/Password/Password';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/password/:service">
          <Password />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

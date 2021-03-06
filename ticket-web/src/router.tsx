import * as React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Home from "./view/screens/Home";
import Detail from "./view/screens/Detail"
import { Url } from './service/infastructural/constant';
import Empty from './view/screens/Empty';
import Admin from './view/screens/Admin';
import GetTicket from "./view/screens/GetTicket/getTicket"



const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path={Url.home} >
          <Home />
        </Route>

        <Route path={Url.receive}>
          <Detail />
        </Route>

        <Route path={Url.admin}>
          <Admin />
        </Route>

        <Route path={Url.getTicket}>
          <GetTicket />
        </Route>

        <Route path="/401">
          <h1>bad server</h1>
        </Route>

        <Route path="/404" >
          <Empty />
        </Route>

        <Route path="**" >
          <Redirect to="/404" />
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default Router
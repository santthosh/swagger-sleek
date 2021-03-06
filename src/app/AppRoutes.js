import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

// Here we define all our material-ui ReactComponents.
import Master from './components/presentation/Master';
import Home from './components/pages/Home';

import License from './components/pages/license/License';
import Configuration from './components/pages/configuration/Configuration';
import Definition from './components/pages/definition/Definition';

/**
 * Routes: https://github.com/reactjs/react-router/blob/master/docs/API.md#route
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' and will recursively render its
 * handler and its parent handler like so: Paper > Components > Master
 */
const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={Home} />
    <Route path="home" component={Home} />
    <Redirect from="help" to="/help/license" />
    <Route path="configuration" component={Configuration} />
    <Route path="swagger" component={Definition}/>
    <Route path="Help">
      <Route path="license" component={License} />
    </Route>
  </Route>
);

export default AppRoutes;

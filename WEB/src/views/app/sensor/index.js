import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const TambahSensor = React.lazy(() => import('./tambah-sensor'));

const Sensor = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/tambah-sensor`}
        />
        <Route
          path={`${match.url}/tambah-sensor`}
          render={(props) => <TambahSensor {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};

export default Sensor;

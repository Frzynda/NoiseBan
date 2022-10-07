import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const BacaSensor = React.lazy(() => import('./baca-sensor'));
const PerbaruiSensor = React.lazy(() => import('./perbarui-sensor'));
const TambahSensor = React.lazy(() => import('./tambah-sensor'));
const HapusSensor = React.lazy(() => import('./hapus-sensor'));

const Sensor = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/baca-sensor`}
        />
        <Route
          path={`${match.url}/baca-sensor`}
          render={(props) => <BacaSensor {...props} />}
        />
        <Route
          path={`${match.url}/tambah-sensor`}
          render={(props) => <TambahSensor {...props} />}
        />
        <Route
          path={`${match.url}/perbarui-sensor`}
          render={(props) => <PerbaruiSensor {...props} />}
        />
        <Route
          path={`${match.url}/hapus-sensor`}
          render={(props) => <HapusSensor {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};

export default Sensor;

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

const BacaSensor = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.baca-sensor" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    </>
  );
};

export default BacaSensor;

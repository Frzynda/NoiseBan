import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useEffect } from 'react';
import { Row } from 'reactstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';

const TambahSensor = ({ match }) => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.tambah-sensor" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
    </>
  );
};

export default TambahSensor;

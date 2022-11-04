import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';

const BlankPage = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Minhas doações</h1> <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>teste </p>
        </Colxx>
      </Row>
    </>
  );
};

export default BlankPage;

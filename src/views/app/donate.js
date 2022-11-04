/* eslint-disable react/style-prop-object */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Row } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';

const Donate = () => {
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>Nova doação</h1> <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" md="6" className="mb-4">
        teste
        </Colxx>
      </Row>
    </>
  );
};

export default Donate;

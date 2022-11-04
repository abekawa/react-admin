/* eslint-disable no-constant-condition */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { registerUser } from 'redux/actions';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Digite aqui sua senha';
  } else if (value.length < 4) {
    error = 'A senha deve ter mais que 4 caracteres';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Digite seu e-mail';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'E-mail invalido';
  }
  return error;
};

const Register = ({ history, loading, error, registerUserAction }) => {
  const [email] = useState('demo@gogo.com');
  const [password] = useState('gogo123');
  console.log(error);
  // error.message = "deu ruim";
  useEffect(() => {
    if (error) {
      NotificationManager.error(
        'Verifique os dados informados',
        'Não foi possível realizar o cadastro',
        3000,
        null,
        null,
        ''
      );
    }
  }, [error]);

  const onUserRegister = (values) => {
    console.log(values);
    if (!loading) {
      if ((values.email !== '' && values.password !== '') || true) {
        registerUserAction(values, history);
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <div>.</div>
          </div>
          <div className="form-side">
            <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink>
            <CardTitle className="mb-4">Acesso ao painel de doações </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserRegister}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>Senha </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      Esqueceu sua senha?{' '}
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Entrar </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);

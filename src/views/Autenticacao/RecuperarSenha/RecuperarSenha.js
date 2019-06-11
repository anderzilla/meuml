import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Form, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from '../../../assets/img/brand/MeuML-logo2.png'
import { Formik } from 'formik';
import * as Yup from 'yup'
import './ValidationForms.css'

const validationSchema = function (values) {
  return Yup.object().shape({
    email: Yup.string()
    .email('Email informado é inválido')
    .required('Email é Obrigatório!'),
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    const validationSchema = getValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}

const initialValues = {
  email: "",
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('O Cadastro foi concluído com Sucesso!', values)
    setSubmitting(false)
  }, 2000)
}

class RecuperarSenha extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card class="col-md-12 text-muted py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2><img src={logo} width="60%" class="espacoLogoCadastro" alt="MeuML" /></h2>
                      <Formik
                      initialValues={initialValues}
                      validate={validate(validationSchema)}
                      onSubmit={onSubmit}
                      render={
                        ({
                          values,
                          errors,
                          touched,
                          status,
                          dirty,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          isValid,
                          handleReset,
                          setTouched
                        }) => (
                      <Form>
                      <h2 class="tituloLogin">Recuperar Senha</h2>
                      <p class="alert alert-warning fade show">Será enviado para o <b>e-mail informado abaixo</b> as instruções e informações de recuperação de senha.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-at"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email"
                                name="email"
                                 id="email"
                                 placeholder="E-mail"
                                 autoComplete="email"
                                 valid={!errors.email}
                                 invalid={touched.email && !!errors.email}
                                 required
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.email} />
                                 <FormFeedback>{errors.email}</FormFeedback>  
                      </InputGroup>
                      <Row>
                        <Col xs="12" className="text-center">
                        <Link to="/dashboard">
                        <Button type="submit" color="primary" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Aguarde...' : 'Enviar solicitação'}</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                     )} />
                    </div>
                  </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default RecuperarSenha;

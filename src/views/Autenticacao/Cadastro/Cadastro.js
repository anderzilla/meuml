import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, Col, Container, CustomInput, Form, Collapse, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from '../../../assets/img/brand/MeuML-logo2.png'
import { Formik } from 'formik';
import * as Yup from 'yup'
import './ValidationForms.css'

const validationSchema = function (values) {
  return Yup.object().shape({
    userName: Yup.string()
    .min(5, `O Usuário deve ter no mínimo de 5 caracteres`)
    .required('Usuário é Obrigatório!'),
    email: Yup.string()
    .email('Email informado é inválido')
    .required('Email é Obrigatório!'),
    password: Yup.string()
    .min(6, `A Seha não pode ser menor que ${6} caracteres!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'A Senha deve conter: números, letras maiúscuas e minusculas\n')
    .required('Senha é Obrigatória!'),
    confirmPassword: Yup.string()
    .oneOf([values.password], 'A confirmação da Senha precisa conferir com a Senha')
    .required('Confirmação da senha é obrigatória!'),
    accept: Yup.bool()
    .required('* Obrigatório')
    .test('accept', 'Você precisa aceitar os Termos e Condições de Uso!', value => value === true),
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
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  accept: false
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('O Cadastro foi concluído com Sucesso!', values)
    setSubmitting(false)
  }, 2000)
}


class Cadastro extends Component {

  constructor(props){
    super(props);
    this.touchAll = this.touchAll.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  findFirstError (formName, hasError) {
    const form = document.forms[formName]
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus()
        break
      }
    }
  }

  validateForm (errors) {
    this.findFirstError('simpleForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  touchAll(setTouched, errors) {
    setTouched({
        userName: true,
        email: true,
        password: true,
        confirmPassword: true,
        accept: true
      }
    )
    this.validateForm(errors)
  }


  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
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
                    <img src={logo} width="80%" class="logoFormCadastro" alt="MeuML" />
                    <h2 className="text-center">Cadastro</h2>
                    <p class="alert alert-info text-center">Informe um e-mail válido e em uso, enviaremos um link de confirmação de cadastro para o e-mail informado abaixo.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                                 name="userName"
                                 id="userName"
                                 placeholder="Usuário"
                                 autoComplete="username"
                                 valid={!errors.userName}
                                 invalid={touched.userName && !!errors.userName}
                                 required
                                 onChange={handleChange}
                                 onBlur={handleBlur}
                                 value={values.userName} />
                                 <FormFeedback>{errors.userName}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
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
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                                     name="password"
                                     id="password"
                                     placeholder="Senha"
                                     autoComplete="new-password"
                                     valid={!errors.password}
                                     invalid={touched.password && !!errors.password}
                                     required
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.password} />
                              {/*<FormFeedback>Required password containing at least: number, uppercase and lowercase letter, 8 characters</FormFeedback>*/}
                              <FormFeedback>{errors.password}</FormFeedback>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                                     name="confirmPassword"
                                     id="confirmPassword"
                                     placeholder="Confirmar Senha"
                                     autoComplete="new-password"
                                     valid={!errors.confirmPassword}
                                     invalid={touched.confirmPassword && !!errors.confirmPassword}
                                     required
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.confirmPassword} />
                              <FormFeedback>{errors.confirmPassword}</FormFeedback>
                    </InputGroup>
                    <Row>
                      <Col xs="12" sm="6">
                      <InputGroup>
                          <CustomInput
                            type="checkbox"
                            id="accept"
                            label="Eu aceito os Termos de Uso"
                            required
                            valid={!errors.accept}
                            invalid={touched.accept && !!errors.accept}
                            onChange={handleChange}
                            onBlur={handleBlur} >
                            <FormFeedback>{errors.accept}</FormFeedback>
                          </CustomInput>
                        </InputGroup>
                      </Col>
                      <Col xs="12" sm="6" className="text-right">
                      <Link to="/dashboard">
                      <Button type="submit" color="primary" disabled={isSubmitting || !isValid}>{isSubmitting ? 'Aguarde...' : 'Concluir Cadastro'}</Button>
                      </Link>
                      </Col>
                    </Row>
                  </Form>
                  )} />
                </CardBody>
                <CardFooter className="p-4">
                <div className="card-footer-actions">
                <b>Termos de Uso</b> <a className="card-footer-action badge badge-dark badge-pill float-right text-light" data-target="#collapseTermos" onClick={this.toggle}><i className="icon-arrow-down"></i></a>
                </div>
                <Collapse isOpen={this.state.collapse} id="collapseTermos">
                  <Row>
                    <Col xs="12" sm="12">
                      <em>Termos de Uso</em>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    </Col>
                  </Row>
                  </Collapse>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Cadastro;

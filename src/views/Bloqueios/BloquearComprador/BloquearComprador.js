import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Form, FormFeedback, FormGroup, Label, Input } from 'reactstrap';
import motivos from './data/motivos';
import Select from 'react-select';
import { AppSwitch } from '@coreui/react'
import 'react-select/dist/react-select.min.css';
import { Formik } from 'formik';
import * as Yup from 'yup'
import './ValidationForms.css'

const options = motivos.BLOCK; //temporário para aparecer motivs no dropdown

const validationSchema = function (values) {
  return Yup.object().shape({
    idusuario: Yup.string()
    .min(2, `Preencha o id duusuario a ser bloqueado`)
    .required('Id do usuário é obrigatório'),
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
  idusuario: "",
}

const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}

class BloquearComprador extends Component {
  //Adaptar para os valores de motivos de bloqueio
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);

    this.motivos = {
      value: ['Não Pagou','Cancela compras'],
      windowWidth: window.innerWidth,
      orientation: 'vertical',
      openDirection: 'down'
    }
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
        idusuario: true,
        accept: true
      }
    )
    this.validateForm(errors)
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  saveChanges(value) {
    this.setState({ value });
  }

  updateDimensions() {
    const windowWidth = window.innerWidth;
    this.setState((motivos)=> {
      return ({
        windowWidth: windowWidth,
        orientation: windowWidth < 620 ? 'vertical' : 'horizontal',
        openDirection: windowWidth < 620 ? 'up' : 'down'
      });
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <h1>Bloquear Comprador!</h1>
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
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card className="card-accent-primary">
              <CardHeader>
                Bloquear
              </CardHeader>
              <CardBody>
              <Form onSubmit={handleSubmit} noValidate name='bloquearcomprador'>
              <Row>
              <Col xs="12" sm="6" md="3">
                <FormGroup>
                  <Label for="idUsusario">First Name</Label>
                  <Input type="text"
                    name="isUsuario"
                    id="isUsuario"
                    placeholder="ID do Usuário"
                    autoComplete="given-name"
                    valid={!errors.idusuario}
                    invalid={touched.idusuario && !!errors.idusuario}
                    autoFocus={true}
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.idusuario} />
                  <FormFeedback>{errors.idusuario}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Select
                    name="motivosbloqueio"
                    value={this.motivos.value}
                    options={options}
                    onChange={this.saveChanges}
                    multi
                    placeholder="Selecione o motivo"
                  />
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="compras" value="1"  /><span class="align-middle"> Bloquear para compras</span>
                </FormGroup>
                <FormGroup>
                <AppSwitch className={'mx-1'} variant={'pill'} color={'danger'} name="perguntas" value="1" /> <span class="align-middle">Bloquear para perguntas</span>
                </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="9">
                <FormGroup row>
                  <Label htmlFor="textarea-input">Descrição do motivo</Label>
                  <Input type="textarea" name="descricaomotivo" id="descricaomotivo" rows="9"
                    placeholder="Descreva o motivo do Bloqueio..." />
                  </FormGroup>
                </Col>
                </Row>

                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-lock"></i> Bloquear</Button>
              </CardFooter>
            </Card>
          </Col>
          </Row>
          )} />
      </div>
    );
  }
}

export default BloquearComprador;

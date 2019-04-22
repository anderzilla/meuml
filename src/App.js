import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Autenticação
const Login = Loadable({
  loader: () => import('./views/Autenticacao/Login'),
  loading
});

const Cadastro = Loadable({
  loader: () => import('./views/Autenticacao/Cadastro'),
  loading
});

const RecuperarSenha = Loadable({
  loader: () => import('./views/Autenticacao/RecuperarSenha'),
  loading
});

const Sair = Loadable({
  loader: () => import('./views/Autenticacao/Login'),
  loading
});


//Sistema
const Page404 = Loadable({
  loader: () => import('./views/Sistema/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Sistema/Page500'),
  loading
});


class App extends Component {

  render() {
    return (
      <HashRouter>
        <Switch>
        <Route exact path="/login" name="Página de Login" component={Login} />
        <Route exact path="/cadastro" name="Página de Cadastro" component={Cadastro} />
        <Route exact path="/recuperarsenha" name="Recuperar Senha" component={RecuperarSenha} />
        <Route exact path="/sair" name="Página de Login" component={Sair} />
        <Route exact path="/404" name="Page 404" component={Page404} />
        <Route exact path="/500" name="Page 500" component={Page500} />          
        <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

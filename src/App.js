import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";
//import { logout } from "./logout";
import Loadable from 'react-loadable';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

const CallBack = Loadable({
  loader: () => import('./views/Contas/CallBack'),
  loading
});

const ListaContas = Loadable({
  loader: () => import('./views/Contas/ListaContas'),
  loading
});

// Autenticação
const Login = Loadable({
  loader: () => import('./views/Autenticacao/Login'),
  loading
});

const Logout = Loadable({
  loader: () => import('./views/Autenticacao/Logout'),
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

const AlterarSenha = Loadable({
  loader: () => import('./views/Autenticacao/AlterarSenha'),
  loading
});

const ConfirmarCadastro = Loadable({
  loader: () => import('./views/Autenticacao/ConfirmarCadastro/ConfirmarCadastro'),
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



const PrivateRoute = ({component : Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: {from: props.location}}} />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Cadastro} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/confirmarcadastro/:email/:hash" component={ConfirmarCadastro} />
          <Route exact path="/alterarsenha/:email/:hash" component={AlterarSenha} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} /> 
          {/*acesso restrito */}
          <PrivateRoute path="/" name="MeuML.com" component={DefaultLayout} />
          <PrivateRoute path="/callback" name="MeuML.com - Callback" component={CallBack} />
          <PrivateRoute path="/listacontas" name="MeuML.com - ListaContas" component={ListaContas} />
          <PrivateRoute path="/logout" name="MeuML.com" component={Logout} />
                   
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

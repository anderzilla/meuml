import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";
import { logout } from "./logout";
import Loadable from 'react-loadable';
import './App.scss';
import Dashboard from './views/Dashboard/Dashboard';

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

/* Contas */
const ListaContas = Loadable({
  loader: () => import('./views/Contas/ListaContas'),
  loading
});

const RenomearConta = Loadable({
  loader: () => import('./views/Contas/RenomearConta'),
  loading
});

const ExcluirConta = Loadable({
  loader: () => import('./views/Contas/ExcluirConta'),
  loading
});

const SincronizarConta = Loadable({
  loader: () => import('./views/Contas/SincronizarConta'),
  loading
});

/* Bloqueios */
const Bloqueios = Loadable({
  loader: () => import('./views/Bloqueios/Bloqueios'),
  loading
});

const BloquearComprador = Loadable({
  loader: () => import('./views/Bloqueios/BloquearComprador'),
  loading
});

const BloquearEmMassa = Loadable({
  loader: () => import('./views/Bloqueios/BloquearEmMassa'),
  loading
});

const AdicionarItemLista = Loadable({
  loader: () => import('./views/Bloqueios/BloquearEmMassa/AdicionarItemLista'),
  loading
});

const MeusBloqueios = Loadable({
  loader: () => import('./views/Bloqueios/MeusBloqueios'),
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
          <Route exact path="/" component={DefaultLayout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Cadastro} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/confirmarcadastro/:email/:hash" component={ConfirmarCadastro} />
          <Route exact path="/alterarsenha/:email/:hash" component={AlterarSenha} />
          {/*acesso restrito */}
          <PrivateRoute path="/dashboard" component={DefaultLayout} />
          {/*manutenção de contas */}
          <PrivateRoute path="/listacontas" component={ListaContas} />
          <PrivateRoute path="/renomerconta" component={RenomearConta} />
          <PrivateRoute path="/excluirconta" component={ExcluirConta} />
          <PrivateRoute path="/sincronizarconta" component={SincronizarConta} />
          {/*manutenção de bloqueios */}
          <PrivateRoute path="/bloqueios" component={Bloqueios} />
          <PrivateRoute path="/bloquearcomprador" component={BloquearComprador} />
          <PrivateRoute path="/bloquearemmassa" component={BloquearEmMassa} />
          <PrivateRoute path="/adicionaritemlista" component={AdicionarItemLista} />
          <PrivateRoute path="/meusbloqueios" component={MeusBloqueios} />
          <PrivateRoute path="/sair" component={logout} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />          
          {/*<ProtectRoute exact path="/" name="Home" component={DefaultLayout} />*/}
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

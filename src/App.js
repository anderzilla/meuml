import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./auth";
//import { logout } from "./logout";
import Loadable from 'react-loadable';
import './App.scss';
import moment from 'moment';
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
    }
  />
);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      warningTime: '',
      signoutTime: '',
    };
  }

  componentDidMount() {

    
    this.setState({
      warningTime: 1000,
      signoutTime: 2000,
    });

    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }
    this.setTimeout();
  }

  clearTimeoutFunc = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };

  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
    this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
  };

  resetTimeout = () => {
    this.clearTimeoutFunc();
    this.setTimeout();
  };

  warn = () => {
   // console.log('Você será desconectado em 1 minuto.');
  };

  logout = () => {
    const expireToken = localStorage.getItem("@MeuML-Token-expire");
    const dataIni = moment('02/07/2019 15:26')
    const dataFim = moment().format("DD/MM/YYYY HH:mm")

    var ms = moment(expireToken).diff(dataFim)
 
   if(ms <= 0)
   {
    console.log('Você será desconectado por inatividade no sistema.');
    this.destroy();
 
   }
  };

  destroy = () => {
    localStorage.setItem('@MeuML-Token', null)
    if (this.props.location.pathname !== '/cadastro'){
      window.location.assign('#/login');
    }else{
      console.log(this.props.location.pathname+' Continuando o cadastro!');
    }
    
  };

  render() {
    return (
      <HashRouter >
        <Switch >
          <Route exact path="/login" component={Login} />
          <Route exact path="/cadastro" component={Cadastro} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/confirmarcadastro/:email/:hash" component={ConfirmarCadastro} />
          <Route exact path="/alterarsenha/:email/:hash" component={AlterarSenha} />
          {/*acesso restrito */}
          <PrivateRoute path="/" name="MeuML.com" component={DefaultLayout} />
          <PrivateRoute path="/callback" name="MeuML.com - Callback" component={CallBack} />
          <PrivateRoute path="/logout" name="MeuML.com" component={Logout} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;

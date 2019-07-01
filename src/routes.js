import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Inicio = React.lazy(() => import('./views/Inicio/Inicio'));
const AlterarSenha = React.lazy(() => import('./views/Autenticacao/AlterarSenha'));
const ConfirmarCadastro = React.lazy(() => import('./views/Autenticacao/ConfirmarCadastro'));
const Login = React.lazy(() => import('./views/Autenticacao/Login'));
const Logout = React.lazy(() => import('./views/Autenticacao/Logout'));
const Cadastro = React.lazy(() => import('./views/Autenticacao/Cadastro'));
const RecuperarSenha = React.lazy(() => import('./views/Autenticacao/RecuperarSenha'));
//Contas
const ListaContas = React.lazy(() => import('./views/Contas/ListaContas'));
const CallBack = React.lazy(() => import('./views/Contas/CallBack'));
const ContasAdicionar = React.lazy(() => window.location.href = process.env.REACT_APP_API_URL + '/oauth/mercado-livre/authorize');
//Bloqueios
const BloquearComprador = React.lazy(() => import('./views/Bloqueios/BloquearComprador'));
const BloquearEmMassa = React.lazy(() => import('./views/Bloqueios/BloquearEmMassa'));
const BloquearLista = React.lazy(() => import('./views/Bloqueios/BloquearLista'));
const MeusBloqueios = React.lazy(() => import('./views/Bloqueios/MeusBloqueios'));
const MinhasListasDeBloqueios = React.lazy(() => import('./views/Bloqueios/MinhasListasDeBloqueios'));
//Categorias
const Categorias = React.lazy(() => import('./views/Categorias/CategoriasDataTable'));
//Perguntas
const Perguntas = React.lazy(() => import('./views/Perguntas/Perguntas'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Início', component: DefaultLayout, exact: true },
  { path: '/inicio', name: 'MeuML', component: Inicio },
  //Autenticação
  { path: '/alterarsenha', name: 'Alterar Senha', component: AlterarSenha, exact: true},
  { path: '/confirmarcadastro', name: 'Confirmar Cadastro', component: ConfirmarCadastro, exact: true},
  { path: '/login', name: 'Entrar no Sistema', component: Login, exact: true},
  { path: '/logout', name: 'Entrar no Sistema', component: Logout, exact: true},
  { path: '/cadastro', name: 'Cadastre-se', component: Cadastro, exact: true},
  { path: '/recuperarsenha', name: 'Recuperar Senha', component: RecuperarSenha, exact: true},
  //Contas
  { path: '/listacontas', name: 'Contas', component: ListaContas, exact: true },
  { path: '/callback', name: 'Adicionar Conta', component: CallBack , exact: true},
  { path: '/contas/adicionar', name: 'Autorizar Conta Mercado Livre', component: ContasAdicionar, exact: true },
  //Bloqueios
  { path: '/bloquearcomprador', name: 'Bloquear Comprador', component: BloquearComprador, exact: true },
  { path: '/bloquearemmassa', name: 'Bloquear em Massa', component: BloquearEmMassa, exact: true },
  { path: '/meusbloqueios', name: 'Meus Bloqueios', component: MeusBloqueios, exact: true },
  { path: '/bloquearlista', name: 'Bloquear Lista', component: BloquearLista, exact: true },
  { path: '/minhaslistasdebloqueios', name: 'Minhas Listas', component: MinhasListasDeBloqueios, exact: true },
  //Categorias
  { path: '/categorias', name: 'Categorias - Pesos e Dimensões', component: Categorias, exact: true },
  //Perguntas
  { path: '/perguntas', name: 'Perguntas e Respostas', component: Perguntas, exact: true },
];

export default routes;

import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AlterarSenha = React.lazy(() => import('./views/Autenticacao/AlterarSenha'));
const ConfirmarCadastro = React.lazy(() => import('./views/Autenticacao/ConfirmarCadastro'));
const Login = React.lazy(() => import('./views/Autenticacao/Login'));
const Logout = React.lazy(() => import('./views/Autenticacao/Logout'));
const Cadastro = React.lazy(() => import('./views/Autenticacao/Cadastro'));
const RecuperarSenha = React.lazy(() => import('./views/Autenticacao/RecuperarSenha'));
//Contas
const ListaContas = React.lazy(() => import('./views/Contas/ListaContas'));
const CallBack = React.lazy(() => import('./views/Contas/CallBack'));
const RenomearConta = React.lazy(() => import('./views/Contas/RenomearConta'));
const ExcluirConta = React.lazy(() => import('./views/Contas/ExcluirConta'));
const SincronizarConta = React.lazy(() => import('./views/Contas/SincronizarConta'));
const AdicionarConta = React.lazy(() => window.location.href = 'https://api.app2.meuml.com/oauth/mercado-livre/authorize');
//Bloqueios
const Bloqueios = React.lazy(() => import('./views/Bloqueios'));
const BloquearComprador = React.lazy(() => import('./views/Bloqueios/BloquearComprador'));
const BloquearEmMassa = React.lazy(() => import('./views/Bloqueios/BloquearEmMassa'));
const AdicionarItemLista = React.lazy(() => import('./views/Bloqueios/BloquearEmMassa/AdicionarItemLista'));
const MeusBloqueios = React.lazy(() => import('./views/Bloqueios/MeusBloqueios'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'MeuML', component: Dashboard },
  //Autenticação
  { path: '/alterarsenha', name: 'Alterar Senha', component: AlterarSenha, exact: true}, 
  { path: '/confirmarcadastro', name: 'Confirmar Cadastro', component: ConfirmarCadastro, exact: true}, 
  { path: '/login', name: 'Entrar no Sistema', component: Login, exact: true}, 
  { path: '/logout', name: 'Entrar no Sistema', component: Logout, exact: true}, 
  { path: '/cadastro', name: 'Cadastre-se', component: Cadastro, exact: true},
  { path: '/recuperarsenha', name: 'Recuperar Senha', component: RecuperarSenha, exact: true},
  //Contas
  { path: '/listacontas', name: 'Contas', component: ListaContas, exact: true },
  { path: '/callback/:code', name: 'Adicionar Conta', component: CallBack , exact: true},
  { path: '/renomearconta/:id', name: 'Renomear Conta', component: RenomearConta , exact: true},
  { path: '/excluirconta/:id', name: 'Excluir Conta', component: ExcluirConta, exact: true },
  { path: '/sincronizarconta/:id', name: 'SincronizarConta', component: SincronizarConta, exact: true },
  { path: '/adicionarconta', name: 'Autorizar Conta Mercado Livre', component: AdicionarConta, exact: true },
  //Bloqueios
  { path: '/bloqueios', name: 'Bloqueios', component: Bloqueios, exact: true },
  { path: '/bloquearcomprador', name: 'Bloquear Comprador', component: BloquearComprador, exact: true },
  { path: '/bloquearemmassa', name: 'Bloquear em Massa', component: BloquearEmMassa, exact: true },
  { path: '/meusbloqueios', name: 'Meus Bloqueios', component: MeusBloqueios, exact: true },
  { path: '/adicionaritemlista', name: 'Adicionar a Lista', component: AdicionarItemLista, exact: true },
];

export default routes;

import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
//Contas
const ListaContas = React.lazy(() => import('./views/Contas/ListaContas'));
const RenomearConta = React.lazy(() => import('./views/Contas/RenomearConta'));
const ExcluirConta = React.lazy(() => import('./views/Contas/ExcluirConta'));
const SincronizarConta = React.lazy(() => import('./views/Contas/SincronizarConta'));
//Bloqueios
const Bloqueios = React.lazy(() => import('./views/Bloqueios'));
const BloquearComprador = React.lazy(() => import('./views/Bloqueios/BloquearComprador'));
const BloquearEmMassa = React.lazy(() => import('./views/Bloqueios/BloquearEmMassa/BloquearEmMassa'));
const AdicionarItemLista = React.lazy(() => import('./views/Bloqueios/BloquearEmMassa/AdicionarItemLista'));
const MeusBloqueios = React.lazy(() => import('./views/Bloqueios/MeusBloqueios'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  //Contas
  { path: '/listacontas', name: 'Contas', component: ListaContas },
  { path: '/renomearconta', name: 'Renomear Conta', component: RenomearConta },
  { path: '/excluirconta', name: 'Excluir Conta', component: ExcluirConta },
  { path: '/sincronizarconta', name: 'SincronizarConta', component: SincronizarConta },
  //Bloqueios
  { path: '/bloqueios', name: 'Bloqueios', component: Bloqueios },
  { path: '/bloquearcomprador', name: 'Bloquear Comprador', component: BloquearComprador },
  { path: '/bloquearemmassa', name: 'Bloquear em Massa', component: BloquearEmMassa },
  { path: '/meusbloqueios', name: 'Meus Bloqueios', component: MeusBloqueios },
  { path: '/adicionaritemlista', name: 'Adicionar a Lista', component: AdicionarItemLista },
  
];

export default routes;

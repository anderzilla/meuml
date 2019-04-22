import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const ListaContas = React.lazy(() => import('./views/Contas/ListaContas'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', name: 'Home', component: DefaultLayout, exact: true },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/listacontas', name: 'Contas', component: ListaContas },
];

export default routes;

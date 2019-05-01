import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const AlterarSenha = React.lazy(() => import('./views/Autenticacao/AlterarSenha'));
const ConfirmarCadastro = React.lazy(() => import('./views/Autenticacao/ConfirmarCadastro/ConfirmarCadastro'));
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
  { path: '/alterarsenha', name: 'Alterar Senha', component: AlterarSenha, exact: true}, 
  { path: '/confirmarcadastro', name: 'Confirmar Cadastro', component: ConfirmarCadastro, exact: true}, 
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, 
      routes: [
      //Contas
        { path: '/dashboard/listacontas', name: 'Contas', component: ListaContas, exact: true },
        { path: '/dashboard/renomearconta', name: 'Renomear Conta', component: RenomearConta , exact: true},
        { path: '/dashboard/excluirconta', name: 'Excluir Conta', component: ExcluirConta, exact: true },
        { path: '/dashboard/sincronizarconta', name: 'SincronizarConta', component: SincronizarConta, exact: true },
      //Bloqueios
        { path: '/dashboard/bloqueios', name: 'Bloqueios', component: Bloqueios, exact: true },
        { path: '/dashboard/bloquearcomprador', name: 'Bloquear Comprador', component: BloquearComprador, exact: true },
        { path: '/dashboard/bloquearemmassa', name: 'Bloquear em Massa', component: BloquearEmMassa, exact: true },
        { path: '/dashboard/meusbloqueios', name: 'Meus Bloqueios', component: MeusBloqueios, exact: true },
        { path: '/dashboard/adicionaritemlista', name: 'Adicionar a Lista', component: AdicionarItemLista, exact: true },
      ]
  },
];

export default routes;

import Dashboard from './Dashboard';
//Contas
import {ListaContas, AdicionarConta, ExcluirConta, RenomearConta, SincronizarConta} from './Contas';
//Autenticação
import {Login, Cadastro, RecuperarSenha, ConfirmarCadastro, AlterarSenha} from './Autenticacao';
//Sistema
import {Page404, Page500} from './Sistema';


export { 
    Dashboard, 
    //Contas
    ListaContas,
    AdicionarConta,
    ExcluirConta,
    RenomearConta,
    SincronizarConta,
    //Autenticação
    Login, 
    Cadastro,
    RecuperarSenha,
    AlterarSenha,
    ConfirmarCadastro, 
    //Sistema
    Page404, 
    Page500 
};


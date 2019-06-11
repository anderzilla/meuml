export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Contas',
      url: '/listacontas',
      icon: 'fa fa-address-book',
      
    },
    {
      name: 'Anúncios',
      url: '/dashboard',
      icon: 'fa fa-bullhorn',
      
    },
    {
      name: 'Vendas',
      url: '/dashboard',
      icon: 'fa fa-shopping-cart',
      
    },
    {
      name: 'Pesos e Dimensões',
      url: '/dashboard',
      icon: 'fa fa-balance-scale',
      
    },
    {
      name: 'Bloqueios',
      url: '/bloqueios',
      icon: 'fa fa-lock',
      children: [
        {
          name: 'Bloquear Comprador',
          url: '/bloquearcomprador',
          icon: 'fa fa-user-times',
        },
        {
          name: 'Meus Bloqueios',
          url: '/meusbloqueios',
          icon: 'fa fa-lock',
        },
        {
          name: 'Bloquear em massa',
          url: '/bloquearemmassa',
          icon: 'fa fa-users',
        },
      ]
      
    },
    {
      name: 'Processos',
      url: '/dashboard',
      icon: 'fa fa-file-powerpoint-o',
      
    },
    {
      name: 'Perguntas',
      url: '/dashboard',
      icon: 'fa fa-question-circle',
      
    },
    {
      name: 'Autenticação',
      url: '/dashboard',
      icon: 'fa fa-cog',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-user',
        },
        {
          name: 'Cadastro',
          url: '/cadastro',
          icon: 'icon-user-follow',
        },
        {
          name: 'Recuperar Senha',
          url: '/recuperarsenha',
          icon: 'icon-wrench',
        },
      ]
    },
    {
      name: 'Sistema',
      url: '',
      icon: 'fa fa-cog',
      children: [
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-ban',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-ban',
        }
      ]
    },
    {
      name: 'Sair',
      url: '/sair',
      icon: 'fa fa-sign-out',
    },
  ]
};

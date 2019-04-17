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
      url: '/dashboard',
      icon: 'fa fa-address-book',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Anuncios',
      url: '/dashboard',
      icon: 'fa fa-bullhorn',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Vendas',
      url: '/dashboard',
      icon: 'fa fa-shopping-cart',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Pesos e Dimenções',
      url: '/dashboard',
      icon: 'fa fa-balance-scale',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Bloqueios',
      url: '/dashboard',
      icon: 'fa fa-lock',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Processos',
      url: '/dashboard',
      icon: 'fa fa-file-powerpoint-o',
      badge: {
        variant: 'info',
        text: '',
      },
    },
    {
      name: 'Perguntas',
      url: '/dashboard',
      icon: 'fa fa-question-circle',
      badge: {
        variant: 'info',
        text: '',
      },
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
  ]
};

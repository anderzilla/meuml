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
    // {
    //   name: 'Anúncios',
    //   url: '/dashboard',
    //   icon: 'fa fa-bullhorn',

    // },
    // {
    //   name: 'Vendas',
    //   url: '/dashboard',
    //   icon: 'fa fa-shopping-cart',

    // },
    {
      name: 'Pesos e Dimensões',
      url: '/categorias',
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
        {
          name: 'Bloquear Lista',
          url: '/bloquearlista',
          icon: 'fa fa-times-rectangle',
        },
        {
          name: 'Minhas Listas',
          url: '/minhaslistasdebloqueios',
          icon: 'fa fa-address-card-o',
        },
      ]

    },
    // {
    //   name: 'Processos',
    //   url: '/dashboard',
    //   icon: 'fa fa-file-powerpoint-o',

    // },
    // {
    //   name: 'Perguntas',
    //   url: '/perguntas',
    //   icon: 'fa fa-question-circle',

    // },
    {
      name: 'Sair',
      url: '/logout',
      icon: 'fa fa-sign-out',
    },
  ]
};

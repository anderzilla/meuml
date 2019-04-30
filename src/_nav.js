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
      url: '/dashboard/listacontas',
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
          url: '/dashboard/bloquearcomprador',
          icon: 'fa fa-user-times',
        },
        {
          name: 'Meus Bloqueios',
          url: '/dashboard/meusbloqueios',
          icon: 'fa fa-lock',
        },
        {
          name: 'Bloquear em massa',
          url: '/dashboard/bloquearemmassa',
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
      name: 'Sair',
      url: '/sair',
      icon: 'fa fa-sign-out',
    },
  ]
};

interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
         {
           name: 'Principal',
           url: '/dashboard',
           icon: 'icon-speedometer',
           badge: {
             variant: 'info',
             text: ''
           }
         },
         {
           title: true,
           name: 'Gestión de configuración'
         },
         {
           name: 'Venta en taquillas',
           url: '/taquillas',
           icon: 'icon-star',
           children: [
             {
               name: 'Infraestructuras',
               url: '/taquillas/infraestructuras',
               icon: 'icon-puzzle'
             },
             {
               name: 'Escenarios',
               url: '/taquillas/escenarios',
               icon: 'icon-puzzle'
             },
             {
               name: 'Servicios',
               url: '/taquillas/servicios',
               icon: 'icon-puzzle'
             },
             {
               name: 'Temporadas',
               url: '/taquillas/temporadas',
               icon: 'icon-puzzle'
             },
             {
               name: 'Aperturas',
               url: '/taquillas/aperturas',
               icon: 'icon-puzzle'
             },
             {
               name: 'Tarifas',
               url: '/taquillas/tarifas',
               icon: 'icon-puzzle'
             }
           ]
         },
         {
          name: 'Seguridad',
          url: '/seguridad',
          icon: 'icon-user',
          children: [
            {
              name: 'Roles',
              url: '/seguridad/roles',
              icon: 'icon-user'
            },
            {
              name: 'Usuario',
              url: '/seguridad/usuarios',
              icon: 'icon-user'
            },
            {
              name: 'Recursos',
              url: '/seguridad/recursos',
              icon: 'icon-puzzle'
            },
            {
              name: 'Permisos',
              url: '/seguridad/permisos',
              icon: 'icon-puzzle'
            },
          ]
        },
         {
           name: 'Hotel',
           url: '/hotel',
           icon: 'icon-briefcase',
           children: [
             {
               name: 'Habitaciones',
               url: '/hotel/habitaciones',
               icon: 'icon-note'
             },
             {
               name: 'Camas',
               url: '/hotel/camas',
               icon: 'icon-people'
             }
           ]
         },
         {
           name: 'Gestión de aoperaciones',
           url: '/tarifas/apertura',
           title: true,
           children: [{}]
         },
         {
           title: true,
           name: 'Tarifas'
         },
         {
           name: 'Servicios',
           url: '/tarifas/servicios',
           icon: 'icon-star'
         },
         {
           name: 'Apertura',
           url: '/tarifas/apertura',
           icon: 'icon-map'
         },
         {
           title: true,
           name: 'Gestión de competencias'
         },
         {
           name: 'Competencias',
           url: '/competencias',
           icon: 'icon-drop',
           children: [
             {
               name: 'Listar Competencias',
               url: '/competencias/listCompetition',
               icon: 'icon-puzzle'
             },
             {
               name: 'Admin Competiciones',
               url: '/competencias/adminCompetition',
               icon: 'icon-puzzle'
             }
           ]
         },
         {
           name: 'CONFIGURACIÓN ESFODER',
           url: '/esfoder',
           icon: 'icon-puzzle',
           children: [
             {
               name: 'Niveles',
               url: '/esfoder/niveles',
               icon: 'icon-star'
             },
             {
               name: 'Instructores',
               url: '/esfoder/instructores',
               icon: 'icon-star'
             },
             {
               name: 'Evaluación rendimiento',
               url: '/esfoder/evaluacion-rendimiento',
               icon: 'icon-star'
             }
           ]
         },
         {
          name: 'AUTOGESTIÓN AFILIADOS',
          url: '/autoGestionAfiliados/autoGestionAfiliados',
          icon: 'icon-puzzle'
        },
        {
         name: 'AUTOGESTIÓN INSTRUCTORES',
         url: '/autoGestionInstructores/autoGestionInstructores',
         icon: 'icon-puzzle'
       }
        ];

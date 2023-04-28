import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'License Usage',
    icon: 'layout-outline',
    children: [
      {
        title: 'Estimation',
        link: '/component/details/create',
      },

      {
        title: 'Actual Usage',
        link: '/component/details/costing',
      },
      {
        title: 'Report',
        link: 'details/masterList/reportList',
      },
    ],
  },
];

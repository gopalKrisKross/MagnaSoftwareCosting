import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Estimation',
    icon: 'browser-outline', 
    link: '/component/details/estimation',
  }, {
    title: 'Actual Usage',
    icon: 'smartphone-outline',
    link: '/component/details/costing',
  },
  {
    title: 'Report',
    icon: 'layout-outline',
    children: [
     {
        title: 'Monthly Usage',
        link: '/component/details/list/report',
      },
      {
        title: 'Yearly Usage',
        link: '/component/details/summaryReport',
      },
    ],
  },
];

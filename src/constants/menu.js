import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'donations',
    icon: 'iconsminds-mail-money',
    label: 'Doações',
    to: `${adminRoot}/blank-page`,
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.start',
    //     to: `${adminRoot}/gogo/start`,
    //   },
    // ],
  },
  {
    id: 'donate',
    icon: 'iconsminds-money-bag',
    label: 'Doar',
    to: `${adminRoot}/donate`,
    // roles: [UserRole.Admin, UserRole.Editor],
    // subs: [
    //   {
    //     icon: 'simple-icon-paper-plane',
    //     label: 'menu.second',
    //     to: `${adminRoot}/second-menu/second`,
    //   },
    // ],
  },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
];
export default data;

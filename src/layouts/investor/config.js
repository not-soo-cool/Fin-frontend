import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
// import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
// import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
// import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import ChartBarSquareIcon from '@heroicons/react/24/solid/ChartBarSquareIcon';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/investors/overview',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarSquareIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Customers',
    path: '/investors/customers',
    icon: (
      <SvgIcon fontSize="small">
        <UserGroupIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/investors/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/investors/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
];

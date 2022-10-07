import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'monitoring',
    icon: 'iconsminds-monitor-analytics',
    label: 'menu.monitoring',
    to: `${adminRoot}/monitoring`,
  },
  {
    id: 'sensor',
    icon: 'iconsminds-remote-controll-2',
    label: 'menu.sensor',
    to: `${adminRoot}/sensor`,
    subs: [
      {
        id: 'tambah-sensor',
        icon: 'iconsminds-add',
        label: 'menu.tambah-sensor',
        to: `${adminRoot}/sensor/tambah-sensor`,
      },
      {
        id: 'baca-sensor',
        icon: 'iconsminds-add',
        label: 'menu.baca-sensor',
        to: `${adminRoot}/sensor/baca-sensor`,
      },
      {
        id: 'hapus-sensor',
        icon: 'iconsminds-add',
        label: 'menu.hapus-sensor',
        to: `${adminRoot}/sensor/hapus-sensor`,
      },
    ],
  },
];
export default data;

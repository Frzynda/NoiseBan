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
        id: 'baca-sensor',
        icon: 'iconsminds-open-book',
        label: 'menu.baca-sensor',
        to: `${adminRoot}/sensor/baca-sensor`,
      },
      {
        id: 'tambah-sensor',
        icon: 'iconsminds-add',
        label: 'menu.tambah-sensor',
        to: `${adminRoot}/sensor/tambah-sensor`,
      },
      {
        id: 'perbarui-sensor',
        icon: 'iconsminds-refresh',
        label: 'menu.perbarui-sensor',
        to: `${adminRoot}/sensor/perbarui-sensor`,
      },
      {
        id: 'hapus-sensor',
        icon: 'iconsminds-close',
        label: 'menu.hapus-sensor',
        to: `${adminRoot}/sensor/hapus-sensor`,
      },
    ],
  },
];
export default data;

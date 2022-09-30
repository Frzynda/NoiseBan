export const UserRole = {
  Admin: 0,
  Editor: 1,
};

/*
Menu Types:
"menu-default", "menu-sub-hidden", "menu-hidden"
*/
export const defaultMenuType = 'menu-default';

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;
export const defaultLocale = 'en';
export const localeOptions = [
  { id: 'en', name: 'English - LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'enrtl', name: 'English - RTL', direction: 'rtl' },
];

export const firebaseConfig = {
  apiKey: 'AIzaSyDTPSjUfIlAWAjGtBdX17zXZFECcZDjc34',
  authDomain: 'noise-ban.firebaseapp.com',
  databaseURL:
    'https://noise-ban-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'noise-ban',
  storageBucket: 'noise-ban.appspot.com',
  messagingSenderId: '375771929894',
  appId: '1:375771929894:web:a7d240dcf62689ac9fb5e7',
};

export const adminRoot = '/app';
export const buyUrl = 'https://1.envato.market/k4z0';
export const searchPath = `${adminRoot}/#`;
export const servicePath = 'https://api.coloredstrategies.com';

export const currentUser = {
  title: 'Admin',
  role: UserRole.Admin,
};

export const themeColorStorageKey = '__theme_selected_color';
export const isMultiColorActive = false;
export const defaultColor = 'light.orangecarrot';
export const isDarkSwitchActive = true;
export const defaultDirection = 'ltr';
export const themeRadiusStorageKey = '__theme_radius';
export const isAuthGuardActive = true;
export const colors = [
  'bluenavy',
  'blueyale',
  'blueolympic',
  'greenmoss',
  'greenlime',
  'purplemonster',
  'orangecarrot',
  'redruby',
  'yellowgranola',
  'greysteel',
];

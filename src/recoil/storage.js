import { atom } from 'recoil';

export const queryState = atom({
  default: '',
  key: 'queryState',
});

export const arrayProducto = atom({
  default: [],
  key: 'arrayProducto',
});

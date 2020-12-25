import { atom } from 'recoil';
import io from 'socket.io-client';
import { SERVER_ENDPOINT } from '../constants/api.constant';

export const themeStateAtom = atom({
  key: 'themeState',
  default: 'LIGHT'
});

export const socketAtom = atom({
  key: 'socketAtom',
  default: io(SERVER_ENDPOINT)
});
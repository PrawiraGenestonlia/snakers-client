import { selector } from 'recoil';
import { themeStateAtom, socketAtom } from './atom';

export const getThemeState = selector({
  key: 'getThemeState',
  get: ({ get }) => {
    const theme = get(themeStateAtom);
    return theme;
  }
});

export const getSocket = selector({
  key: 'getSocket',
  get: ({ get }) => {
    const socket = get(socketAtom);
    console.log(socket)
    return socket;
  }
});
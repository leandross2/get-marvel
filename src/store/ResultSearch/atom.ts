import { atom } from 'recoil'

export const resultSearchState = atom({
  key: 'resultSearchState',
  default: {
    comics: [],
    error: false,
    notFound: false
  }
});

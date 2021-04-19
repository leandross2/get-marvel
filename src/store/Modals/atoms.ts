import { atom } from 'recoil'
import { ComicProps } from '../../@types/apiMarvel';


export const comicModalDetailDataState = atom<ComicProps>({
  key: 'comicModalDetailDataState',
  default: {
    id: '',
    title: '',
    description: '',
    thumbnail: {
      path: '',
      extension: ''
    },
    creators: {
      items: [
        {
          name: '',
          role: '',
        }
      ]
    }
  },
});

export const comicModalDetailIsOpenState = atom({
  key: 'comicModalDetailIsOpenState',
  default: false,
});

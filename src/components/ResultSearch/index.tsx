import React from 'react';
import { useRecoilState } from 'recoil';
import { ComicList } from '../ComicList';
import { resultSearchState } from '../../store/ResultSearch/atom'

import { SearchList } from '../InputSearch';
import styles from './styles.module.scss'

export const ResultSearch: React.FC = () => {
  const [resultSearch, setResultSearch] = useRecoilState<SearchList>(resultSearchState)
  return (
    <div className={styles.container}>
      {resultSearch.notFound ?
        <div className="notFound">Not found comics</div> :
        !!resultSearch.comics.length && <ComicList comics={resultSearch.comics} imgSize="medium" />
      }
    </div >
  )
}
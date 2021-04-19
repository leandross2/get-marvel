import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { resultSearchState } from '../../store/ResultSearch/atom'

import styles from './styles.module.scss';

import { InputSearch, SearchList } from '../InputSearch';
import { ResultSearch } from '../ResultSearch';

export const Header = () => {
  const [loading, setLoading] = useState(false)

  return (
    <header className={styles.headerTop}>
      <div className={styles.content}>
        <div className={styles.logoArea}>
          <img src="/images/marvel.svg" alt="Marvel" className={styles.logo} />
          <InputSearch className={styles.search} />
        </div>
        <ResultSearch />
      </div>
    </header>
  )
}
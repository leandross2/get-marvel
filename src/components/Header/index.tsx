import React, { useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { comicsSelectedsState } from '../../store/Comics/comicsSelecteds'

import { apiMarvel, credentials } from '../../services/apiMarvel';
import { ComicList } from '../ComicList';

import styles from './styles.module.scss';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export const Header = () => {

  const [resultSearch, setResultSearch] = useState([])
  const [comicsSeleteds, setComicsSeleteds] = useRecoilState(comicsSelectedsState)
  const [loading, setLoading] = useState(false)

  let timeDebounce = null;

  const handleOnChange = useCallback(async (event) => {
    const { value } = event.target

    if (value === '') {
      setResultSearch([])
      return
    }

    clearInterval(timeDebounce)
    timeDebounce = setTimeout(async () => {
      const response = await apiMarvel.get(`/comics?${credentials}&titleStartsWith=${event.target.value}&limit=10`)
      setLoading(true)
      setResultSearch(response.data.data.results)
    }, 500)
  }, [])

  const handleSendMail = async () => {
    const response = await api.post('/email', {
      comics: comicsSeleteds
    })

    toast.success('Email enviado com sucesso!')

    console.log('Link Fake email', response.data.preview)
  }

  return (
    <header className={styles.headerTop}>
      <div className={styles.content}>
        <img src="/images/marvel.svg" alt="Marvel" className={styles.logo} />
        <div>
          <button type="button" onClick={handleSendMail}>Send Email</button>
          <input type="text" placeholder="search" onChange={handleOnChange} />
        </div>
        {!!resultSearch.length && <ComicList comics={resultSearch} />}
      </div>

    </header>
  )
}
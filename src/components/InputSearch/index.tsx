import React, { useState, useCallback, useRef, InputHTMLAttributes } from 'react';
import { MdFindInPage } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { apiMarvel, credentials } from '../../services/apiMarvel';
import { resultSearchState } from '../../store/ResultSearch/atom'

import styles from './styles.module.scss'

import { ComicProps } from '../../@types/apiMarvel';

export interface SearchList {
  comics: ComicProps[] | [];
  error: boolean
  notFound: boolean
}

export interface ResponseSearch {
  data: {
    results: ComicProps[] | []
  }
  error: boolean
}

interface InputSearchProps {
  className?: string
}

export const InputSearch = ({ className }: InputSearchProps) => {
  let timeDebounce = null;
  const [resultSearch, setResultSearch] = useRecoilState(resultSearchState)
  const [valueInputSearch, setValueInputSearch] = useState('')
  const inputSearchRef = useRef<HTMLInputElement>(null)

  const handleOnChange = useCallback(async (event) => {
    const { value } = event.target

    setValueInputSearch(value)

    if (value === '') {
      setResultSearch({ comics: [], error: false, notFound: false })
      return
    }

    const search = event.target.value.replace(' ', '-')

    clearInterval(timeDebounce)

    timeDebounce = setTimeout(async () => {
      const response = await apiMarvel.get<ResponseSearch>(`/comics?${credentials}&titleStartsWith=${search}&limit=5`)
      // setLoading(true)
      setResultSearch({
        comics: response.data.data.results,
        error: false,
        notFound: response.data.data.results.length === 0
      })
    }, 500)
  }, [])

  const handleClearInput = () => {
    inputSearchRef.current.value = ''
    setValueInputSearch('')
    inputSearchRef.current.focus()
    setResultSearch({ comics: [], error: false, notFound: false })
  }


  return (
    <div className={`${styles.container} ${className}`}>
      <input type="text" ref={inputSearchRef} placeholder="Search a comic" onChange={handleOnChange} />
      {valueInputSearch === '' ? <MdFindInPage size={20} /> : <AiFillCloseCircle size={20} onClick={handleClearInput} />}
    </div>
  )
}
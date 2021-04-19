import React, { useState } from 'react';
import { useRecoilState } from 'recoil'
import { BiPlusCircle } from 'react-icons/bi'
import { IoMdRemoveCircleOutline } from 'react-icons/io'

import { sendListState } from '../../store/SendList/atom'

import styles from './styles.module.scss';

import { ComicProps } from '../../@types/apiMarvel';

interface ButtonAddCommicSelectListProps {
  comic: ComicProps
}

export const ButtonAddCommicSelectList = ({ comic }: ButtonAddCommicSelectListProps) => {
  const [sendListComics, setSendListComics] = useRecoilState<ComicProps[]>(sendListState)
  const [hasInList, setHasInList] = useState(!!sendListComics.find(findComic => findComic.id === comic.id))

  const handleSelectComic = (comic: ComicProps) => {

    if (hasInList) {
      const updatedComicsSelected = sendListComics.filter(findComic => findComic.id !== comic.id)

      setSendListComics(updatedComicsSelected)

      setHasInList(false)
      return
    }

    const comicListEditable = [...sendListComics]

    comicListEditable.push(comic)

    setSendListComics(comicListEditable)
    setHasInList(true)
  }

  return hasInList ?
    <button type="button" className={styles.addListSend} onClick={() => handleSelectComic(comic)}>
      Remove item
      <IoMdRemoveCircleOutline size="20" />
    </button> :
    <button type="button" className={styles.addListSend} onClick={() => handleSelectComic(comic)}>
      Add to send list
      <BiPlusCircle size="20" />
    </button>


}

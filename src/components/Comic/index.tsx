import React, { useState } from 'react';
import { BiBook } from 'react-icons/bi'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { useRecoilState } from 'recoil'

import { comicModalDetailIsOpenState, comicModalDetailDataState } from '../../store/Modals/comicModalDetail'
import { comicsSelectedsState } from '../../store/Comics/comicsSelecteds'

import { apiMarvel, credentials } from '../../services/apiMarvel';

import { ComicProps as ComitTypes } from '../../@types/apiMarvel';
interface ComicProps {
  comic: ComitTypes,
  onSelected: boolean
}

import styles from './styles.module.scss'

export const Comic = ({ comic }: ComicProps) => {
  const [comicsSelecteds, setComicsSelecteds] = useRecoilState(comicsSelectedsState)
  const classSelected = comicsSelecteds.includes(comic) ? styles.selected : ''

  const [isOpenModal, setOpenModal] = useRecoilState(comicModalDetailIsOpenState)
  const [comicDetails, setComicDetails] = useRecoilState(comicModalDetailDataState)

  const isComicSelected = (comic) => {
    return comicsSelecteds.includes(comic)
  }

  const handleOpenModal = () => {
    const requestApi = async () => {
      const response = await apiMarvel.get(`/comics/${comic.id}?${credentials}`)

      setComicDetails(response.data.data.results[0])
      setOpenModal(true)
    }
    requestApi()

  }
  const handleSelectComic = (comic) => {
    if (isComicSelected(comic)) {
      const updatedComicsSelected = comicsSelecteds.filter(findComic => findComic.id !== comic.id)
      setComicsSelecteds(updatedComicsSelected)
      return
    }
    const comicsSelectedsEditable = [...comicsSelecteds]

    comicsSelectedsEditable.push(comic)

    setComicsSelecteds(comicsSelectedsEditable)
  }

  return (
    <li className={`${styles.comic} ${classSelected}`} key={comic.id} >
      <img src={`${comic.thumbnail.path}/portrait_incredible.jpg`} alt={comic.title} />

      <div className={styles.coverComic}>
        <p>{comic.title}</p>

        <div className={styles.buttons}>
          <button type="button" onClick={() => handleSelectComic(comic)}>
            {isComicSelected(comic) ? <ImCheckboxChecked size={20} /> : <ImCheckboxUnchecked size={20} />}
          </button>

          <button type="button" onClick={handleOpenModal}>
            <BiBook size={20} />
          </button>
        </div>
      </div>
    </li>
  )
}

import React, { useState } from 'react';
import { FaBookOpen } from 'react-icons/fa'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'
import { useRecoilState } from 'recoil'

import { comicModalDetailIsOpenState, comicModalDetailDataState } from '../../store/Modals/atoms'
import { comicsSelectedsState } from '../../store/Comics/atoms'

import { apiMarvel, credentials } from '../../services/apiMarvel';

import { ComicProps as ComitTypes } from '../../@types/apiMarvel';
interface ComicProps {
  comic: ComitTypes
  isFull?: boolean
  imgSize: 'medium' | 'incredible'
}

import styles from './styles.module.scss'

export const Comic = ({ comic, isFull, imgSize }: ComicProps) => {
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

  return (
    <li className={`${styles.comic} ${isFull ? styles.isFull : styles.isList}`} key={comic.id} onClick={handleOpenModal} >
      <img src={`${comic.thumbnail.path}/portrait_${imgSize}.${comic.thumbnail.extension}`} alt={comic.title} />

      <div className={styles.coverComic}>
        <p>{comic.title}</p>

        <div className={styles.buttons}>
          <FaBookOpen size={50} />
        </div>
      </div>
    </li>
  )
}

import React from 'react';
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify'

import { sendListState } from '../../../store/SendList/atom'

import { IoIosCloseCircle } from 'react-icons/io'

import styles from './styles.module.scss'
import { ComicProps } from '../../../@types/apiMarvel';
import { api } from '../../../services/api';

interface SendListItemProps {
  comic: ComicProps,
  onRemoveItemList: (comic: ComicProps) => void
}


export const SendListItem = ({ comic, onRemoveItemList }: SendListItemProps) => {

  return (
    <li className={styles.item}>
      <button type="button" className={styles.close} onClick={() => onRemoveItemList(comic)}>
        <IoIosCloseCircle size={20} />
      </button>
      <img src={`${comic.thumbnail.path}/portrait_small.jpg`} alt={comic.title} />
      <div className={styles.description}>
        <p className={styles.title}>{comic.title}</p>
      </div>
    </li>
  )
}

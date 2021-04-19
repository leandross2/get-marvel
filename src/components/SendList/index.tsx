import React from 'react';
import { useRecoilState } from 'recoil'
import { AiOutlineSend } from 'react-icons/ai'

import { sendListState } from '../../store/SendList/atom'
import { ComicProps } from '../../@types/apiMarvel';

import styles from './styles.module.scss'
import { SendListItem } from './SendLIstItem';
import { api } from '../../services/api';
import { toast } from 'react-toastify';


export const SendList: React.FC = () => {
  const [sendListComics, setSendListComics] = useRecoilState<ComicProps[]>(sendListState)

  const handleRemoveItemList = (comic) => {
    const updatedComicsSelected = sendListComics.filter(findComic => findComic.id !== comic.id)

    setSendListComics(updatedComicsSelected)

    return
  }

  const handleSendMail = async () => {
    const response = await api.post('/email', {
      comics: sendListComics
    })

    toast.success('Email enviado com sucesso!')

    console.log('Link Fake email', response.data.preview)
  }
  return (
    <div className={styles.sendList}>
      <ul className={styles.list}>
        {sendListComics.map((comic) => (
          <SendListItem key={comic.id} comic={comic} onRemoveItemList={handleRemoveItemList} />
        ))}
      </ul>

      <div className={styles.sendButtonArea}>
        <button type="button" onClick={handleSendMail}>
          Send Mail
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  )
}

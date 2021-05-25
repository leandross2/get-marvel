import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil'
import { AiOutlineSend } from 'react-icons/ai'

import { sendListState } from '../../store/SendList/atom'
import { inputMailTostate } from '../../store/InputMailTo/atom'
import { ComicProps } from '../../@types/apiMarvel';

import { SendListItem } from './SendLIstItem';
import { InputSendMail } from '../InputSendMail';
import { api } from '../../services/api';
import { toast } from 'react-toastify';

import styles from './styles.module.scss'

export const SendList: React.FC = () => {
  const [sendListComics, setSendListComics] = useRecoilState<ComicProps[]>(sendListState)
  const [inputMailTo, setInputMailTo] = useRecoilState<string>(inputMailTostate)
  const [sending, setSending] = useState(false)
  const inputMailToRef = useRef(null)

  const handleRemoveItemList = (comic) => {
    const updatedComicsSelected = sendListComics.filter(findComic => findComic.id !== comic.id)

    setSendListComics(updatedComicsSelected)

    return
  }
  useEffect(() => {
    console.log(inputMailToRef)
  }, [inputMailToRef])
  const handleSendMail = async () => {
    try {
      if (!sending && inputMailTo !== '') {
        setSending(true)
        const response = await api.post('/email', {
          comics: sendListComics,
          to: inputMailTo
        })

        toast.success(<a href={response.data.preview} target="_blank" rel="noopener">Click Aqui para ver o email!</a>)

        console.log('Link Fake email', response.data.preview)
        setSending(false)

      }

    } catch (err) {
      setSending(false)
      toast.error('Erro ao enviar o email!')

    }
  }
  return (
    <div className={styles.sendList}>
      <ul className={styles.list}>
        {sendListComics.map((comic) => (
          <SendListItem key={comic.id} comic={comic} onRemoveItemList={handleRemoveItemList} />
        ))}
      </ul>

      <div className={styles.sendButtonArea}>
        <InputSendMail ref={inputMailToRef} />

        <button type="button" onClick={handleSendMail} disabled={sending}>
          Send Mail
          <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  )
}

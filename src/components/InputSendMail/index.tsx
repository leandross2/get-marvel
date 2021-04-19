import React from 'react';
import { GrMail } from 'react-icons/gr'
import { useRecoilState } from 'recoil'

import { inputMailTostate } from '../../store/InputMailTo/atom'
import styles from './styles.module.scss'


export const InputSendMail = (props) => {
  const [inputMailTo, setInputMailTo] = useRecoilState(inputMailTostate)
  const handleChange = (event) => {
    const { value } = event.target
    setInputMailTo(value)
  }
  return (
    <div className={`${styles.container}`}>
      <input type="text" placeholder="Search a comic" onChange={handleChange} />
      <GrMail size={20} />
    </div>
  )
}
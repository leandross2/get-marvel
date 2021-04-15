import React from 'react';
import Link from 'next/link';

import styles from './styles.module.scss'
import { Comic } from '../../components/Comic';

import { ComicProps } from '../../@types/apiMarvel';

interface ComicListProps {
  comics: ComicProps[]
  isFull?: boolean
  selectable?: boolean
}

export const ComicList = ({ comics, isFull }: ComicListProps) => {
  const setContainerClass = isFull ? styles.comicListFull : styles.comicList
  return (
    <div className={setContainerClass}>
      <ul>
        {comics.map(comic => (
          <Comic comic={comic} onSelected={false} key={comic.id} />
        ))}
      </ul>
    </div >
  )
}

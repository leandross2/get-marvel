import { useState, useCallback, useEffect } from "react"
import { GetStaticProps, GetServerSideProps } from "next"
import { toast } from "react-toastify"
import { useRecoilState } from 'recoil'

import { apiMarvel, credentials } from "../services/apiMarvel"
import { ComicList } from '../components/ComicList'
import { DetailComicModal } from "../components/DetailComicModal"

import { sendListState } from '../store/SendList/atom'

import { ComicProps } from '../@types/apiMarvel';

import styles from './home.module.scss'

import { ComicProps as ComicTypes } from '../@types/apiMarvel'
import { SendList } from "../components/SendList"

interface ComicListProps {
  comics: ComicTypes[],
  error: boolean
}

export default function Home({ comics }) {

  // const { comics } = data.comics

  const [comicsList, setComicList] = useState<ComicListProps[]>(() => {
    return comics ? comics : [] as ComicListProps[]
  })

  const [sendListComics, setSendListComics] = useRecoilState<ComicProps[]>(sendListState)

  useEffect(() => {
    if (comics.error) {
      toast.error('Falha ao carregar a página')
    }
  }, [comics])


  return (
    <main className={styles.main}>
      <section className={styles.comicList}>
        {!comics.error && <ComicList comics={comics} isFull imgSize="incredible" />}
        {!!sendListComics.length && <SendList />}
      </section>
      <DetailComicModal />
    </main>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  try {
    const response = await apiMarvel.get(`/comics?${credentials}&limit=54&orderBy=modified`)
    const data = response.data.data.results
    // console.log(data)
    return {
      props: {
        comics: data,
        error: false
      },
    }
  } catch (err) {
    console.log('err', err)
    return {
      props: {
        comics: {
          error: true
        },
      }
    }
  }
}
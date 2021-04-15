import { useState, useCallback, useEffect } from "react"
import { GetStaticProps, GetServerSideProps } from "next"
import { toast } from "react-toastify"

import { apiMarvel, credentials } from "../services/apiMarvel"
import { ComicList } from '../components/ComicList'
import { DetailComicModal } from "../components/DetailComicModal"

import styles from './home.module.scss'

import { ComicProps } from '../@types/apiMarvel'


export default function Home({ comics }) {

  const [comicsList, setComicList] = useState<ComicProps[]>(() => {
    return comics ? comics : [] as ComicProps[]
  })

  useEffect(() => {
    if (comics.erro) toast.error('Falha ao carregar a página')
  }, [comics])

  return (
    <main className={styles.main}>
      <section>
        <ComicList comics={comicsList} isFull />
      </section>

      <DetailComicModal />
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await apiMarvel.get(`/comics?${credentials}&limit=50`)
    const data = response.data.data.results.map(res => res)

    return {
      props: {
        comics: data,
      }
    }

  } catch (err) {
    console.log('err', err)

    return {
      props: {
        comics: '',
        error: true,
        message: err
      }
    }

  }
}
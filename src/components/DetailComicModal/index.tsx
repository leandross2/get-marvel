import { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { IoIosCloseCircle } from 'react-icons/io'
import { BiPlusCircle } from 'react-icons/bi'
import { useRecoilState } from 'recoil'

import { ButtonAddCommicSelectList } from '../ButtonAddCommicSelectList'

import { comicModalDetailIsOpenState, comicModalDetailDataState } from '../../store/Modals/atoms'
import { sendListState } from '../../store/SendList/atom'
import styles from './styles.module.scss';

import { ComicProps } from '../../@types/apiMarvel';


export const DetailComicModal = () => {
  const [isOpenModal, setOpenModal] = useRecoilState(comicModalDetailIsOpenState)
  const [comicDetails, setComicDetails] = useRecoilState(comicModalDetailDataState)
  const [sendListComics, setSendListComics] = useRecoilState<ComicProps[]>(sendListState)

  const handleCloseModal = () => {
    setOpenModal(false)
  }


  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <div className="content">
        <button
          type="button"
          onClick={handleCloseModal}
          className={styles.reactModalClose}
        >
          <IoIosCloseCircle size={20} color={'#FFF'} />
        </button>

        <div className={styles.modalContent}>
          <div>
            <img
              src={`${comicDetails.thumbnail.path}/portrait_incredible.${comicDetails.thumbnail.extension}`}
              alt={comicDetails.title} />

            <ButtonAddCommicSelectList comic={comicDetails} />
          </div>

          <div className={styles.modalDescription}>
            <p className={styles.titleComic}>{comicDetails.title}</p>
            <p className={styles.description}>{comicDetails.description}</p>
            <div className={styles.creators}>
              <p>Creators:</p>
              {
                comicDetails.creators.items.map((creator, index) => (
                  <span key={`${creator.name}-${index}`}><strong>{creator.name}</strong>: {creator.role}</span>
                ))
              }

            </div>
          </div>
        </div >
      </div>

    </Modal >
  );
}


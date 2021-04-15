import { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import { IoIosCloseCircle } from 'react-icons/io'
import { useRecoilState } from 'recoil'

import { comicModalDetailIsOpenState, comicModalDetailDataState } from '../../store/Modals/comicModalDetail'
import styles from './styles.module.scss';
import { ComicProps } from '../../@types/apiMarvel';


export const DetailComicModal = () => {
  const [isOpenModal, setOpenModal] = useRecoilState(comicModalDetailIsOpenState)
  const [comicDetails, setComicDetails] = useRecoilState(comicModalDetailDataState)

  const handleCloseModal = () => {
    setOpenModal(false)
    // setComicDetails({} as ComicProps)
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={handleCloseModal}
      overlayClassName={styles.reactModalOverlay}
      className={styles.reactModalContent}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className={styles.reactModalClose}
      >
        <IoIosCloseCircle size={20} color={'#FFF'} />
      </button>

      <div className={styles.modalContent}>
        <img
          src={`${comicDetails.thumbnail.path}/portrait_incredible.${comicDetails.thumbnail.extension}`}
          alt={comicDetails.title} />

        <div className={styles.modalDescription}>
          <p className={styles.titleComic}>{comicDetails.title}</p>
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
    </Modal >
  );
}


import React, { useEffect } from 'react'
import { useWindowWidth } from '@react-hook/window-size'
import style from './Modal.module.css'

const Modal = ({ children, openModal, toggleModal }) => {
  const onlyWidth = useWindowWidth()
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.className = openModal ? style.open : style.close
  }, [openModal])

  const handleClick = e => {
    if (e.target.dataset.name !== 'overlay') {
      return
    }
    toggleModal()
  }

  return (
    <>
      {openModal && (
        <div
          className={style.overlay}
          onClick={handleClick}
          data-name="overlay"
        >
          <div className={style.modal} data-name="modal">
            <button
              className={
                onlyWidth < 768 ? style.arrowCloseButton : style.closeButton
              }
              type="button"
              onClick={toggleModal}
            ></button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal

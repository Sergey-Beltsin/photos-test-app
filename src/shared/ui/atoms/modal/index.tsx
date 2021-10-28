import { FC, useRef } from 'react';

import { useOutsideAlerter } from 'shared/hooks';
import styles from './modal.module.css';

type ModalProps = {
  handleClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, handleClose }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, handleClose);

  return (
    <div
      className={styles.container}
    >
      <div className={styles.content} ref={wrapperRef}>
        <button
          type="button"
          className={styles.close}
          onClick={() => handleClose()}
          aria-label="Close modal"
        />
        <div className={styles.wrapper}>
          {children}
        </div>
      </div>
    </div>
  );
};

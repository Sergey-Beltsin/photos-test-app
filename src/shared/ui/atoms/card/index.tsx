import { FC } from 'react';

import styles from './card.module.css';

type CardProps = {
  title: string;
  img: string;
  onClick: () => void;
}

export const Card: FC<CardProps> = ({ title, img, onClick }) => (
  <div className={styles.container}>
    <button type="button" className={styles.img} onClick={onClick}>
      <img src={img} alt="" />
    </button>
    <div className={styles.content}>
      {title}
    </div>
  </div>
);

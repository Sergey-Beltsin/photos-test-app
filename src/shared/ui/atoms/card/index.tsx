import { FC } from 'react';

import styles from './card.module.css';

type CardProps = {
  title: string;
  img: string;
}

export const Card: FC<CardProps> = ({ title, img }) => (
  <div className={styles.container}>
    <div className={styles.img}>
      <img src={img} alt="" />
    </div>
    <div className={styles.content}>
      {title}
    </div>
  </div>
);

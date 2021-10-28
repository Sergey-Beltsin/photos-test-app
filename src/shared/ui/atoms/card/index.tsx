import { FC, ReactNode } from 'react';

import styles from './card.module.css';

type CardProps = {
  title: string;
  img: string;
  extra: ReactNode;
  onClick: () => void;
}

export const Card: FC<CardProps> = ({
  title,
  img,
  extra,
  onClick,
}) => (
  <div className={styles.container}>
    <button type="button" className={styles.img} onClick={onClick}>
      <img src={img} alt="" />
    </button>
    {extra}
    <div className={styles.content}>
      {title}
    </div>
  </div>
);

import { FC } from 'react';

import styles from './container.module.css';

export const Container: FC = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

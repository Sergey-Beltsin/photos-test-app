import { FC } from 'react';
import classnames from 'classnames';

import styles from './pagination-item.module.css';

type PaginationItemProps = {
  label: number | string;
  isSelected: boolean;
  onSubmit: (index: number) => void;
};

export const PaginationItem: FC<PaginationItemProps> = ({ label, isSelected, onSubmit }) => (
  <button
    type="button"
    onClick={() => typeof label === 'number' && onSubmit(label)}
    className={classnames(styles.container, {
      [styles.selected]: isSelected,
      [styles.more]: typeof label !== 'number',
    })}
  >
    {label}
  </button>
);

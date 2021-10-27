/* eslint-disable react/no-array-index-key */
import { FC } from 'react';

import { PaginationItem } from 'shared/ui/atoms';
import styles from './pagination.module.css';

type PaginationProps = {
  items: number[];
  selectedItem: number;
  onSubmit: (index: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ items, selectedItem, onSubmit }) => {
  const getFormattedItems = (): Array<number | string> => {
    if (items.length > 5) {
      if (selectedItem === 1 || selectedItem === 2) {
        return [1, 2, 3, '...', items.length];
      }
      if (selectedItem === 3) {
        return [1, 2, 3, 4, '...', items.length];
      }
      if (selectedItem === items.length || selectedItem === items.length - 1) {
        return [1, '...', items.length - 2, items.length - 1, items.length];
      }
      if (selectedItem === items.length - 2) {
        return [1, '...', items.length - 3, items.length - 2, items.length - 1, items.length];
      }

      return [1, '...', selectedItem - 1, selectedItem, selectedItem + 1, '...', items.length];
    }

    return Array.from({ length: items.length }, (_, i) => i + 1);
  };

  return (
    <div className={styles.container}>
      {getFormattedItems().map((item, index) => (
        <PaginationItem
          key={`${item}-${index}`}
          isSelected={item === selectedItem}
          label={item}
          onSubmit={onSubmit}
        />
      ))}
    </div>
  );
};

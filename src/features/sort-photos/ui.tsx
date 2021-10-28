import { ChangeEvent, FC } from 'react';

import { photoModel } from 'entities/photo';
import styles from './sort-photos.module.css';

export const SortPhotos: FC = () => {
  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    if (event.target.value === 'down') {
      photoModel.events.handleChangeSorting('down');
      return;
    }

    photoModel.events.handleChangeSorting('up');
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.container}>
      <span>
        Sort by:
      </span>
      <select name="sort" className={styles.select} onChange={handleChangeSelect}>
        <option value="up">
          Up
        </option>
        <option value="down">
          Down
        </option>
      </select>
    </label>
  );
};

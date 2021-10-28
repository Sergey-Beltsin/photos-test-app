import { FC } from 'react';

import { photoModel } from 'entities/photo';
import { DeleteIcon } from 'shared/icons';
import styles from './delete-photo.module.css';

type DeletePhotoProps = {
  id: number;
};

export const DeletePhoto: FC<DeletePhotoProps> = ({ id }) => {
  const handleDelete = () => {
    photoModel.events.handleDeletePhoto(id);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDelete}
        disabled={photoModel.store.useIsDeletePhotoLoadingStore()}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

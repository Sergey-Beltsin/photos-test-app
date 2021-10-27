import { FC, useEffect } from 'react';

import { Photo, photoModel } from 'entities/photo';

import { useList } from 'effector-react';
import { Container } from 'shared/ui/atoms';
import styles from './photos.module.css';
import { Pagination } from '../../shared/ui/molecules';

export const PhotosPage: FC = () => {
  const paginationItems: number[] = photoModel.store.useAllAlbumIdsStore();
  const selectedPaginationItem: number = photoModel.store.useAlbumIdStore();

  useEffect(() => {
    photoModel.effects.getPhotosFx();
  }, []);

  const photosList = useList(photoModel.store.$filteredPhotos, (photo) => (
    <Photo title={photo.title} img={photo.url} />
  ));

  return (
    <Container>
      <h1 className={styles.title}>
        Photos app
      </h1>
      <div className={styles.pagination}>
        <Pagination
          items={paginationItems}
          selectedItem={selectedPaginationItem}
          onSubmit={photoModel.events.handleChangeAlbumId}
        />
      </div>
      <div className={styles.container}>
        {photosList}
      </div>
    </Container>
  );
};

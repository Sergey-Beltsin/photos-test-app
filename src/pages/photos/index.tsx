import { FC, useEffect } from 'react';
import { useList } from 'effector-react';

import { Photo, photoModel } from 'entities/photo';
import { Photo as PhotoType } from 'shared/api/photos';
import { Container, Loading } from 'shared/ui/atoms';
import { Pagination } from 'shared/ui/molecules';
import { Modal } from 'shared/ui/atoms/modal';
import styles from './photos.module.css';
import { DeletePhoto } from '../../features/delete-photo';

export const PhotosPage: FC = () => {
  const paginationItems: number[] = photoModel.store.useAllAlbumIdsStore();
  const selectedPaginationItem: number = photoModel.store.useAlbumIdStore();
  const photoModalId: number = photoModel.store.usePhotoModalId();
  const isLoading: boolean = photoModel.store.useIsPhotosLoadingStore();
  const photo: PhotoType | undefined = photoModel.store.usePhoto(photoModalId);

  useEffect(() => {
    photoModel.effects.getPhotosFx();
  }, []);

  const handleChangeModalVisible = (index?: number): void => {
    const body = document.querySelector('body');

    if (typeof index === 'number' && index >= 0) {
      photoModel.events.handleChangePhotoModalId(index);
      if (body) {
        body.style.overflow = 'hidden';
      }

      return;
    }

    photoModel.events.handleChangePhotoModalId(-1);
    if (body) {
      body.style.overflow = 'auto';
    }
  };

  const photosList = useList(photoModel.store.$filteredPhotos, (photoItem, index) => (
    <Photo
      title={photoItem.title}
      img={photoItem.thumbnailUrl}
      handleOpenModal={() => handleChangeModalVisible(index)}
      extra={<DeletePhoto id={photoItem.id} />}
    />
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
          onSubmit={(index) => photoModel.events.handleChangeAlbumId(index)}
        />
      </div>
      {isLoading ? <Loading /> : (
        <div className={styles.container}>
          {photosList}
        </div>
      )}
      {photoModalId >= 0 && (
        <Modal handleClose={handleChangeModalVisible}>
          <img className={styles.modalImg} src={photo?.url || ''} alt="" />
        </Modal>
      )}
    </Container>
  );
};

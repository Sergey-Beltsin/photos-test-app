import {
  combine,
  createEffect,
  createEvent,
  createStore, sample,
} from 'effector';
import { deletePhotoById, getAllPhotos, Photo } from 'shared/api/photos';
import { useStore } from 'effector-react';
import { AxiosPromise } from 'axios';

const handleChangeAlbumId = createEvent<number>();
const handleChangePhotoModalId = createEvent<number>();
const handleDeletePhoto = createEvent<number>();

const getPhotosFx = createEffect((): AxiosPromise<Photo[]> | null => {
  try {
    return getAllPhotos();
  } catch (error) {
    console.log(error);

    return null;
  }
});

const handleDeletePhotoFx = createEffect(async (
  { id, photos }: { id: number, photos: Photo[] },
) => {
  try {
    const index = photos.findIndex((photo) => photo.id === id);

    await deletePhotoById(id);

    const currentPhotos = [...photos];
    currentPhotos.splice(index, 1);

    return currentPhotos;
  } catch (error) {
    console.log(error);

    return photos;
  }
});

const $photos = createStore<Photo[]>([])
  .on(getPhotosFx.doneData, (_, payload) => (payload ? payload.data : []))
  .on(handleDeletePhotoFx.doneData, (_, photos) => photos);

const $albumId = createStore<number>(1)
  .on(handleChangeAlbumId, (_, albumId) => albumId);

const $photoModalId = createStore<number>(-1)
  .on(handleChangePhotoModalId, (_, id) => id);

const $filteredPhotos = combine(
  $photos,
  $albumId,
  (photos, albumId) => photos.filter((photo) => photo.albumId === albumId),
);

const $allAlbumIds = combine(
  $photos,
  (photos) => [...new Set(photos.map((photo) => photo.albumId))],
);

const $isPhotosLoading = getPhotosFx.pending;
const $isDeletePhotoLoading = handleDeletePhotoFx.pending;

sample({
  clock: handleDeletePhoto,
  source: $photos,
  fn: (photos, id) => ({ id, photos }),
  target: handleDeletePhotoFx,
});

const usePhoto = (photoId: number): Photo | undefined => useStore($filteredPhotos)[photoId];
const usePhotoModalId = (): number => useStore($photoModalId);
const useAlbumIdStore = (): number => useStore($albumId);
const useAllAlbumIdsStore = (): number[] => useStore($allAlbumIds);
const useIsPhotosLoadingStore = (): boolean => useStore($isPhotosLoading);
const useIsDeletePhotoLoadingStore = (): boolean => useStore($isDeletePhotoLoading);

const effects = {
  getPhotosFx,
};
const events = {
  handleChangeAlbumId,
  handleChangePhotoModalId,
  handleDeletePhoto,
};
const store = {
  $filteredPhotos,
  usePhoto,
  usePhotoModalId,
  useAlbumIdStore,
  useAllAlbumIdsStore,
  useIsPhotosLoadingStore,
  useIsDeletePhotoLoadingStore,
};

export const photoModel = { effects, events, store };

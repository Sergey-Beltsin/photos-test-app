import {
  combine,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { getAllPhotos, Photo } from 'shared/api/photos';
import { useStore } from 'effector-react';

const handleChangeAlbumId = createEvent<number>();
const handleChangePhotoModalId = createEvent<number>();

const getPhotosFx = createEffect(() => getAllPhotos());

const $photos = createStore<Photo[]>([])
  .on(getPhotosFx.doneData, (_, payload) => payload.data);

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

const usePhoto = (photoId: number): Photo | undefined => useStore($filteredPhotos)[photoId];
const usePhotoModalId = (): number => useStore($photoModalId);
const useAlbumIdStore = (): number => useStore($albumId);
const useAllAlbumIdsStore = (): number[] => useStore($allAlbumIds);
const useIsPhotosLoadingStore = (): boolean => useStore($isPhotosLoading);

const effects = {
  getPhotosFx,
};
const events = {
  handleChangeAlbumId,
  handleChangePhotoModalId,
};
const store = {
  $filteredPhotos,
  usePhoto,
  usePhotoModalId,
  useAlbumIdStore,
  useAllAlbumIdsStore,
  useIsPhotosLoadingStore,
};

export const photoModel = { effects, events, store };

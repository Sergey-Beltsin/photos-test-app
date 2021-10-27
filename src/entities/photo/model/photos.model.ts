import {
  combine,
  createEffect,
  createEvent,
  createStore,
} from 'effector';
import { getAllPhotos, Photo } from 'shared/api/photos';
import { useStore } from 'effector-react';

const handleChangeAlbumId = createEvent<number>();

const getPhotosFx = createEffect(() => getAllPhotos());

const $photos = createStore<Photo[]>([])
  .on(getPhotosFx.doneData, (_, payload) => payload.data);

const $albumId = createStore<number>(1)
  .on(handleChangeAlbumId, (_, albumId) => albumId);

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

const useAlbumIdStore = (): number => useStore($albumId);
const useAllAlbumIdsStore = (): number[] => useStore($allAlbumIds);
const useIsPhotosLoadingStore = (): boolean => useStore($isPhotosLoading);

const effects = {
  getPhotosFx,
};
const events = {
  handleChangeAlbumId,
};
const store = {
  $filteredPhotos,
  useAlbumIdStore,
  useAllAlbumIdsStore,
  useIsPhotosLoadingStore,
};

export const photoModel = { effects, events, store };

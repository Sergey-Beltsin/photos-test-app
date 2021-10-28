import { AxiosPromise } from 'axios';
import { axios } from '../axios';
import type { Photo } from './models';

const BASE_URL = '/photos';

export const getAllPhotos = (): AxiosPromise<Photo[]> => axios.get(BASE_URL);

export const deletePhotoById = (id: number): AxiosPromise => axios.delete(`${BASE_URL}/${id}`);

export type { Photo };

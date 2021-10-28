import { FC } from 'react';
import { Card } from 'shared/ui/atoms';

type PhotoProps = {
  title: string;
  img: string;
  handleOpenModal: () => void;
};

export const Photo: FC<PhotoProps> = ({ title, img, handleOpenModal }) => (
  <Card title={title} img={img} onClick={handleOpenModal} />
);

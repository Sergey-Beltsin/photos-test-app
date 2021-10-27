import { FC } from 'react';
import { Card } from 'shared/ui/atoms';

type PhotoProps = {
  title: string;
  img: string;
};

export const Photo: FC<PhotoProps> = ({ title, img }) => (
  <Card title={title} img={img} />
);

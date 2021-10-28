import { FC, ReactNode } from 'react';

import { Card } from 'shared/ui/atoms';

type PhotoProps = {
  title: string;
  img: string;
  extra: ReactNode;
  handleOpenModal: () => void;
};

export const Photo: FC<PhotoProps> = ({
  title,
  img,
  extra,
  handleOpenModal,
}) => (
  <Card title={title} img={img} extra={extra} onClick={handleOpenModal} />
);

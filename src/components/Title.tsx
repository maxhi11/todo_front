import * as React from 'react';

interface ITitle {
  size: number;
  title: string
}

export const Title: React.FC<ITitle> = ({ size, title }) => (
    <span style={{ fontSize: size }}>{title}</span>
);

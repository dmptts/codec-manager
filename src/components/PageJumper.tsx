import React, { useState } from 'react';

interface IPageJumberProps {
  totalPages: number;
  onPageChange: (newPageIndex: number) => void;
}

export default function PageJumper({
  totalPages,
  onPageChange,
}: IPageJumberProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPageChange(+value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        Перейти на{' '}
        <input type="text" name="page" value={value} onChange={handleChange} />{' '}
        из {totalPages} страниц
      </p>
    </form>
  );
}

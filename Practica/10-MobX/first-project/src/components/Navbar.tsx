import React, { FC } from 'react';

export const Navbar: FC<{ setPage: Function }> = ({ setPage }) => {
  return (
    <div>
      <button onClick={() => setPage('Todos')}>Todos</button>
      <button onClick={() => setPage('Comments')}>Comments</button>
    </div>
  );
};

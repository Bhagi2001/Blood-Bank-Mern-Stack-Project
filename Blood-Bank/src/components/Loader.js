import React from 'react';

export default function Loader({ small }) {
  return (
    <div className={small ? 'bb-loader bb-loader--sm' : 'bb-loader'} />
  );
}

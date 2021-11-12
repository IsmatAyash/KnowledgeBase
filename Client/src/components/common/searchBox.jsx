import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type='text'
        name='query'
        value={value}
        placeholder='Search...'
        className='form-control my-3'
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;

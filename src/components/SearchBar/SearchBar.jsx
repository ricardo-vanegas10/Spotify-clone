import React, { useEffect, useState } from 'react';
import './SearchBar.styles.css';
import { CloseImg, SearchImg } from '../../assets/svg';

export const SearchBar = ({ onChange, custom, theme }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    const delay = setTimeout(() => onChange(inputValue), 1000);
    return () => clearTimeout(delay);
  }, [inputValue]);

  return (
    <div
      className={`searchBar ${theme && 'theme--' + theme} ${custom && custom}`}
    >
      <input
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        className="search__input rounded-full px-[10%] py-[8px] w-full "
        type="text"
        placeholder="Buscar"
        value={inputValue}
      />
      {/* <div className="search__icon bg-white">
        <SearchImg />
      </div> */}

      {inputValue && (
        <button
          onClick={() => setInputValue('')}
          className="search__clean__icon "
        >
          <CloseImg />
        </button>
      )}
    </div>
  );
};

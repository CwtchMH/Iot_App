import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [signal, setSignal] = useState('')

  return (
    <SearchContext.Provider value={{ signal, setSignal, searchTerm, setSearchTerm, searchType, setSearchType }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);

// Add this line at the end of the file
export default SearchContext;

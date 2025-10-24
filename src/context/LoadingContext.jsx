import React, { createContext, useState, useContext } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {isLoading && <LoadingSpinner />}
      {children}
    </LoadingContext.Provider>
  );
};

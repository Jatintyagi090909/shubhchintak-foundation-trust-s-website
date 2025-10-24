import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext'; // adjust path if needed

const PageTransition = ({ children }) => {
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => {
      hideLoading();
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return <>{children}</>;
};

export default PageTransition;
// hooks/useQueryParams.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useQueryParams = () => {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    const params = router.query;
    setQueryParams(params);
  }, [router.query]);

  const setQueryParam = (key, value) => {
    const newQueryParams = {...queryParams, [key]: value };
    router.push({
      pathname: router.pathname,
      query: newQueryParams,
    });
  };

  const getQueryParams = () => queryParams;

  return [setQueryParam, getQueryParams];
};

export default useQueryParams;
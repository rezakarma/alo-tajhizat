export const buildQueryString = (params: { [key: string]: string | null }) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== "") {
        searchParams.set(key, params[key]);
      }
    });
    return searchParams.toString();
  };
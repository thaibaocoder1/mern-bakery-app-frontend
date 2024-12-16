export const getEndpointBackend = () => {
  return import.meta.env.MODE === "development"
    ? `${import.meta.env.VITE_API_LOCAL_ENDPOINT}`
    : `${import.meta.env.VITE_API_CLOUD_ENDPOINT}`;
};

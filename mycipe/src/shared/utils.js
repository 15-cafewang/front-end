export const getToken = () => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem("USER_TOKEN");
  if (token) {
    return `${token}`;
  }
  return null;
};

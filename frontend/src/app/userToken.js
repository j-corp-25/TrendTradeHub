export const getUserToken = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user ? user.token : null;
};

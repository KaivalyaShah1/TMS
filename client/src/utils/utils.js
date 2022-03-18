export const SetUserData = (data) => {
  localStorage.setItem('userData', JSON.stringify(data));
};

export const GetUserData = (data) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return null;
  }
  return JSON.parse(userData);
};

export const GetToken = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return null;
  }
  return JSON.parse(userData).accessToken;
};

export const isLoggedIn = () => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return false;
  }
  return true;
};

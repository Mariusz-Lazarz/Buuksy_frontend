
export const isTokenExpired = () => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!tokenExpiry) return true;

  const now = new Date().getTime();
  return now > parseInt(tokenExpiry);
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token && !isTokenExpired();
};

export const getToken = () => {
  if (isTokenExpired()) {
    logout();
    return null;
  }
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("user");
};

export const getUserData = () => {
  const userDataString = localStorage.getItem("user");
  return userDataString ? JSON.parse(userDataString) : null;
};

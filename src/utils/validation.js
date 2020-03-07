export const validateUsername = (username) => {
  return username.match(/^[a-zA-Z0-9]{6,20}$/);
};

export const validateEmail = (email) => {
  return email.includes('@');
};

export const validatePassword = (password) => {
  return password.match(/^.{8,}$/);
};

export const validateUsername = (username) => {
  return username.match(/^(?=.{6,36}$)[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/);
};

export const validateEmail = (email) => {
  return email.includes('@') && email.length < 255;
};

export const validatePassword = (password) => {
  return password.match(/^.{8,}$/);
};

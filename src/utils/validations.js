export const messagesEnum = {
  USERNAME_INVALID: 'Username must contain 6-20 alphanumeric characters!',
  EMAIL_INVALID: "That's not a valid email address!",
  PASSWORD_INVALID: 'Password must contain at least 8 characters!'
};

export const formClassesEnum = {
  INVALID: 'invalid',
  VALID: 'valid'
};

export const validateUsername = (
  username,
  validateUsernameAvailability,
  setFormClasses,
  setFormMessages
) => {
  if (username.match(/^[a-zA-Z0-9]{6,20}$/)) {
    validateUsernameAvailability({
      variables: {
        username
      }
    });
  } else {
    setFormClasses(prevFormClasses => {
      return {
        ...prevFormClasses,
        username: formClassesEnum.INVALID
      };
    });
    setFormMessages(prevFormMessages => {
      return {
        ...prevFormMessages,
        username: messagesEnum.USERNAME_INVALID
      };
    });
  }
};

export const validateEmail = (
  email,
  validateEmailAvailability,
  setFormClasses,
  setFormMessages
) => {
  if (email.includes('@')) {
    validateEmailAvailability({
      variables: {
        email
      }
    });
  } else {
    setFormClasses(prevFormClasses => {
      return {
        ...prevFormClasses,
        email: formClassesEnum.INVALID
      };
    });
    setFormMessages(prevFormMessages => {
      return {
        ...prevFormMessages,
        email: messagesEnum.EMAIL_INVALID
      };
    });
  }
};

export const validatePassword = (password, setFormClasses) => {
  if (password.match(/^.{8,}$/)) {
    setFormClasses(prevFormClasses => {
      return { ...prevFormClasses, password: formClassesEnum.VALID };
    });
  } else {
    setFormClasses(prevFormClasses => {
      return { ...prevFormClasses, password: formClassesEnum.INVALID };
    });
  }
};

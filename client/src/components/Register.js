import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import Message from "./Message";
import "./Register.css";

export default () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [formValueClasses, setFormValueClasses] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [formMessages, setFormMessages] = useState({
    username: "Username is required to join the club!",
    email: "How will you receive my emails?",
    password: "Make sure your password is at least 8 characters!"
  });

  const REGISTER_USER = gql`
    mutation RegisterUser($user: UserInput!) {
      registerUser(user: $user) {
        success
        message
        payload {
          firstName
          lastName
          email
        }
      }
    }
  `;

  const CHECK_USERNAME = gql`
    query CheckUsername($username: String!) {
      checkUsername(username: $username) {
        success
        message
      }
    }
  `;

  const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
      checkEmail(email: $email) {
        success
        message
      }
    }
  `;

  const [registerUser] = useMutation(REGISTER_USER);
  const [checkUsername, checkUserNameOption] = useLazyQuery(CHECK_USERNAME);
  const [checkEmail, checkEmailOption] = useLazyQuery(CHECK_EMAIL);

  useEffect(() => {
    if (
      checkUserNameOption.data &&
      !checkUserNameOption.data.checkUsername.success
    ) {
      console.log(checkUserNameOption.data);
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          username: checkUserNameOption.data.checkUsername.message
        };
      });
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, username: "invalid" };
      });
    } else {
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          username: "Username is required to join the club!"
        };
      });
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, username: "" };
      });
    }
  }, [checkUserNameOption.data]);

  useEffect(() => {
    if (checkEmailOption.data && !checkEmailOption.data.checkEmail.success) {
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          email: checkEmailOption.data.checkEmail.message
        };
      });
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, email: "invalid" };
      });
    } else {
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          email: "How will you receive my emails?"
        };
      });
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, email: "" };
      });
    }
  }, [checkEmailOption.data]);

  const handleSubmit = event => {
    event.preventDefault();
    const newFormValueClasses = {
      username: formValueClasses.username,
      email: formValueClasses.email,
      password: formValueClasses.password
    };

    if (!formValues.username) newFormValueClasses.username = "invalid";
    if (!formValues.email) newFormValueClasses.email = "invalid";
    if (formValues.password.length < 8)
      newFormValueClasses.password = "invalid";
    setFormValueClasses(newFormValueClasses);
    if (
      !newFormValueClasses.username &&
      !newFormValueClasses.email &&
      !newFormValueClasses.password
    ) {
      registerUser({
        variables: {
          user: {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password
          }
        }
      });
    } else alert("fail");
  };

  const handleBlurOnUsername = event => {
    event.preventDefault();
    if (!formValues.username) {
      setFormValueClasses(prevFormValueClasses => {
        return {
          ...prevFormValueClasses,
          username: "invalid"
        };
      });
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          username: "Username is required to join the club!"
        };
      });
    } else {
      checkUsername({
        variables: {
          username: formValues.username
        }
      });
    }
  };

  const handleBlurOnEmail = event => {
    event.preventDefault();

    if (!formValues.email) {
      setFormValueClasses(prevFormValueClasses => {
        return {
          ...prevFormValueClasses,
          email: "invalid"
        };
      });
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          email: "How will you receive my emails?"
        };
      });
    } else {
      checkEmail({
        variables: {
          email: formValues.email
        }
      });
    }
  };

  const handleBlurOnPassword = event => {
    event.preventDefault();

    if (formValues.password.length < 8) {
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, password: "invalid" };
      });
    } else {
      setFormValueClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, password: "" };
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p>
        Sign up to receive the emails from me, from time to time. I won't spam!
      </p>
      <form onSubmit={handleSubmit}>
        Username <span className="mandatory">*</span>
        <br />
        <input
          type="text"
          name="username"
          value={formValues.username}
          className={formValueClasses.username}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnUsername}
        />{" "}
        {formValueClasses.username && (
          <Message>{formMessages.username}</Message>
        )}
        <br />
        Email <span className="mandatory">*</span>
        <br />
        <input
          type="text"
          name="email"
          value={formValues.email}
          className={formValueClasses.email}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnEmail}
        />{" "}
        {formValueClasses.email && <Message>{formMessages.email}</Message>}
        <br />
        Password <span className="mandatory">*</span>
        <br />
        <input
          type="password"
          name="password"
          value={formValues.password}
          className={formValueClasses.password}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnPassword}
        />{" "}
        {formValueClasses.password && (
          <Message>{formMessages.password}</Message>
        )}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

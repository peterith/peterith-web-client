import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import {
  render,
  fireEvent,
  waitForElement,
  wait
} from '@testing-library/react';
import faker from 'faker';
import Login, { LOGIN } from './Login';
import { AuthContext } from './App';

let loginQueryCalled = false;
const errorMessage = 'Incorrect username or password!';

const mockInvalidUser = {
  username: faker.internet.userName(),
  password: faker.internet.password()
};

const mockValidUser = {
  username: faker.internet.userName(),
  password: faker.internet.password()
};

const unsuccessfulLogin = {
  success: false,
  message: faker.lorem.sentence(),
  user: null,
  token: null
};

const successfulLogin = {
  success: true,
  message: faker.lorem.sentence(),
  user: { username: mockValidUser.username, email: faker.internet.email() },
  token: 'idk'
};

const mocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        user: mockInvalidUser
      }
    },
    result: () => {
      loginQueryCalled = true;

      return {
        data: {
          login: unsuccessfulLogin
        }
      };
    }
  },
  {
    request: {
      query: LOGIN,
      variables: {
        user: mockValidUser
      }
    },
    result: () => {
      loginQueryCalled = true;

      return {
        data: {
          login: successfulLogin
        }
      };
    }
  }
];

beforeEach(() => {
  loginQueryCalled = false;
});

it('renders without error', () => {
  render(
    <MockedProvider>
      <AuthContext.Provider value={{ dispatch: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    </MockedProvider>
  );
});

it('should display error message when user is invalid', async () => {
  const { getByText, getByLabelText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthContext.Provider value={{ dispatch: jest.fn() }}>
        <Login />
      </AuthContext.Provider>
    </MockedProvider>
  );

  fireEvent.change(getByLabelText('Username'), {
    target: { value: mockInvalidUser.username }
  });

  fireEvent.change(getByLabelText('Password'), {
    target: { value: mockInvalidUser.password }
  });

  fireEvent.click(
    getByText('Login', {
      ignore: 'h1'
    })
  );

  await waitForElement(() => getByText(errorMessage));

  expect(loginQueryCalled).toBe(true);
  expect(getByText(errorMessage));
});

it('should not display error message when user is valid', async () => {
  const history = { push: jest.fn() };
  const dispatch = jest.fn();
  const { getByText, getByLabelText, queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthContext.Provider value={{ dispatch }}>
        <Login history={history} />
      </AuthContext.Provider>
    </MockedProvider>
  );

  fireEvent.change(getByLabelText('Username'), {
    target: { value: mockValidUser.username }
  });

  fireEvent.change(getByLabelText('Password'), {
    target: { value: mockValidUser.password }
  });

  fireEvent.click(
    getByText('Login', {
      ignore: 'h1'
    })
  );

  await wait();

  expect(loginQueryCalled).toBe(true);
  expect(dispatch).toBeCalledTimes(1);
  expect(dispatch).toBeCalledWith({
    type: 'LOGIN',
    payload: { token: successfulLogin.token, user: successfulLogin.user }
  });
  expect(history.push).toBeCalledTimes(1);
  expect(history.push).toBeCalledWith('/profile');
  expect(queryByText(errorMessage)).toBeNull();
});

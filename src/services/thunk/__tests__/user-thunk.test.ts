import {
  fetchApiUser,
  registerUser,
  userLogin,
  logoutUser,
  updateUserData,
  forgotPasswordUser,
  resetPasswordUser
} from '../user-thunk';
import * as api from '@api';
import * as cookie from '../../../utils/cookie';

jest.mock('@api');

const mockUser = {
  success: true,
  user: {
    email: 'test@gmail.com',
    name: 'User'
  },
  accessToken: 'test-access-token',
  refreshToken: 'test-refresh-token'
};

const mockUserRegisterUser = {
  email: 'test@gmail.com',
  name: 'User',
  password: 'password'
};

const mockUserLogin = {
  email: 'test@gmail.com',
  password: 'password'
};

const mockUpdateUserData = {
  email: 'test35@mail.ru',
  name: 'test35'
};

const mockForgotPasswordUser = {
  email: 'test35@mail.ru'
};

const mockResetPasswordUser = {
  password: 'password',
  token: 'token'
};

describe('user-thunk', () => {
  beforeEach(() => {
    jest.spyOn(cookie, 'setCookie').mockImplementation(() => undefined as any);
    jest
      .spyOn(cookie, 'deleteCookie')
      .mockImplementation(() => undefined as any);
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');
  });

  it('успешно загружает данные пользователя', async () => {
    const user = mockUser.user as any;
    (api.getUserApi as jest.Mock).mockResolvedValueOnce(user);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await fetchApiUser()(dispatch, getState, undefined);
    expect(action.type).toBe(fetchApiUser.fulfilled.type);
    expect(action.payload).toEqual(user);
  });

  it('регистрирует пользователя и сохраняет токены', async () => {
    const authResponse = mockUser as any;
    (api.registerUserApi as jest.Mock).mockResolvedValueOnce(authResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await registerUser(mockUserRegisterUser)(
      dispatch,
      getState,
      undefined
    );

    expect(cookie.setCookie).toHaveBeenCalledWith(
      'accessToken',
      'test-access-token'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'test-refresh-token'
    );
    expect(action.type).toBe(registerUser.fulfilled.type);
    expect(action.payload).toEqual(authResponse);
  });

  it('логинит пользователя и сохраняет токены', async () => {
    const authResponse = mockUser as any;
    (api.loginUserApi as jest.Mock).mockResolvedValueOnce(authResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await userLogin(mockUserLogin)(
      dispatch,
      getState,
      undefined
    );
    expect(cookie.setCookie).toHaveBeenCalledWith(
      'accessToken',
      'test-access-token'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      'test-refresh-token'
    );
    expect(action.type).toBe(userLogin.fulfilled.type);
    expect(action.payload).toEqual(authResponse);
  });

  it('выходит из системы и очищает токены', async () => {
    (api.logoutApi as jest.Mock).mockResolvedValueOnce({});
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await logoutUser()(dispatch, getState, undefined);

    expect(cookie.deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    expect(action.type).toBe(logoutUser.fulfilled.type);
    expect(action.payload).toBeNull();
  });

  it('обновляет данные пользователя', async () => {
    const updateResponse = mockUpdateUserData as any;
    (api.updateUserApi as jest.Mock).mockResolvedValueOnce(updateResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await updateUserData(mockUpdateUserData)(
      dispatch,
      getState,
      undefined
    );
    expect(action.type).toBe(updateUserData.fulfilled.type);
    expect(action.payload).toEqual(updateResponse);
  });

  it('обрабатывает запрос на восстановление пароля', async () => {
    const successResponse = { success: true } as any;
    (api.forgotPasswordApi as jest.Mock).mockResolvedValueOnce(successResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await forgotPasswordUser(mockForgotPasswordUser)(
      dispatch,
      getState,
      undefined
    );
    expect(action.type).toBe(forgotPasswordUser.fulfilled.type);
    expect(action.payload).toEqual(successResponse);
  });

  it('обрабатывает сброс пароля', async () => {
    const successResponse = { success: true } as any;
    (api.resetPasswordApi as jest.Mock).mockResolvedValueOnce(successResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await resetPasswordUser(mockResetPasswordUser)(
      dispatch,
      getState,
      undefined
    );
    expect(action.type).toBe(resetPasswordUser.fulfilled.type);
    expect(action.payload).toEqual(successResponse);
  });
});

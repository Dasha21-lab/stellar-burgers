import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

// получение данных пользователя
export const fetchApiUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchApiUser`,
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// регистрация нового пользователя
export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (dataUser: TRegisterData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(dataUser);

      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// вход пользователя
export const userLogin = createAsyncThunk(
  `${USER_SLICE_NAME}/userLogin`,
  async (dataUser: TLoginData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(dataUser);

      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      return data;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// выход из системы
export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return null;
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// обновление данных пользователя
export const updateUserData = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(user);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// запрос на восстановление пароля
export const forgotPasswordUser = createAsyncThunk(
  `${USER_SLICE_NAME}/forgotPasswordUser`,
  async (data: { email: string }, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

// сброс пароля с токеном
export const resetPasswordUser = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPasswordUser`,
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi(data);
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

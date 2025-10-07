import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { TUser } from '@utils-types';
import {
  fetchApiUser,
  registerUser,
  userLogin,
  forgotPasswordUser,
  resetPasswordUser,
  logoutUser,
  updateUserData
} from '../thunk/user-thunk';
import {
  isActionPending,
  isActionRejected,
  TypedRejectedAction
} from '../redux';

export interface IUserState {
  user: TUser | null;
  authUserCheck: boolean; // флаг завершения проверки авторизации
  passwordForgot: boolean; // флаг успешного запроса восстановления пароля
  passwordReset: boolean; // флаг успешного сброса пароля
  loading: boolean;
  error: string | null | undefined;
}

const initialState: IUserState = {
  user: null,
  authUserCheck: false,
  passwordForgot: false,
  passwordReset: false,
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    // отмечает что проверка авторизации завершена
    setAuthUserChecked: (state) => {
      state.authUserCheck = true;
    },

    // очищает ошибку
    clearError: (state) => {
      state.error = null;
    },

    // сбрасывает статусы восстановления пароля
    resetPasswordStatus: (state) => {
      state.passwordForgot = false;
      state.passwordReset = false;
    },

    // Дополнительное действие для установки пользователя
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },

    // Дополнительный редьюсер для полной очистки
    clearUser: (state) => {
      state.user = null;
      state.authUserCheck = false;
    }
  },

  extraReducers: (builder) => {
    builder
      // fetchApiUser
      .addCase(fetchApiUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authUserCheck = true;
        state.loading = false;
        state.error = null;
      })

      // registerUser
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authUserCheck = true;
        state.loading = false;
        state.error = null;
      })

      // userLogin
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authUserCheck = true;
        state.loading = false;
        state.error = null;
      })

      // updateUserData
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })

      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authUserCheck = false;
        state.loading = false;
        state.error = null;
      })

      // forgotPasswordUser
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.passwordForgot = true;
        state.loading = false;
        state.error = null;
      })

      // resetPasswordUser
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.passwordReset = true;
        state.loading = false;
        state.error = null;
      })

      .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        isActionRejected(USER_SLICE_NAME),
        (state, action: TypedRejectedAction) => {
          state.loading = false;
          state.error = action.error?.message;

          if (
            action.type.includes('fetchApiUser') ||
            action.type.includes('logoutUser')
          ) {
            state.user = null;
            state.authUserCheck = true;
          }

          if (action.type.includes('forgotPasswordUser')) {
            state.passwordForgot = false;
          }

          if (action.type.includes('resetPasswordUser')) {
            state.passwordReset = false;
          }
        }
      );
  },

  selectors: {
    userDataSelector: (state) => state.user, // данные пользователя
    authUserCheckedSelector: (state) => state.authUserCheck,
    userLoadingSelector: (state) => state.loading,
    userErrorSelector: (state) => state.error,
    passwordForgotSelector: (state) => state.passwordForgot,
    passwordResetSelector: (state) => state.passwordReset
  }
});

export const {
  setAuthUserChecked,
  clearError,
  resetPasswordStatus,
  setUser,
  clearUser
} = userSlice.actions;

export const {
  userDataSelector,
  authUserCheckedSelector,
  userLoadingSelector,
  userErrorSelector,
  passwordForgotSelector,
  passwordResetSelector
} = userSlice.selectors;

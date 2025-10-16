import { TUser } from '@utils-types';
import {
  userSlice,
  clearUser,
  setUser,
  setAuthUserChecked,
  clearError,
  resetPasswordStatus
} from '../user-slice';
import {
  fetchApiUser,
  registerUser,
  userLogin,
  updateUserData,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser
} from '../../thunk/user-thunk';

const mockUser: TUser = {
  email: 'test@gmail.com',
  name: 'User'
};

describe('userSlice', () => {
  it('обработка успешных запросов аутентификации', () => {
    const payload = { user: mockUser } as any;

    // должен корректно обрабатывать fetchApiUser.fulfilled
    const fetchState = userSlice.reducer(undefined, {
      type: fetchApiUser.fulfilled.type,
      payload
    });
    expect(fetchState.user).toEqual(payload.user);
    expect(fetchState.authUserCheck).toBe(true);
    expect(fetchState.loading).toBe(false);
    expect(fetchState.error).toBeNull();

    // должен корректно обрабатывать registerUser.fulfilled
    const registerState = userSlice.reducer(undefined, {
      type: registerUser.fulfilled.type,
      payload
    });
    expect(registerState.user).toEqual(payload.user);

    // должен корректно обрабатывать userLogin.fulfilled
    const loginState = userSlice.reducer(undefined, {
      type: userLogin.fulfilled.type,
      payload
    });
    expect(loginState.user).toEqual(payload.user);

    // должен корректно обрабатывать updateUserData.fulfilled
    const updateState = userSlice.reducer(undefined, {
      type: updateUserData.fulfilled.type,
      payload
    });
    expect(updateState.user).toEqual(payload.user);

    // должен корректно обрабатывать logoutUser.fulfilled
    const logoutState = userSlice.reducer(undefined, {
      type: logoutUser.fulfilled.type
    });
    expect(logoutState.user).toBeNull();
    expect(logoutState.authUserCheck).toBe(true);

    // должен корректно обрабатывать forgotPasswordUser.fulfilled
    const forgotPasswordState = userSlice.reducer(undefined, {
      type: forgotPasswordUser.fulfilled.type
    });
    expect(forgotPasswordState.passwordForgot).toBe(true);

    // должен корректно обрабатывать resetPasswordUser.fulfilled
    const resetPasswordState = userSlice.reducer(undefined, {
      type: resetPasswordUser.fulfilled.type
    });
    expect(resetPasswordState.passwordReset).toBe(true);
  });

  it('проверка pending', () => {
    const pending = userSlice.reducer(undefined, {
      type: `${userSlice.name}/genericThunk/pending`
    });
    expect(pending.loading).toBe(true);
    expect(pending.error).toBeNull();
  });

  it('проверка rejected', () => {
    const rejectedFetch = userSlice.reducer(undefined, {
      type: `${userSlice.name}/fetchApiUser/rejected`,
      error: { message: 'fail' }
    });
    expect(rejectedFetch.loading).toBe(false);
    expect(rejectedFetch.error).toBe('fail');
    expect(rejectedFetch.user).toBeNull();
    expect(rejectedFetch.authUserCheck).toBe(true);

    const rejectedLogout = userSlice.reducer(undefined, {
      type: `${userSlice.name}/logoutUser/rejected`,
      error: { message: 'fail' }
    });
    expect(rejectedLogout.user).toBeNull();
    expect(rejectedLogout.authUserCheck).toBe(true);

    const rejectedForgot = userSlice.reducer(undefined, {
      type: `${userSlice.name}/forgotPasswordUser/rejected`,
      error: { message: 'fail' }
    });
    expect(rejectedForgot.passwordForgot).toBe(false);

    const rejectedReset = userSlice.reducer(undefined, {
      type: `${userSlice.name}/resetPasswordUser/rejected`,
      error: { message: 'fail' }
    });
    expect(rejectedReset.passwordReset).toBe(false);
  });

  it('проверка обработки простых редукторов', () => {
    const stateWithUser = userSlice.reducer(
      undefined,
      setUser(mockUser as any)
    );
    expect(stateWithUser.user).toEqual(mockUser);

    const cleared = userSlice.reducer(stateWithUser, clearUser());
    expect(cleared.user).toBeNull();
    expect(cleared.authUserCheck).toBe(false);

    const checked = userSlice.reducer(undefined, setAuthUserChecked());
    expect(checked.authUserCheck).toBe(true);

    const withError = userSlice.reducer(undefined, {
      type: `${userSlice.name}/some/rejected`,
      error: { message: 'fail' }
    });
    const noErr = userSlice.reducer(withError, clearError());
    expect(noErr.error).toBeNull();

    const withFlags = userSlice.reducer(undefined, resetPasswordStatus());
    expect(withFlags.passwordForgot).toBe(false);
    expect(withFlags.passwordReset).toBe(false);
  });
});

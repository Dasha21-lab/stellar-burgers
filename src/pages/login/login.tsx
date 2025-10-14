import { FC, SyntheticEvent, SetStateAction } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { userLoadingSelector } from '../../services/slices/user-slice';
import { userLogin } from '../../services/thunk/user-thunk';
import { TLoginData } from '@api';
import { useForm } from '../../hooks/use-form';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useForm({ email: '', password: '' });

  const email = values.email;
  const password = values.password;

  const setEmail = (value: SetStateAction<string>) =>
    setValues((prev) => ({
      ...prev,
      email:
        typeof value === 'function'
          ? (value as (p: string) => string)(prev.email)
          : value
    }));
  const setPassword = (value: SetStateAction<string>) =>
    setValues((prev) => ({
      ...prev,
      password:
        typeof value === 'function'
          ? (value as (p: string) => string)(prev.password)
          : value
    }));

  const loading = useSelector(userLoadingSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (loading) return;

    const userLoginData: TLoginData = { email, password };

    dispatch(userLogin(userLoginData));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

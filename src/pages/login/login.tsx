import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { userLoadingSelector } from '../../services/slices/user-slice';
import { userLogin } from '../../services/thunk/user-thunk';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(userLoadingSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (loading) return;

    const userLoginData: TLoginData = {
      email: email,
      password: password
    };

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

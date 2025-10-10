import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { userLoadingSelector } from '../../services/slices/user-slice';
import { registerUser } from '../../services/thunk/user-thunk';
import { Preloader } from '@ui';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(userLoadingSelector);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const registerUserData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    dispatch(registerUser(registerUserData));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

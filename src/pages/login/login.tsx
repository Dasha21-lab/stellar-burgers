import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  userDataSelector,
  userErrorSelector,
  userLoadingSelector
} from '../../services/slices/user-slice';
import { userLogin } from '../../services/thunk/user-thunk';
import { TLoginData } from '@api';

// export const Login: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loading = useSelector(userLoadingSelector);
//   const error = useSelector(userErrorSelector);

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     dispatch(userLogin({ email, password }))
//       .unwrap()
//       .then(() => {
//         const from = location.state?.from || { pathname: '/' };
//         navigate(from);
//       })
//       .catch(() => {});
//   };

//   return (
//     <LoginUI
//       errorText=''
//       email={email}
//       setEmail={setEmail}
//       password={password}
//       setPassword={setPassword}
//       handleSubmit={handleSubmit}
//     />
//   );
// };
// отвечает за вход в профиль
export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(userLoadingSelector);
  const error = useSelector(userErrorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

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

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  authUserCheckedSelector,
  userDataSelector,
  userErrorSelector,
  userLoadingSelector
} from '../../services/slices/user-slice';
import { registerUser } from '../../services/thunk/user-thunk';
import { Preloader } from '@ui';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(userDataSelector);
  const authChecked = useSelector(authUserCheckedSelector);
  const loading = useSelector(userLoadingSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // if (!userName || !email || !password) {
    //   return;
    // }

    const registerUserData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    dispatch(registerUser(registerUserData));
  };

  // if (loading) {
  //   return <Preloader />;
  // };

  // useEffect(() => {
  //   if (user && authChecked) {
  //     // Перенаправляем на страницу профиля
  //     navigate('/profile');
  //   }
  // }, [user, authChecked, navigate]);

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

// export const Register: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [userName, setUserName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loading = useSelector(userLoadingSelector);
//   const error = useSelector(userErrorSelector);

//   const handleSubmit = (e: SyntheticEvent) => {
//     e.preventDefault();

//     dispatch(registerUser({ name: userName, email, password }))
//       .unwrap()
//       .then(() => {
//         navigate('/');
//       })
//       .catch(() => { });
//   };

//   if (loading) {
//     return <Preloader />;
//   }

//   return (
//     <RegisterUI
//       errorText=''
//       email={email}
//       userName={userName}
//       password={password}
//       setEmail={setEmail}
//       setPassword={setPassword}
//       setUserName={setUserName}
//       handleSubmit={handleSubmit}
//     />
//   );
// };

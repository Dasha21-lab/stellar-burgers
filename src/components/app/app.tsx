import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import store, { useDispatch, useSelector } from '../../services/store';
import { Provider } from 'react-redux';
import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../services/thunk/ingredients-thunk';
import { fetchApiUser } from '../../services/thunk/user-thunk';
import { ingredientsSelector } from '../../services/slices/ingredients-slice';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <div className={styles.app}>
        <AppHeader />
        <RouteComponent />
      </div>
    </Provider>
  </BrowserRouter>
);

const RouteComponent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const background = location.state?.background;
 
 const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Загружаем ингредиенты
    dispatch(fetchIngredients());

    // Проверяем аутентификацию пользователя
    dispatch(fetchApiUser())
      .unwrap()
      .catch((error) => {
        // Ошибка уже обработана в slice, просто логируем если нужно
        console.log('Auth check failed:', error);
      });
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchIngredients());
  // }, [dispatch]);

  //   useEffect(() => {
  //   dispatch(fetchApiUser())
  //     .unwrap()
  //     .catch((error) => {
  //       // Ошибка уже обработана в slice, просто логируем если нужно
  //       console.log('Auth check failed:', error);
  //     });
  // }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute publicRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute publicRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute publicRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute publicRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        {/* <Route path='/feed/:number' element={<OrderInfo />} /> */}
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
        {/* <Route path='/ingredients/:id' element={<IngredientDetails />} /> */}
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        {/* <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        /> */}
         <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_digits-default ${styles.detailHeader}`}
                >
                  #{orderNumber && orderNumber.padStart(6, '0')}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={handleModalClose}>
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;

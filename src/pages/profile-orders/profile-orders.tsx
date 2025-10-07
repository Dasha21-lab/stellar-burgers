import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  orderLoadingSelector,
  userOrdersSelector
} from '../../services/slices/orders-feed-slice';
import { useDispatch, useSelector } from '../../services/store';
import { userOrders } from '../../services/thunk/orders-feed-thunk';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(orderLoadingSelector);

  const orders: TOrder[] = useSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  // if (loading) {
  //   return <Preloader />
  // }

  return <ProfileOrdersUI orders={orders} />;
};

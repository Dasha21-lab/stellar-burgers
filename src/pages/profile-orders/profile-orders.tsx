import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useRef } from 'react';
import {
  orderLoadingSelector,
  userOrdersSelector
} from '../../services/slices/orders-feed-slice';
import { useDispatch, useSelector } from '../../services/store';
import { userOrders } from '../../services/thunk/orders-feed-thunk';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(userOrdersSelector);
  const loading = useSelector(orderLoadingSelector);

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    dispatch(userOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};

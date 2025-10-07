import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  feedOrdersSelector,
  orderErrorSelector,
  orderLoadingSelector
} from '../../services/slices/orders-feed-slice';
import { fetchFeeds } from '../../services/thunk/orders-feed-thunk';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(feedOrdersSelector);
  const loading = useSelector(orderLoadingSelector);
  const error = useSelector(orderErrorSelector);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length && loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

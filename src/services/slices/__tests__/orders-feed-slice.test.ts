import {
  ordersFeedSlice,
  resetOrderDetails,
  clearError
} from '../orders-feed-slice';
import {
  fetchFeeds,
  fetchOrderByNumber,
  userOrders
} from '../../thunk/orders-feed-thunk';
import { TOrdersData } from '@utils-types';

const mockFeeds: TOrdersData = {
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940'
      ],
      status: 'done',
      name: 'Бургер-1',
      createdAt: '2025-10-16T14:13:50.949Z',
      updatedAt: '2025-10-16T14:13:52.210Z',
      number: 3
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f'
      ],
      status: 'done',
      name: 'Бургер-2',
      createdAt: '2025-10-16T13:17:53.749Z',
      updatedAt: '2025-10-16T13:17:54.805Z',
      number: 4
    }
  ],
  total: 2,
  totalToday: 2
};

describe('ordersFeedSlice', () => {
  it('проверка fetchFeeds pending/fulfilled/rejected', () => {
    const pending = ordersFeedSlice.reducer(undefined, {
      type: fetchFeeds.pending.type
    });
    expect(pending.loading).toBe(true);
    expect(pending.error).toBeNull();

    const payload = mockFeeds as any;
    const fulfilled = ordersFeedSlice.reducer(pending, {
      type: fetchFeeds.fulfilled.type,
      payload
    });
    expect(fulfilled.loading).toBe(false);
    expect(fulfilled.feedOrders).toEqual(mockFeeds.orders);
    expect(fulfilled.total).toBe(2);
    expect(fulfilled.totalToday).toBe(2);

    const error = { payload: 'fail' } as any;
    const rejected = ordersFeedSlice.reducer(undefined, {
      type: fetchFeeds.rejected.type,
      ...error
    });
    expect(rejected.loading).toBe(false);
    expect(rejected.error).toBe('fail');
  });

  it('проверка userOrders pending/fulfilled/rejected', () => {
    const pending = ordersFeedSlice.reducer(undefined, {
      type: userOrders.pending.type
    });
    expect(pending.loading).toBe(true);

    const fulfilled = ordersFeedSlice.reducer(pending, {
      type: userOrders.fulfilled.type,
      payload: mockFeeds.orders
    });
    expect(fulfilled.loading).toBe(false);
    expect(fulfilled.userOrders).toEqual(mockFeeds.orders);

    const rejected = ordersFeedSlice.reducer(undefined, {
      type: userOrders.rejected.type,
      payload: 'fail'
    } as any);
    expect(rejected.loading).toBe(false);
    expect(rejected.error).toBe('fail');
  });

  it('проверка fetchOrderByNumber pending/fulfilled/rejected', () => {
    const pending = ordersFeedSlice.reducer(undefined, {
      type: fetchOrderByNumber.pending.type
    });
    expect(pending.loading).toBe(true);
    expect(pending.orderDetails).toBeNull();

    const fulfilledPayload = { orders: mockFeeds.orders } as any;
    const fulfilled = ordersFeedSlice.reducer(pending, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: fulfilledPayload
    });
    expect(fulfilled.loading).toBe(false);
    expect(fulfilled.orderDetails).toEqual(mockFeeds.orders[0]);

    const rejected = ordersFeedSlice.reducer(undefined, {
      type: fetchOrderByNumber.rejected.type,
      payload: 'fail'
    } as any);
    expect(rejected.loading).toBe(false);
    expect(rejected.orderDetails).toBeNull();
    expect(rejected.error).toBe('fail');
  });

  it('проверка resetOrderDetails и clearError', () => {
    const withDetails = ordersFeedSlice.reducer(undefined, {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [{ number: 1 }] }
    } as any);
    const reset = ordersFeedSlice.reducer(withDetails, resetOrderDetails());
    expect(reset.orderDetails).toBeNull();

    const withError = ordersFeedSlice.reducer(undefined, {
      type: fetchFeeds.rejected.type,
      payload: 'fail'
    } as any);
    const noError = ordersFeedSlice.reducer(withError, clearError());
    expect(noError.error).toBeNull();
  });
});

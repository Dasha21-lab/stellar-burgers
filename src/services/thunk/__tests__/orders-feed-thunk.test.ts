import { TOrdersData } from '@utils-types';
import {
  fetchFeeds,
  fetchOrderByNumber,
  userOrders
} from '../orders-feed-thunk';
import * as api from '@api';

jest.mock('@api');

const mockFeedsData: TOrdersData = {
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

describe('orders-feed-thunk', () => {
  it('успешно загружает ленту заказов', async () => {
    const feeds = mockFeedsData as any;
    (api.getFeedsApi as jest.Mock).mockResolvedValueOnce(feeds);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await fetchFeeds()(dispatch, getState, undefined);

    expect(api.getFeedsApi).toHaveBeenCalledTimes(1);
    expect(action.type).toBe(fetchFeeds.fulfilled.type);
    expect(action.payload).toEqual(feeds);
  });

  it('возвращает данные заказа по номеру, если заказ существует', async () => {
    const orderResponse = { orders: mockFeedsData.orders } as any;
    (api.getOrderByNumberApi as jest.Mock).mockResolvedValueOnce(orderResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await fetchOrderByNumber(123)(dispatch, getState, undefined);

    expect(api.getOrderByNumberApi).toHaveBeenCalledWith(123);
    expect(action.type).toBe(fetchOrderByNumber.fulfilled.type);
    expect(action.payload).toEqual(orderResponse);
  });

  it('отклоняет запрос, если список заказов пуст', async () => {
    const data = { orders: [] } as any;
    (api.getOrderByNumberApi as jest.Mock).mockResolvedValueOnce(data);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await fetchOrderByNumber(123)(dispatch, getState, undefined);

    expect(action.type).toBe(fetchOrderByNumber.rejected.type);
    expect(action.payload).toBe('Заказ не найден');
  });

  it('успешно загружает заказы пользователя', async () => {
    const userOrdersResponse = mockFeedsData.orders as any;
    (api.getOrdersApi as jest.Mock).mockResolvedValueOnce(userOrdersResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await userOrders()(dispatch, getState, undefined);

    expect(api.getOrdersApi).toHaveBeenCalledTimes(1);
    expect(action.type).toBe(userOrders.fulfilled.type);
    expect(action.payload).toEqual(userOrdersResponse);
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  `${FEED_SLICE_NAME}/feedsOrder`,
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  `${FEED_SLICE_NAME}/orderByNumber`,
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      if (!response.orders.length) {
        return rejectWithValue('Заказ не найден');
      }
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка потока данных');
    }
  }
);

export const userOrders = createAsyncThunk(
  `${FEED_SLICE_NAME}/userOrders`,
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

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
    } catch (error: any) {
      return rejectWithValue(error.message || 'Не удалось загрузить заказ');
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
// export const feedOrders = createAsyncThunk(
//   `${FEED_SLICE_NAME}/feedsOrder`,
//   async () => {
//     const response = await getFeedsApi();
//     return response;
//   }
// );

// export const feedOrders = createAsyncThunk(
//   `${FEED_SLICE_NAME}/feedsOrder`,
//   async () => {
//     console.log('feedOrders thunk started');
//     try {
//       const result = await getFeedsApi();
//       console.log('feedOrders thunk success:', result);
//       return result;
//     } catch (error) {
//       console.log('feedOrders thunk error:', error);
//       throw error;
//     }
//   }
// );

// export const feedOrders = createAsyncThunk(`${FEED_SLICE_NAME}/feedsOrder`, getFeedsApi);
// export const orderByNumber = createAsyncThunk(
//   'order/get',
//   async (number: number) => getOrderByNumberApi(number)
// );

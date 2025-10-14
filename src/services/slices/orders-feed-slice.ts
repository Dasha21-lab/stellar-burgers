import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FEED_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import {
  fetchFeeds,
  fetchOrderByNumber,
  userOrders
} from '../thunk/orders-feed-thunk';
import { TOrder, TOrdersData } from '@utils-types';

export interface IOrdersFeedState {
  feedOrders: TOrder[];
  userOrders: TOrder[];
  totalToday: number;
  total: number;
  orderDetails: TOrder | null;
  loading: boolean;
  error: null | string;
}

const initialState: IOrdersFeedState = {
  feedOrders: [],
  userOrders: [],
  totalToday: 0,
  total: 0,
  orderDetails: null,
  loading: false,
  error: null
};

export const ordersFeedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(userOrders.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки заказов пользователя';
      })
      .addCase(userOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDetails = action.payload.orders[0];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDetails = null;
        state.loading = false;
        state.error = (action.payload as string) || 'Ошибка поиска заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDetails = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feedOrders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки ленты заказов';
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
  selectors: {
    feedOrdersSelector: (state) => state.feedOrders,
    userOrdersSelector: (state) => state.userOrders,
    totalTodaySelector: (state) => state.totalToday,
    totalSelector: (state) => state.total,
    orderDetailsSelector: (state) => state.orderDetails,
    orderLoadingSelector: (state) => state.loading,
    orderErrorSelector: (state) => state.error
  }
});

export const { resetOrderDetails, clearError } = ordersFeedSlice.actions;

export const {
  feedOrdersSelector,
  userOrdersSelector,
  totalTodaySelector,
  totalSelector,
  orderDetailsSelector,
  orderLoadingSelector,
  orderErrorSelector
} = ordersFeedSlice.selectors;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { createOrder } from '../thunk/create-order-thunk';

export interface ICreateOrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: null | string | undefined;
}

const initialState: ICreateOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const createOrderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    // закрывает модалку заказа (очищает orderModalData)
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    },

    // полностью сбрасывает состояние к начальному
    clearOrderState: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    orderModalDataSelector: (state) => state.orderModalData,
    createOrderRequestSelector: (state) => state.orderRequest,
    createOrderErrorSelector: (state) => state.error
  }
});

export const { clearOrderModalData, clearOrderState } =
  createOrderSlice.actions;

export const {
  orderModalDataSelector,
  createOrderRequestSelector,
  createOrderErrorSelector
} = createOrderSlice.selectors;

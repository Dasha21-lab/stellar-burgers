import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';

export const createOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (data: string[]) => await orderBurgerApi(data)
);

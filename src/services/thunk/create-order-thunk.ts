import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { clearConstructor } from '../slices/constructor-burger-slice';

export const createOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/createOrder`,
  async (data: string[], thunkAPI) => {
    const response = await orderBurgerApi(data);
    thunkAPI.dispatch(clearConstructor());

    return response;
  }
);

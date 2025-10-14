import { createAsyncThunk } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  getIngredientsApi
);

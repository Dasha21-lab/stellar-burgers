import { createSlice } from '@reduxjs/toolkit';
import { INGREDIENTS_SLICE_NAME } from '../constants-name-slice/constants-name-slice';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunk/ingredients-thunk';

export interface IIngredientsState {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },

  selectors: {
    ingredientsSelector: (state) => state.ingredients,
    ingredientsLoadingSelector: (state) => state.loading,
    ingredientsErrorSelector: (state) => state.error
  }
});

export const { clearError } = ingredientsSlice.actions;

export const {
  ingredientsSelector,
  ingredientsLoadingSelector,
  ingredientsErrorSelector
} = ingredientsSlice.selectors;

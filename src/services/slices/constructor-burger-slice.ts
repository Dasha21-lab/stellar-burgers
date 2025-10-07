import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BURGER_SLICE_NAME } from '../constants-name-slice/constants-name-slice';

export interface IConstructorBurgerState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
  loading: boolean;
}

const initialState: IConstructorBurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false
};

export const constructorBurgerSlice = createSlice({
  name: BURGER_SLICE_NAME,
  initialState,
  reducers: {
    // Добавление булки
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },

    // Добавление ингредиента
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },

    // Удаление ингредиента
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },

    // Перемещение вверх
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = [...state.constructorItems.ingredients];

      if (index > 0) {
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
        state.constructorItems.ingredients = ingredients;
      }
    },

    // Перемещение вниз
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      if (index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
        state.constructorItems.ingredients = ingredients;
      }
    },

    // Очистка конструктора
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    }
  },
  selectors: {
    constructorItemsSelector: (state) => state.constructorItems,
    constructorLoadingSelector: (state) => state.loading
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorBurgerSlice.actions;

export const { constructorItemsSelector, constructorLoadingSelector } =
  constructorBurgerSlice.selectors;

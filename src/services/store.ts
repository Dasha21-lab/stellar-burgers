import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorBurgerSlice } from './slices/constructor-burger-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { userSlice } from './slices/user-slice';
import { ordersFeedSlice } from './slices/orders-feed-slice';
import { createOrderSlice } from './slices/create-order-slice';

export const rootReducer = combineReducers({
  [constructorBurgerSlice.name]: constructorBurgerSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [createOrderSlice.name]: createOrderSlice.reducer,
  [ordersFeedSlice.name]: ordersFeedSlice.reducer,
  [userSlice.name]: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

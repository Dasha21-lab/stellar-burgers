import { rootReducer } from './store';
import { constructorBurgerSlice } from './slices/constructor-burger-slice';
import { ingredientsSlice } from './slices/ingredients-slice';
import { createOrderSlice } from './slices/create-order-slice';
import { ordersFeedSlice } from './slices/orders-feed-slice';
import { userSlice } from './slices/user-slice';

describe('rootReducer', () => {
  it('rootReducer должен возвращать корректное начальное состояние', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);

    expect(state).toEqual({
      [constructorBurgerSlice.name]: constructorBurgerSlice.reducer(
        undefined,
        initAction
      ),
      [ingredientsSlice.name]: ingredientsSlice.reducer(undefined, initAction),
      [createOrderSlice.name]: createOrderSlice.reducer(undefined, initAction),
      [ordersFeedSlice.name]: ordersFeedSlice.reducer(undefined, initAction),
      [userSlice.name]: userSlice.reducer(undefined, initAction)
    });
  });
});

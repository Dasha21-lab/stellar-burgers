import { TConstructorIngredient } from '@utils-types';
import { ingredientsSlice } from '../ingredients-slice';
import { fetchIngredients } from '../../thunk/ingredients-thunk';

const baseIngredient: TConstructorIngredient = {
  id: 'ing-1',
  _id: 'ing-1',
  name: 'Начинка test',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

describe('ingredientsSlice', () => {
  it('fetchIngredients.pending', () => {
    const state = ingredientsSlice.reducer(undefined, {
      type: fetchIngredients.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled', () => {
    const payload = [baseIngredient];
    const state = ingredientsSlice.reducer(undefined, {
      type: fetchIngredients.fulfilled.type,
      payload
    });
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  it('fetchIngredients.rejected', () => {
    const error = { message: 'fail' } as any;
    const state = ingredientsSlice.reducer(undefined, {
      type: fetchIngredients.rejected.type,
      error
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe('fail');
  });
});

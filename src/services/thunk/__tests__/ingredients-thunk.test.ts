import { TConstructorIngredient } from '@utils-types';
import { fetchIngredients } from '../ingredients-thunk';
import * as api from '@api';

jest.mock('@api');

const mockIngredientItem: TConstructorIngredient = {
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

describe('ingredients-thunk', () => {
  it('возвращает список ингредиентов при успешном запросе', async () => {
    const ingredients = [mockIngredientItem];
    (api.getIngredientsApi as jest.Mock).mockResolvedValueOnce(ingredients);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await fetchIngredients()(dispatch, getState, undefined);

    expect(api.getIngredientsApi).toHaveBeenCalledTimes(1);
    expect(action.type).toBe(fetchIngredients.fulfilled.type);
    expect(action.payload).toEqual(ingredients);
  });
});

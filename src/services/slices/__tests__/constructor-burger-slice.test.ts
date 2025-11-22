import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addBun,
  addIngredient,
  constructorBurgerSlice,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  clearConstructor
} from '../constructor-burger-slice';

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

const baseIngredient2: TConstructorIngredient = {
  id: 'ing-2',
  _id: 'ing-2',
  name: 'Булка test',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const baseIngredient3: TConstructorIngredient = {
  id: 'ing-3',
  _id: 'ing-3',
  name: 'Соус test',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

const ingredientMain: TIngredient = (({ id, ...rest }) => rest)(baseIngredient);
const ingredientBun: TIngredient = (({ id, ...rest }) => rest)(baseIngredient2);
const ingredientSauce: TIngredient = (({ id, ...rest }) => rest)(
  baseIngredient3
);

describe('constructorBurgerSlice', () => {
  it('проверка добавления и удаление ингредиентов', () => {
    const withAdded = constructorBurgerSlice.reducer(
      undefined,
      addIngredient(ingredientMain)
    );
    expect(withAdded.constructorItems.ingredients).toHaveLength(1);

    const id = withAdded.constructorItems.ingredients[0].id;
    const removed = constructorBurgerSlice.reducer(
      withAdded,
      removeIngredient(id)
    );
    expect(removed.constructorItems.ingredients).toHaveLength(0);
  });

  it('проверка порядка ингредиентов - перемещение вверх/вниз', () => {
    const stateAfterFirst = constructorBurgerSlice.reducer(
      undefined,
      addIngredient(ingredientMain)
    );
    const stateAfterSecond = constructorBurgerSlice.reducer(
      stateAfterFirst,
      addIngredient(ingredientSauce)
    );
    const first = stateAfterSecond.constructorItems.ingredients[0].id;
    const second = stateAfterSecond.constructorItems.ingredients[1].id;

    const movedDown = constructorBurgerSlice.reducer(
      stateAfterSecond,
      moveIngredientDown(0)
    );
    expect(movedDown.constructorItems.ingredients[1].id).toBe(first);

    const movedUp = constructorBurgerSlice.reducer(
      movedDown,
      moveIngredientUp(1)
    );
    expect(movedUp.constructorItems.ingredients[0].id).toBe(first);
    expect(movedUp.constructorItems.ingredients[1].id).toBe(second);
  });

  it('проверка добавление булки и очищение конструктора', () => {
    const withBun = constructorBurgerSlice.reducer(
      undefined,
      addBun(ingredientBun)
    );
    expect(withBun.constructorItems.bun).not.toBeNull();

    const cleared = constructorBurgerSlice.reducer(withBun, clearConstructor());
    expect(cleared.constructorItems.bun).toBeNull();
    expect(cleared.constructorItems.ingredients).toHaveLength(0);
  });
});

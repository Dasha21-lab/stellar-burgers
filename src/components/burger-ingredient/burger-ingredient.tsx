import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import {
  addBun,
  addIngredient
} from '../../services/slices/constructor-burger-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    // const handleAdd = () => {
    //   if (ingredient.type === 'bun') {
    //     dispatch(addBun(ingredient));
    //   } else {
    //     dispatch(addIngredient(ingredient));
    //   }
    //   // dispatch(addIngredient(ingredient));
    // }; // Пока пустая функция (заглушка)

    const handleAdd = () => {
      const action =
        ingredient.type === 'bun'
          ? addBun(ingredient)
          : addIngredient(ingredient);

      dispatch(action);
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../services/slices/constructor-burger-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    // const handleMoveDown = () => {
    //   dispatch(moveIngredientDown(index));
    // };

    // const handleMoveUp = () => {
    //   dispatch(moveIngredientUp(index));
    // };

    // const handleClose = () => {
    //   dispatch(removeIngredient(ingredient._id));
    // };

    const handleMoveDown = useCallback(() => {
      dispatch(moveIngredientDown(index));
    }, [dispatch, index]);

    const handleMoveUp = useCallback(() => {
      dispatch(moveIngredientUp(index));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);

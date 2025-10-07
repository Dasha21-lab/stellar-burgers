import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  constructorItemsSelector
} from '../../services/slices/constructor-burger-slice';
import {
  orderModalDataSelector,
  createOrderRequestSelector,
  clearOrderModalData,
  createOrderErrorSelector
} from '../../services/slices/create-order-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/thunk/create-order-thunk';
import { authUserCheckedSelector } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(constructorItemsSelector);
  const orderRequest = useSelector(createOrderRequestSelector);
  const orderModalData = useSelector(orderModalDataSelector);
  const orderError = useSelector(createOrderErrorSelector);
  const isAuthChecked = useSelector(authUserCheckedSelector);

  useEffect(() => {
    if (orderError) {
      console.error('Order error:', orderError);
    }
  }, [orderError]);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      createOrder([
        constructorItems.bun?._id,
        ...constructorItems.ingredients.map(
          (ingredient: TConstructorIngredient) => ingredient._id
        ),
        constructorItems.bun?._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

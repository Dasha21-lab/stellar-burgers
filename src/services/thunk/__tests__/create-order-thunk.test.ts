import { createOrder } from '../create-order-thunk';
import * as api from '@api';
import { clearConstructor } from '../../slices/constructor-burger-slice';

jest.mock('@api');

const mockOrderData = {
  number: 43214
};

describe('create-order-thunk', () => {
  it('отправляет clearConstructor и возвращает данные заказа в случае успеха', async () => {
    const apiResponse = mockOrderData as any;
    (api.orderBurgerApi as jest.Mock).mockResolvedValueOnce(apiResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const action = await createOrder(['id1', 'id2'])(
      dispatch,
      getState,
      undefined
    );

    expect(api.orderBurgerApi).toHaveBeenCalledWith(['id1', 'id2']);
    expect(dispatch).toHaveBeenCalledWith(clearConstructor());
    expect(action.type).toBe(createOrder.fulfilled.type);
    expect(action.payload).toEqual(apiResponse);
  });
});

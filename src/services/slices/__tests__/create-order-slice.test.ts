import {
  clearOrderModalData,
  createOrderSlice,
  clearOrderState
} from '../create-order-slice';
import { createOrder } from '../../thunk/create-order-thunk';

const mockOrder = {
  number: 43214
};

describe('createOrderSlice', () => {
  it('createOrder.pending', () => {
    const state = createOrderSlice.reducer(undefined, {
      type: createOrder.pending.type
    });
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled', () => {
    const payload = { order: mockOrder } as const;
    const state = createOrderSlice.reducer(undefined, {
      type: createOrder.fulfilled.type,
      payload
    });
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('createOrder.rejected', () => {
    const error = { message: 'fail' } as any;
    const state = createOrderSlice.reducer(undefined, {
      type: createOrder.rejected.type,
      error
    });
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('fail');
  });

  it('проверка очистки заказа', () => {
    const withData = createOrderSlice.reducer(undefined, {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    });
    const cleared = createOrderSlice.reducer(withData, clearOrderModalData());
    expect(cleared.orderModalData).toBeNull();
  });

  it('проверка сброса начального состояния', () => {
    const withData = createOrderSlice.reducer(undefined, {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    });
    const reset = createOrderSlice.reducer(withData, clearOrderState());
    expect(reset.orderModalData).toBeNull();
    expect(reset.orderRequest).toBe(false);
    expect(reset.error).toBeNull();
  });
});

import { historyReducer, initialState } from './history.reducer';

describe('ClearHistory Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = historyReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

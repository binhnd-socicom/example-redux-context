import {
  IAction,
} from '../helpers';
export interface ICounterState {
  counter: number;
  error: string;
}

const initateState: ICounterState = {
  counter: 0,
  error: '',
}

const reducer = (state: ICounterState, action: IAction<number | Error>) => {
  const { counter } = state;
  const { type, payload } = action;
  switch (type) {
    case 'INCREMENT':
      return {counter: counter + 1};
    case 'INCREMENT_IF_ODD':
      return {counter: (counter % 2 !== 0) ? counter + 1 : counter};
    case 'DECREMENT':
      return {counter: counter - 1};
    case 'DECREMENT_ERROR':
      if (payload && typeof payload === 'object') {
        return { counter, error: payload.message };
      }
    case 'INCREMENT_ASYNC':
      return state;
    default:
      return state;
  }
}

export {
  initateState,
  reducer,
}

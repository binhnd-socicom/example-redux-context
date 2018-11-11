import actionCreator from './actionCreator';
import combineReducer from './combineReducer';
import connectProvider from './connectProvider';
import createProvider from './createProvider';

export interface IAction<P = any> {
  type: string;
  payload?: P;
}

export {
  actionCreator,
  combineReducer,
  connectProvider,
  createProvider,
}

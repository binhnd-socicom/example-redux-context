import {
  combineReducer,
  createProvider,
} from '../helpers';

import {
  ICounterState,
  initateState as counterInitiateState,
  reducer as counterReducer,
} from './counterReducer';

import {
  ILangState,
  initateState as langInitiateState,
  reducer as langReducer,
} from './langReducer';

export interface IState {
  counterState: ICounterState;
  langState: ILangState;
};

const initiateState: IState = {
  counterState: counterInitiateState,
  langState: langInitiateState,
};

const reducer = combineReducer<IState>({
  counterState: counterReducer,
  langState: langReducer,
});

const Store = createProvider<IState>(initiateState, reducer);
export default Store;

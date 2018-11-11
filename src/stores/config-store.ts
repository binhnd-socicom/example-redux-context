import {
  combineReducer,
  createProvider,
} from 'src/_helpers';

import { ICounterState, initateState as counterInitiateState, reducer as counterReducer } from './counterReducer';
import { ILangState, initateState as langInitiateState, reducer as langReducer } from './langReducer';

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

export default createProvider<IState>(initiateState, reducer);

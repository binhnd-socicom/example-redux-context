import {
  IAction,
} from '../helpers';

export interface ILangState {
  lang: string;
}

const initateState: ILangState = {
  lang: 'en',
}

const reducer = (state: ILangState, action: IAction<any>) => {
  switch (action.type) {
    case 'CHANGE_LANGUAGE':
      return {lang: action.payload};
    default:
      return state;
  }
}

export {
  initateState,
  reducer,
}

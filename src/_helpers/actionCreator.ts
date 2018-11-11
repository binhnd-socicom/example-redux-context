import {
  IAction,
} from './'

export default function createAction<S = {}>(type: string, payload?: S): IAction<S> {
  return {type, payload};
}

export default function combineReducers<S>(reducers: object) {
  const reducerKeys = Object.keys(reducers)
  const finalReducers = {}
  for (const key of reducerKeys) {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  return function combination(state: S, action: any) {
    let hasChanged = false;
    const nextState = {};
    for (const key of finalReducerKeys) {
      if (typeof finalReducers[key] === 'function') {
        const reducer = finalReducers[key];
        const previousStateForKey = state[key]
        const nextStateForKey = reducer(previousStateForKey, action)
        nextState[key] = nextStateForKey !== previousStateForKey ? Object.assign({}, previousStateForKey, nextStateForKey) : previousStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey
      }
    }
    return hasChanged ? Object.assign({}, state, nextState) : state;
  }
}

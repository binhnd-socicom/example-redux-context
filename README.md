## POW version of React.Context for redux's fans!
Working greate with **redux-thunk**

### How to run
```
yarn
yarn start
```

### How it works

#### 1. Provider

Using Context.Provider (equivalent to react-redux provider) to provide global state

```
export default function createProvider<S>(initateState: S, reducer: (state: S, action: IAction<any>) => S) {
  ...
  return {
    Consumer: CustomContext.Consumer,
    Context: CustomContext,
    Provider: CustomProvider,
    connect,
  };
}

import Store from './stores/config-store';

ReactDOM.render(
  <Store.Provider>
    <App label={'App label'} />
  </Store.Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
```

#### 2. Actions and Reducers

No need to modify anythings. Just replace redux's combineReducers by a new one. It's actually a basic version of redux's implementation.

```
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

```

#### 3. connect(mapStateToProps, mapDispatchToProps)(Component)

Connect Context.Consumer to Component. Replacing `connect` to a new version created along with Provider in step1 above will be fine.
```
function connect<MapProps, MapDispatch>(mapStateToProps?: (state: S) => MapProps, mapDispatchToProps?: (dispatch: Dispatch) => MapDispatch){
    return (Component: typeof React.Component) => (props: any) => {
      return (
        <CustomContext.Consumer>
          {state => {
            const mappedProps = Object.assign({}, props, mapStateToProps ? mapStateToProps(state.value) : {}, mapDispatchToProps ? mapDispatchToProps(state.dispatch) : {});
            return (
              <Component
                {...mappedProps}
              />
            );
          }}
        </CustomContext.Consumer>
      );
    }
  }
```

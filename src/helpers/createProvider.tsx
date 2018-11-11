import * as React from 'react';

import {
  IAction,
} from './';

export type Dispatch = (action: IAction<any>) => void;
export interface IState<S> {
  value: S;
  dispatch: Dispatch;
}

const isPromise = (val: any) => val && typeof val.then === 'function';

export default function createProvider<S>(initateState: S, reducer: (state: S, action: IAction<any>) => S) {

  const CustomContext: React.Context<IState<S>> = React.createContext({ value: initateState, dispatch: () => initateState });

  class CustomProvider extends React.Component<{}, IState<S>> {

    constructor(props: {}) {
      super(props);
      this.state = {
        dispatch: this.dispatch,
        value: initateState,
      };
    }
  
    public dispatch = async (action: IAction) => {
      const { type, payload } = action;
      if (isPromise(payload)) {
        try {
          const res = await Promise.resolve(payload);
          this.dispatch({type, payload: res});
        } catch (err) {
          this.dispatch({type: `${type}_ERROR`, payload: err});
        }
      } else {
        const nextValue = reducer(this.state.value, action);
        this.setState({value: nextValue});
      }
    }
  
    public render() {
      return (
        <CustomContext.Provider value={this.state}>
          {this.props.children}
        </CustomContext.Provider>
      );
    }
  }

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

  return {
    Consumer: CustomContext.Consumer,
    Context: CustomContext,
    Provider: CustomProvider,
    connect,
  };
}

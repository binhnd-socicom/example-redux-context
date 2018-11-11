import * as React from 'react';
import {
  Dispatch,
  IState,
} from './createProvider';

function connect<S, MapProps, MapDispatch>(mapStateToProps?: (state: S) => MapProps, mapDispatchToProps?: (dispatch: Dispatch) => MapDispatch){
  return (Context: React.Context<IState<S>>) => {
    return (Component: typeof React.Component) => (props: any) => {
      return (
        <Context.Consumer>
          {state => {
            const mappedProps = Object.assign({}, props, mapStateToProps ? mapStateToProps(state.value) : {}, mapDispatchToProps ? mapDispatchToProps(state.dispatch) : {});
            return (
              <Component
                {...mappedProps}
              />
            );
          }}
        </Context.Consumer>
      );
    }
  }
}

export default connect;

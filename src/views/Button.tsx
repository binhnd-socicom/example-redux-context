import * as React from 'react';

import Store from 'src/stores/config-store';

import * as CounterActions from 'src/actions/counter-actions';

interface IOwnProps {
  onClick(): void;
}
interface IDispProps {
  reset(): void;
}

class Button extends React.Component<IOwnProps & IDispProps, any> {
  public reset() {
    this.props.reset();
  }

  public render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>
  }
}

const WrapperButton = Store.connect(undefined, (dispatch) => ({
  reset: () => dispatch(CounterActions.resetCounter),
}))(Button);

export default WrapperButton;

// tslint:disable:jsx-no-lambda

import * as React from 'react';
import './App.css';

import { Dispatch } from 'src/_helpers/createProvider';
import * as CounterActions from 'src/actions/counter-actions';
import Store, { IState } from 'src/stores/config-store';
import RefButton from './Button';

interface IOwnProps {
  label: string;
}

interface IProps {
  counter: number;
  lang: string;
  error: string;
}

interface IDispProps {
  addCounter: () => void;
  subCounter: () => void;
  resetCounter: () => void;
  subAsync: (promise: Promise<number>) => void;
  changeLanguage: (lang: string) => void;
}

class App extends React.Component<IOwnProps & IProps & IDispProps> {
  private refButton: any;

  public onRef = (ref: any) => {
    this.refButton = ref;
  }
  public onReset = () => {
    this.refButton.reset();
  }
  public render() {
    const { label, counter, lang, error, addCounter, resetCounter, subAsync, subCounter, changeLanguage } = this.props;
    return (
      <div className="App">
        <>
          <p>{`Own props: ${label}`}</p>
          <div>{`Counter: ${counter}`}</div>
          <div>{`Language: ${lang}`}</div>
          <div>{`Error: ${error}`}</div>
        </>
        <div>
          <button onClick={addCounter}>Add</button>
          <button onClick={subCounter}>Sub</button>
          <button onClick={resetCounter}>Reset</button>
          <button onClick={() => subAsync(this.subPromise(10, 1000))}>Sub Async</button>
          <button onClick={() => subAsync(this.subPromise(10, 1000, 'error occur'))}>Sub Error</button>
        </div>
        <div>
          <button onClick={() => changeLanguage('JA')}>Change Lang to Ja</button>
          <button onClick={() => changeLanguage('EN')}>Change Lang to EN</button>
        </div>
        <div>
          <RefButton ref={this.onRef} onClick={this.onReset}>Forward Ref</RefButton>
        </div>
      </div>
    );
  }

  private subPromise = (counter: number, delay: number, error?: string): Promise<number> => new Promise((done, fail) => {
    setTimeout(() => error ? fail(new Error(error)) : done(counter), delay);
  });
}

const mapStateToProps = (state: IState) => ({
  counter: state.counterState.counter,
  error: state.counterState.error,
  lang: state.langState.lang,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCounter: () => dispatch(CounterActions.addCounter),
  changeLanguage: (lang: string) => dispatch({type: 'CHANGE_LANGUAGE', payload: lang}),
  resetCounter: () => dispatch(CounterActions.resetCounter),
  subAsync: (promise: Promise<number>) => dispatch(CounterActions.subCounterAsync(promise)),
  subCounter: () => dispatch(CounterActions.subCounter),
});

const { connect } = Store;

export default connect<IProps, IDispProps>(mapStateToProps, mapDispatchToProps)(App);

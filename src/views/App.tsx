// tslint:disable:jsx-no-lambda

import * as React from 'react';
import './App.css';

import * as CounterActions from '../actions/counter-actions';
import Store, { IState } from '../stores/config-store';

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
  subAsync: (promise: Promise<number>) => void;
  changeLanguage: (lang: string) => void;
}

class App extends React.Component<IOwnProps & IProps & IDispProps> {
  public render() {
    const { label, counter, lang, error, addCounter, subAsync, subCounter, changeLanguage } = this.props;
    return (
      <div className="App">
        <p>{`Own props: ${label}`}</p>
        <div>{`Counter: ${counter}`}</div>
        <div>{`Language: ${lang}`}</div>
        <div>{`Error: ${error}`}</div>
        <button onClick={addCounter}>Add</button>
        <button onClick={subCounter}>Sub</button>
        <button onClick={() => subAsync(this.subPromise(10, 1000))}>Sub Async</button>
        <button onClick={() => subAsync(this.subPromise(10, 1000, 'error occur'))}>Sub Error</button>
        <button onClick={() => changeLanguage('JA')}>Change Lang to Ja</button>
        <button onClick={() => changeLanguage('EN')}>Change Lang to EN</button>
      </div>
    );
  }

  private subPromise = (counter: number, delay: number, error?: string): Promise<number> => new Promise((done, fail) => {
    setTimeout(() => error ? fail(new Error(error)) : done(counter), delay);
  });
}

export default Store.connect<IProps, IDispProps>((state: IState) => ({
  counter: state.counterState.counter,
  error: state.counterState.error,
  lang: state.langState.lang,
}), (dispatch) => ({
  addCounter: () => dispatch(CounterActions.addCounter),
  changeLanguage: (lang: string) => dispatch({type: 'CHANGE_LANGUAGE', payload: lang}),
  subAsync: (promise: Promise<number>) => dispatch(CounterActions.subCounterAsync(promise)),
  subCounter: () => dispatch(CounterActions.subCounter),
}))(App);

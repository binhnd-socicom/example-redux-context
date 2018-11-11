import {
  actionCreator,
} from 'src/_helpers';

export const resetCounter = actionCreator('RESET_COUNTER');
export const addCounter = actionCreator('INCREMENT');
export const subCounter = actionCreator('DECREMENT');
export const subCounterAsync = (func: Promise<number>) => actionCreator('DECREMENT', func);

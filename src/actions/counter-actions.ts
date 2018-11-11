import {
  actionCreator,
} from '../helpers';

export const addCounter = actionCreator('INCREMENT');
export const subCounter = actionCreator('DECREMENT');
export const subCounterAsync = (func: Promise<number>) => actionCreator('DECREMENT', func);

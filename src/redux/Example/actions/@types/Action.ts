import { Action as ReduxAction } from 'redux';

type Action<TBody> = TBody & ReduxAction;

export default Action;
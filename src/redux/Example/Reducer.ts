import { combineReducers } from 'redux';
import entities from './reducers/entities';

const reducer = combineReducers({
    entities
});

export default reducer;
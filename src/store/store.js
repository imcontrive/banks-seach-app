import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import banksReducer from '../reducers/index';


const rootReducers = combineReducers({
  banksInfo: banksReducer,
})
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;

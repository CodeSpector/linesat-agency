import {createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import rootReducer from './reducers';

const rootStore = createStore(
    rootReducer,
    applyMiddleware(
       Thunk
    ));
    
window.agencyStore=rootStore;

export default rootStore;
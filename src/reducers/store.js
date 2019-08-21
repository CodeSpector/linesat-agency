import {createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import * as mws from '../middlewares/middlewares';

const rootStore = createStore(
    rootReducer,
    applyMiddleware(
        mws.userWare,
        mws.usersWare,
        mws.customerWare,
        mws.bouquetWare,
        mws.accountWare,
        mws.subscriptionsWare
    ));
    
window.agencyStore=rootStore;

export default rootStore;
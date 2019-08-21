import { SET_CUSTOMERS, SET_BOUQUETS, SET_ACCOUNTS, SET_CURRENT_AGENCY, SET_CONNECTED_USER, SET_REQUIRE_USER_CREDENTIALS, SET_USERS, SET_SUBSCRIPTIONS, SET_GENERAL_MESSAGE, FILTER_SUBSCRIPTIONS } from '../actions/actions-types';
import { ACCOUNT_TYPE_DEFAULT } from '../constants';

import { combineReducers } from 'redux';

const initialMessage={
    text:'',
    type:'info'
}

const initialUser = {
    logged:false,
    requireCredentials:false,
    details:{}
};

const initialAgencyDetails={}

const initialCustomers={
    state:{
        loading:false,
        error:false
    },
    list:[]
}

const initialUsers={
    state:{
        loading:false,
        error:false
    },
    list:[]
}

const initialBouquets={
    state:{
        loading:false,
        error:false
    },
    list:[]
}

const initialSubs={
    state:{
        loading:false,
        error:false
    },
    filter:'NONE',
    list:[]
}

const initialAccounts={
    state:{
        loading:false,
        error:false
    },
    list:[],
}


export function messageReducer(initialState=initialMessage,action={}){
    if(action.type===SET_GENERAL_MESSAGE){
        let type= initialState.type;
        if(action.payload.type && typeof action.payload.type === 'string'){
            type=action.payload.type;
        }
        return {...initialState,text:action.payload.message,type:type};
    }
    else{
        return {...initialState};
    }
}

export function userReducer(initialState=initialUser,action={}){
    let user = {...initialState};
    switch(action.type){
        case SET_CONNECTED_USER :{
            if(action.payload.user['_id']){
                user=Object.assign({},initialState,{logged:true,requireCredentials:false,details:action.payload.user});
            }
            break;
        }

        case SET_REQUIRE_USER_CREDENTIALS:{
            user=Object.assign({},initialState,{logged:false,requireCredentials:true,details:{}});
            break;
        }
    }
    return user;
};

export function agencyReducer(initialState=initialAgencyDetails,action={}){
    switch(action.type){
        case SET_CURRENT_AGENCY :{
            return Object.assign(initialState,action.payload.agency);
        }
        default:{
            return initialState;
        }
    }
}

export function customerReducer(initialState=initialCustomers,action={}){
    console.log(action);
    let newState=Object.assign({},initialState);
    switch(action.type){
        case SET_CUSTOMERS:{
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list;
            break;
        }
        default:{
            break;
        }
    }
    return newState;
};

export function usersReducer(initialState=initialUsers,action={}){
    console.log(action);
    let newState=Object.assign({},initialState);
    switch(action.type){
        case SET_USERS:{
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list;
            break;
        }
        default:{
            break;
        }
    }
    return newState;
};

export function bouquetsReducer(initialState=initialBouquets,action={}){
    console.log(action);
    let newState=Object.assign({},initialState);
    switch(action.type){
        case SET_BOUQUETS:{
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list;
            break;
        }
        default:{
            break;
        }
    }
    return newState;
};

export function accountsReducer(initialState=initialAccounts,action={}){
    console.log(action);
    let newState=Object.assign({},initialState);
    switch(action.type){
        case SET_ACCOUNTS:{
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list.filter((acc,idx)=>{
                return acc.type===ACCOUNT_TYPE_DEFAULT
            });
            break;
        }

        default:{
            break;
        }
    }
    return newState;
};


export function subscriptionsReducer(initialState=initialSubs,action={}){
    console.log(action);
    let newState=Object.assign({},initialState);
    switch(action.type){
        case SET_SUBSCRIPTIONS:{
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list;
            break;
        }
        case FILTER_SUBSCRIPTIONS:{
            newState.filter=action.payload.filter;
            break;
        }
        default:{
            break;
        }
    }
    return newState;
};

export default combineReducers({
    message:messageReducer,
    user:userReducer,
    agency:agencyReducer,
    customers:customerReducer,
    bouquets:bouquetsReducer,
    accounts:accountsReducer,
    users:usersReducer,
    subscriptions:subscriptionsReducer
});
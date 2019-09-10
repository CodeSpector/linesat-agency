import { SET_CUSTOMERS, SET_BOUQUETS, SET_ACCOUNTS, SET_CURRENT_AGENCY, SET_CONNECTED_USER, SET_REQUIRE_USER_CREDENTIALS, SET_USERS, SET_SUBSCRIPTIONS, SET_GENERAL_MESSAGE, FILTER_SUBSCRIPTIONS, SEARCH_BOUQUET, SEARCH_ACCOUNT, SEARCH_USER, SET_AGENCY_ACCOUNT, SET_AGENCY_ACCOUNT_ACTIVITY } from '../actions/actions-types';

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

const agencyAccount={
    state:{
        loading:false,
        error:false,
    },
    detail:{}
}

const agencyAccountActivity = {
    state:{
        loading:false,
        error:false
    },
    list:[]
}

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
    search:{
        term:''
    },
    list:[]
}

const initialBouquets={
    state:{
        loading:false,
        error:false
    },
    search:{
        term:''
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
    search:{
        term:''
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

export function agencyReducer(initialState={},action={}){
    switch(action.type){
        case SET_CURRENT_AGENCY :{
            return Object.assign({},initialState,action.payload.agency);
        }
        default:{
            return initialState;
        }
    }
}

export function agencyAccountReducer(initialState=agencyAccount,action={}){
    switch(action.type){
        case SET_AGENCY_ACCOUNT:{
            return {...initialState,state:{loading:false,error:false},detail:action.payload.account};
        }
        default:{
            return initialState;
        }
    }
}

export function agencyAccountActivityReducer(initialState=agencyAccountActivity,action={}){
    switch(action.type){
        case SET_AGENCY_ACCOUNT_ACTIVITY:{
            return {...initialState,state:{loading:false,error:false},list:action.payload.activities};
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
            console.log(action.payload.list);
            newState.state.loading=false;
            newState.state.error=false;
            newState.list=action.payload.list;
            break;
        }
        case SEARCH_USER:{
            newState.search.term=action.payload.term;
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
            newState.search.term='';
            break;
        }
        case SEARCH_BOUQUET:{
            newState.search={
                term:action.payload.term
            }
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
            newState.list=action.payload.list;
            break;
        }
        case SEARCH_ACCOUNT:{
            newState.search={
                term:action.payload.term
            }
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
    agencyAccount:agencyAccountReducer,
    agencyAccountActivity:agencyAccountActivityReducer,
    customers:customerReducer,
    bouquets:bouquetsReducer,
    accounts:accountsReducer,
    users:usersReducer,
    subscriptions:subscriptionsReducer
});
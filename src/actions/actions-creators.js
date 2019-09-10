
import { SET_CUSTOMERS, SET_BOUQUETS, SET_ACCOUNTS, SET_CONNECTED_USER, SET_CURRENT_AGENCY, SET_REQUIRE_USER_CREDENTIALS, SET_USER, SET_SUBSCRIPTIONS, SET_GENERAL_MESSAGE, FILTER_SUBSCRIPTIONS, SEARCH_BOUQUET, SEARCH_ACCOUNT, SEARCH_SUB, SET_USERS, SEARCH_USER, SET_AGENCY_ACCOUNT, SET_AGENCY_ACCOUNT_ACTIVITY } from './actions-types';

export function searchInBouquets(term=''){
    return {
        type:SEARCH_BOUQUET,
        payload:{
            term:term
        }
    }
}

export function searchInAccounts(term=''){
    return {
        type:SEARCH_ACCOUNT,
        payload:{
            term:term
        }
    }
}

export function searchInSubs(term=''){
    return {
        type:SEARCH_SUB,
        payload:{
            term:term
        }
    }
}

export function searchInUsers(term=''){
    return {
        type:SEARCH_USER,
        payload:{
            term:term
        }
    }
}

export function setGeneralMessage(message='',type=''){
    return {
        type:SET_GENERAL_MESSAGE,
        payload:{
            message:message,
            type:type
        }
    }
}

export function setCurrentUser(user={}){
    return {
        type:SET_CONNECTED_USER,
        payload:{
            user:user
        }
    }
}

export function setAuthRequireUserCredentials(require=true){
    return {
        type:SET_REQUIRE_USER_CREDENTIALS,
        payload:{
            require:require
        }
    }
}

export function setCurrentAgency(agency={}){
    return {
        type:SET_CURRENT_AGENCY,
        payload:{
            agency:agency
        }
    }
}

export function setAgencyAccount(account={}){
    return {
        type: SET_AGENCY_ACCOUNT,
        payload:{
            account:account
        }
    }
}

export function setAgencyAccountActivity(activities=[]){
    return {
        type: SET_AGENCY_ACCOUNT_ACTIVITY,
        payload:{
            activities:activities
        }
    }
}

export function setSubscriptions(subs){
    return {
        type:SET_SUBSCRIPTIONS,
        payload:{
            list:subs
        }
    }
}

export function setCustomersList(list=[]){
    return {
        type:SET_CUSTOMERS,
        payload:{
            list:list
        }
    }
}

export function setUsersList(list=[]){
    return {
        type:SET_USERS,
        payload:{
            list:list
        }
    }
}

export function setBouquetsList(list=[]){
    return {
        type:SET_BOUQUETS,
        payload:{
            list:list
        }
    }
}

export function setAccountsList(list=[]){
    return {
        type:SET_ACCOUNTS,
        payload:{
            list:list
        }
    }
}

export function setSubscriptionFilter(filter=''){
    return {
        type:FILTER_SUBSCRIPTIONS,
        payload:{
            filter:filter
        }
    }
}
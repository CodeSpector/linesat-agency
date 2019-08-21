
import { FETCH_CUSTOMERS, FETCH_BOUQUETS, SET_CUSTOMERS, SET_BOUQUETS, FETCH_ACCOUNTS, SET_ACCOUNTS, TRY_AUTH, SET_CONNECTED_USER, SET_CURRENT_AGENCY, SET_REQUIRE_USER_CREDENTIALS, CREATE_CUSTOMER_ACCOUNT, CUSTOMER_ACCOUNT_CREATED, UNFREEZE_CUSTOMER_ACCOUNT, FREEZE_CUSTOMER_ACCOUNT, DEBIT_CUSTOMER_ACCOUNT, CREDIT_CUSTOMER_ACCOUNT, FETCH_USERS, SET_USERS, CREATE_USER_ACCOUNT, DISCONNECT_USER, USER_DISCONNECTED, FETCH_SUBSCRIPTIONS, SET_SUBSCRIPTIONS, SET_SUBSCRIPTION_ONGOING, SET_SUBSCRIPTION_DONE, SET_SUBSCRIPTION_ABORTED, SET_GENERAL_MESSAGE, CREDIT_USER, DISCREDIT_USER, FILTER_SUBSCRIPTIONS } from './actions-types';

export function setGeneralMessage(message='',type=''){
    return {
        type:SET_GENERAL_MESSAGE,
        payload:{
            message:message,
            type:type
        }
    }
}

export function tryAuth(cred={username:'',password:''}){
    return {
        type:TRY_AUTH,
        payload:{
            credentials:cred
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

export function setSubscriptionOngoing(subID){
    return {
        type:SET_SUBSCRIPTION_ONGOING,
        payload:{
            id:subID
        }
    }
}

export function setSubscriptionDone(subID){
    return {
        type:SET_SUBSCRIPTION_DONE,
        payload:{
            id:subID
        }
    }
}

export function setSubscriptionAborted(subID){
    return {
        type:SET_SUBSCRIPTION_ABORTED,
        payload:{
            id:subID
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

export function fetchUsers(){
    return {
        type:FETCH_USERS
    }
}

export function creditUser(uid){
    return {
        type:CREDIT_USER,
        payload:{
            uid:uid
        }
    }
}

export function discreditUser(uid){
    return {
        type:DISCREDIT_USER,
        payload:{
            uid:uid
        }
    }
}


export function fetchCustomers(){
    return {
        type:FETCH_CUSTOMERS
    }
}

export function fetchSubscriptions(){
    return {
        type:FETCH_SUBSCRIPTIONS
    }
}

export function fetchBouquets(){
    return {
        type:FETCH_BOUQUETS
    }
}

export function fetchAccounts(){
    return {
        type:FETCH_ACCOUNTS
    }
}

export function  debitCustomerAccount({accountId,amount}){
    return {
        type:DEBIT_CUSTOMER_ACCOUNT,
        payload:{
            account:accountId,
            amount:amount
        }
    }
}

export function creditCustomerAccount({accountId,amount}){
    return {
        type:CREDIT_CUSTOMER_ACCOUNT,
        payload:{
            account:accountId,
            amount:amount
        }
    }
}

export function freezeCustomerAccount(accountid){
    return {
        type:FREEZE_CUSTOMER_ACCOUNT,
        payload:{
            account:accountid
        }
    }
}

export function unFreezeCustomerAccount(accountid){
    return {
        type:UNFREEZE_CUSTOMER_ACCOUNT,
        payload:{
            account:accountid
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


export function createCustomerAccount(account={}){
    return {
        type:CREATE_CUSTOMER_ACCOUNT,
        payload:{
            account:account
        }
    }
}

export function createUserAccount(account={}){
    return {
        type:CREATE_USER_ACCOUNT,
        payload:{
            account:account
        }
    }
}

export function customerAccountCreated(){
    return {
        type:CUSTOMER_ACCOUNT_CREATED
    }
}


export function disconnectedUser(){
    return {
        type:DISCONNECT_USER
    }
}

export function dispatchUserDisconnected(){
    return {
        type:USER_DISCONNECTED
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
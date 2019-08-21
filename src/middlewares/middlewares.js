import { FETCH_CUSTOMERS, FETCH_BOUQUETS, FETCH_ACCOUNTS, TRY_AUTH, CREATE_CUSTOMER_ACCOUNT, CUSTOMER_ACCOUNT_CREATED, FREEZE_CUSTOMER_ACCOUNT, UNFREEZE_CUSTOMER_ACCOUNT, DEBIT_CUSTOMER_ACCOUNT, CREDIT_CUSTOMER_ACCOUNT, FETCH_USERS, CREATE_USER_ACCOUNT, FETCH_SUBSCRIPTIONS, SET_SUBSCRIPTION_ONGOING, SET_SUBSCRIPTION_DONE, SET_SUBSCRIPTION_ABORTED, CREDIT_USER, DISCREDIT_USER} from '../actions/actions-types';
import { setCustomersList,setBouquetsList, setAccountsList, setCurrentUser, setCurrentAgency, setAuthRequireUserCredentials, customerAccountCreated, fetchAccounts, setUsersList, fetchUsers, setSubscriptions, fetchSubscriptions, setGeneralMessage } from '../actions/actions-creators';
import { BASE_API_URL, MSG_TYPE } from '../lib/constants';
import StorageProvider from '../lib/tokenProvider';
import PermissionManager from '../lib/PermissionManager';

export const userWare = store => next => action => {
    next(action);
    switch (action.type){
        case TRY_AUTH:{
            let user= store.getState().user;
            if(user.logged){
                break;
            }
            store.dispatch(setGeneralMessage('Authentification en cours...',MSG_TYPE.INFO));
            fetch(
                `${BASE_API_URL}/auth/agency`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify(action.payload.credentials)
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    return [json,StorageProvider.setToken(json.token)];
                }else{
                    throw new Error("Failed to login");
                }
            })
            .then(([json])=>{
                store.dispatch(setCurrentAgency(json.result.agency));
                store.dispatch(setCurrentUser(json.result.user));
                store.dispatch(setGeneralMessage("Authentifié",MSG_TYPE.SUCCESS));
            })
            .catch(
                err=>{
                    store.dispatch(setGeneralMessage("Echec d'authentification",MSG_TYPE.ERROR));
                    store.dispatch(setAuthRequireUserCredentials());
                }
            );
            break;
        } 
    }
}

export const customerWare = store => next => action => {
    next(action);
    switch (action.type){
        case FETCH_CUSTOMERS:{
            fetch(
                `${BASE_API_URL}/customers`,
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(setCustomersList(json.result))
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
        } 
    }
}

export const  usersWare = store => next => action => {
    next(action);
    switch (action.type){
        case FETCH_USERS:{
            fetch(
                `${BASE_API_URL}/agencies/users`,
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(setUsersList(json.result))
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        } 

        case CREATE_USER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/agencies/users`,
                {
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify(action.payload.account)
                },
            )
            .then((response)=>{
                if(response.status===401){
                    store.dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
                }
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchUsers());
                    store.dispatch(setGeneralMessage('Compte créée',MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        } 
        case CREDIT_USER:{
            fetch(
                `${BASE_API_URL}/agencies/user/${action.payload.uid}/credit`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                },
            )
            .then((response)=>{
                if(response.status===401){
                    store.dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
                }
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchUsers());
                    store.dispatch(setGeneralMessage("L'accréditation de l'utilisateur a augmenté",MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        } 
        case DISCREDIT_USER:{
            fetch(
                `${BASE_API_URL}/agencies/user/${action.payload.uid}/discredit`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                },
            )
            .then((response)=>{
                if(response.status===401){
                    store.dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
                }
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchUsers());
                    store.dispatch(setGeneralMessage("L'accréditation de l'utilisateur a diminué",MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        } 
    }
}

export const bouquetWare = store => next => action => {
    next(action);
    console.log(action);
    switch (action.type){
        case FETCH_BOUQUETS:{
            fetch(
                `${BASE_API_URL}/bouquets`,
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(setBouquetsList(json.result))
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        } 
    }
}

export const subscriptionsWare = store => next => action => {
    next(action);
    switch (action.type){
        case FETCH_SUBSCRIPTIONS:{
            fetch(
                `${BASE_API_URL}/subscriptions`,
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(setSubscriptions(json.result))
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });

            break;
        } 

        case SET_SUBSCRIPTION_ONGOING:{
            fetch(
                `${BASE_API_URL}/subscriptions/${action.payload.id}`,
                {
                    method:"OPTIONS",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({
                        option:"ongoing"
                    })
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchSubscriptions());
                    store.dispatch(setGeneralMessage(`Souscription ${action.payload.id} en cours `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }

        case SET_SUBSCRIPTION_ABORTED:{
            fetch(
                `${BASE_API_URL}/subscriptions/${action.payload.id}`,
                {
                    method:"OPTIONS",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({
                        option:"aborted"
                    })
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchSubscriptions());
                    store.dispatch(setGeneralMessage(`Souscription ${action.payload.id} annulée `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }

        case SET_SUBSCRIPTION_DONE:{
            fetch(
                `${BASE_API_URL}/subscriptions/${action.payload.id}`,
                {
                    method:"OPTIONS",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({
                        option:"done"
                    })
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchSubscriptions());
                    store.dispatch(setGeneralMessage(`Souscription ${action.payload.id} effectuée `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }
    }
}

///TODO: work on Agency Ware
/*
export const agencyWare = store => next => action => {
    next(action);
    console.log(action);
    switch (action.type){
        case :{
            fetch(
                '/api/agencies',
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8'
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(setAgenciesList(json.result))
                }
            })
            .catch(err=>console.log(err));
            break;
        } 
        case CREATE_AGENCY:{
            fetch(
                '/api/agencies',
                {
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8'
                    },
                    body:JSON.stringify(action.payload.agency)
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    store.dispatch(fetchAgencies())
                }
            })
            .catch(err=>console.log(err));
            break;
        } 
    }
}
*/

export const accountWare = store => next => action => {
    next(action);
    console.log(action);
    switch (action.type){
        case FETCH_ACCOUNTS:{
            fetch(
                `${BASE_API_URL}/accounts`,
                {
                    method:"GET",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    }
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(setAccountsList(json.result))
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }
        case CREATE_CUSTOMER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/accounts`,
                {
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify(action.payload.account)
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(customerAccountCreated());
                    store.dispatch(setGeneralMessage(`Compte Client Créée`,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }

        case CUSTOMER_ACCOUNT_CREATED:{
            store.dispatch(fetchAccounts())
            break;
        }

        case DEBIT_CUSTOMER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/accounts/${action.payload.account}/debit`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({amount:action.payload.amount})
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(fetchAccounts())
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }

        case CREDIT_CUSTOMER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/accounts/${action.payload.account}/credit`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({amount:action.payload.amount})
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(fetchAccounts());
                    store.dispatch(setGeneralMessage(`Compte ${action.payload.account} credité de ${ action.payload.amount} `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }
        case FREEZE_CUSTOMER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/accounts/${action.payload.account}/freeze`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(fetchAccounts());
                    store.dispatch(setGeneralMessage(`Souscription ${action.payload.account} gelé `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }
        case UNFREEZE_CUSTOMER_ACCOUNT:{
            fetch(
                `${BASE_API_URL}/accounts/${action.payload.account}/unfreeze`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                }
            )
            .then((response)=>{
                return response.json();
            })
            .then((json)=>{
                if(json.success===true){
                    console.log(json);
                    store.dispatch(fetchAccounts());
                    store.dispatch(setGeneralMessage(`Souscription ${action.payload.account} degelé `,MSG_TYPE.SUCCESS));
                }
            })
            .catch(err=>{
                console.log(err);
                store.dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
            });
            break;
        }
    }
}
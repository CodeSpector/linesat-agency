import { BASE_API_URL, MSG_TYPE } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";
import { setSubscriptions, setGeneralMessage } from "./actions-creators";


export function fetchSubs(){
    return dispatch => {
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
                dispatch(setSubscriptions(json.result))
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function markSubscriptionOngoing(sid){
    return (dispatch) =>{
        fetch(
            `${BASE_API_URL}/subscriptions/${sid}`,
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
                dispatch(fetchSubs());
                dispatch(setGeneralMessage(`Souscription ${sid.id} en cours `,MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}

export function markSubscriptionAborted(sid){
    return (dispatch) => {
        fetch(
            `${BASE_API_URL}/subscriptions/${sid}`,
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
                dispatch(fetchSubs());
                dispatch(setGeneralMessage(`Souscription ${sid} annulée `,MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function markSubscriptionDone(sid){
    return (dispatch) => {
        fetch(
            `${BASE_API_URL}/subscriptions/${sid}`,
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
                dispatch(fetchSubs());
                dispatch(setGeneralMessage(`Souscription ${sid} effectuée `,MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}
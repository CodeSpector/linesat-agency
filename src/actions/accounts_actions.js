import { BASE_API_URL, MSG_TYPE } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";
import { setAccountsList, setGeneralMessage } from "./actions-creators";

export function fetchCustomerAccounts(){
    return (dispatch) => {
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
                dispatch(setAccountsList(json.result))
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function createCustomerAccount({customerCode,amount}){
    return (dispatch)  => {
        fetch(
            `${BASE_API_URL}/accounts`,
            {
                method:"PUT",
                headers:{
                    'Content-Type':'application/json;charset=utf-8',
                    'x-access-token':StorageProvider.getToken()
                },
                body:JSON.stringify({customerCode:customerCode,amount:amount})
            }
        )
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            if(json.success===true){
                console.log(json);
                dispatch(fetchCustomerAccounts());
                dispatch(setGeneralMessage(`Compte Client Créée`,MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}



export function creditCustomerAccount({aid,amount,reason}){
    return (dispatch) => {
        fetch(
            `${BASE_API_URL}/accounts/${aid}/credit`,
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json;charset=utf-8',
                    'x-access-token':StorageProvider.getToken()
                },
                body:JSON.stringify({amount:amount,reason:reason})
            }
        )
        .then((response)=>{
            return response.json();
        })
        .then((json)=>{
            if(json.success===true){
                console.log(json);
                dispatch(fetchCustomerAccounts());
                dispatch(setGeneralMessage(`Compte ${aid} credité de ${amount} `,MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}
import { BASE_API_URL, MSG_TYPE } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";
import { setAgencyAccount, setGeneralMessage, setAgencyAccountActivity } from "./actions-creators";

export function fetchAgencyAccount(){

    return dispatch => {
        fetch(
            `${BASE_API_URL}/agencies/account`,
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
                dispatch(setAgencyAccount(json.result));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function fetchAgencyAccountActivity(){

    return dispatch => {
        fetch(
            `${BASE_API_URL}/agencies/activity`,
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
                dispatch(setAgencyAccountActivity(json.result));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


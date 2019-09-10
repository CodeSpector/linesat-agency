import { BASE_API_URL, MSG_TYPE } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";
import { setUsersList, setGeneralMessage } from "./actions-creators";


export function fetchAgencyUsers(){
    return dispatch => {
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
                dispatch(setUsersList(json.result))
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function createUserAccount(account={}){
    return (dispatch)=>{
        fetch(
            `${BASE_API_URL}/agencies/users`,
            {
                method:"PUT",
                headers:{
                    'Content-Type':'application/json;charset=utf-8',
                    'x-access-token':StorageProvider.getToken()
                },
                body:JSON.stringify(account)
            },
        )
        .then((response)=>{
            if(response.status===401){
                dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
            }
            return response.json();
        })
        .then((json)=>{
            if(json.success===true){
                dispatch(fetchAgencyUsers());
                dispatch(setGeneralMessage('Compte créée',MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}


export function creditUser(uid){
    return (dispatch) => {
        fetch(
            `${BASE_API_URL}/agencies/user/${uid}/credit`,
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
                dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
            }
            return response.json();
        })
        .then((json)=>{
            if(json.success===true){
                dispatch(fetchAgencyUsers());
                dispatch(setGeneralMessage("L'accréditation de l'utilisateur a augmenté",MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}

export function discreditUser(uid){
    return (dispatch) =>{
        fetch(
            `${BASE_API_URL}/agencies/user/${uid}/discredit`,
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
                dispatch(setGeneralMessage('Les privileges semblent insuffisant pour cette operation',MSG_TYPE.SUCCESS));
            }
            return response.json();
        })
        .then((json)=>{
            if(json.success===true){
                dispatch(fetchAgencyUsers());
                dispatch(setGeneralMessage("L'accréditation de l'utilisateur a diminué",MSG_TYPE.SUCCESS));
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}
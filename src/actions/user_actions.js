import { setGeneralMessage, setCurrentAgency, setCurrentUser, setAuthRequireUserCredentials } from "./actions-creators";
import { MSG_TYPE, BASE_API_URL } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";

export function authenticate({username='',password=''}){
    return (dispatch,getState) => {
        let user= getState().user;
            if(user.logged){
                return;
            }
            dispatch(setGeneralMessage('Authentification en cours...',MSG_TYPE.INFO));
            fetch(
                `${BASE_API_URL}/auth/agency`,
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json;charset=utf-8',
                        'x-access-token':StorageProvider.getToken()
                    },
                    body:JSON.stringify({username:username,password:password})
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
                dispatch(setCurrentAgency(json.result.agency));
                dispatch(setCurrentUser(json.result.user));
                dispatch(setGeneralMessage("Authentifié",MSG_TYPE.SUCCESS));
            })
            .catch(
                err=>{
                    dispatch(setGeneralMessage("Echec d'authentification",MSG_TYPE.ERROR));
                    dispatch(setAuthRequireUserCredentials());
                }
            );
    }
}
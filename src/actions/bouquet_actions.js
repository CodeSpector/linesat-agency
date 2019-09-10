import { BASE_API_URL, MSG_TYPE } from "../lib/constants";
import StorageProvider from "../lib/tokenProvider";
import { setBouquetsList, setGeneralMessage } from "./actions-creators";

export function fetchFormulas(){
    return dispatch => {
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
                dispatch(setBouquetsList(json.result))
            }
        })
        .catch(err=>{
            console.log(err);
            dispatch(setGeneralMessage('Une erreur est survenue.',MSG_TYPE.ERROR));
        });
    }
}
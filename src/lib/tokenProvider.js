export default class StorageProvider{
    static set(key='',value=''){
        sessionStorage.setItem(key,value)
    }

    static getValue(key=''){
        return sessionStorage.getItem(key);
    }

    static getToken(){
        return this.getValue('token');
    }

    static setToken(token=''){
        return this.set('token',token);
    }
}
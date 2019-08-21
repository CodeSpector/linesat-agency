const LVL_ONE=1;
const LVL_TWO=2;
const LVL_THREE=3;
const LVL_FOUR=4;

export default class PermissionManager{
    static canReadBouquets(lvl){
        return lvl >= LVL_ONE;
    }

    static canReadAgencyProfile(lvl){
        return lvl >= LVL_THREE;
    }

    static canUpdateAgencyProfile(lvl){
        return lvl >= LVL_THREE;
    }

    static canReadAgencyAccount(lvl){
        return lvl >= LVL_TWO;
    }

    static canReadCustomerAccounts(lvl){
        return lvl >=LVL_ONE;
    }

    static canCreateCustomerAccount(lvl){
        return lvl >= LVL_ONE;
    }

    static canCreditCustomerAccount(lvl){
        return lvl >= LVL_TWO;
    }

    static canReadTransactions(lvl){
        return lvl >= LVL_TWO;
    }

    static canCloseCustomerAccount(lvl){
        return lvl >= LVL_THREE;
    }

    static canReadSubscriptions(lvl){
        return lvl >= LVL_ONE;
    }

    static canAbortSubscriptions(lvl){
        return lvl >= LVL_TWO;
    }

    static canConfirmSubscriptions(lvl){
        return lvl >= LVL_TWO;
    }

    static canReadUsers(lvl){
        return lvl >= LVL_THREE;
    }

    static canCreateUser(lvl){
        return this.isRootLevel(lvl);
    }

    static canGrantRoleToUser(lvl){
        return this.isRootLevel(lvl);
    }

    static canDenyRoleToUser(lvl){
        return this.isRootLevel(lvl);
    }

    static canDeleteUserAccount(lvl){
        return this.isRootLevel(lvl);
    }

    static canReadTransactions(lvl){
        return lvl >= LVL_TWO;
    }

    static canInitiateTransaction(lvl){
        return lvl >= LVL_THREE;
    }
    
    static isRootLevel(lvl){
        return lvl === LVL_FOUR;
    }
}

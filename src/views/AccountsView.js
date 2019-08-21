import React from 'react';
import AccountsTable from './AccountsTable';
import { Grid, Dialog, DialogTitle, DialogContent, List, ListItem, Button, TextField, IconButton } from '@material-ui/core';
import { Close, Done } from '@material-ui/icons';
import {connect} from 'react-redux';

import { createCustomerAccount, fetchAccounts, freezeCustomerAccount, unFreezeCustomerAccount, creditCustomerAccount, debitCustomerAccount } from '../actions/actions-creators';

function mapStateToProps(state){
    return {
        accounts:state.accounts
    }
}

function mapDispatchToProps(dispatch){
    return {
        createAccount:(account)=>dispatch(createCustomerAccount(account)),
        fetchAccounts:()=>dispatch(fetchAccounts()),
        creditCustomerAccount:(accid,amount)=>dispatch(creditCustomerAccount({accountId:accid,amount:amount})),
        debitCustomerAccount:(accid,amount)=>dispatch(debitCustomerAccount({accountId:accid,amount:amount})),
        freezeAccount:(id)=>dispatch(freezeCustomerAccount(id)),
        unFreeze:(id)=>dispatch(unFreezeCustomerAccount(id))
    }
}

function AccountCreationDialog(props){
    const [done,setDone]=React.useState(false);
    const [account,setAccount]=React.useState({customerCode:'',amount:1})

    function handleChange(event)
    {
        let acc={...account};
        acc[event.target.name]=event.target.value;
        setAccount(acc);
    }

    function handleSubmit(event)
    {
        props.submitNew(account);
    }

    function builder()
    {
        return (
            <Dialog open={props.open}>
                <DialogTitle>Nouveau Compte Client</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <TextField value={account.customerCode} name='customerCode' onChange={handleChange} label='Code Client'/>
                        </ListItem>
                        <ListItem>
                            <TextField value={account.amount} name='amount' onChange={handleChange} type='number' label='Montant initial'/>
                        </ListItem>
                        <ListItem>
                            <IconButton onClick={props.onClose}>
                                <Close/>
                            </IconButton>
                            <IconButton onClick={handleSubmit}>
                                <Done/>
                            </IconButton>
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        );
    }

    return builder();
}

class AccountsView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            nar:false,// Abbreviation for New Account Requested (N-A-R)
            acr:false, // Abbreviation for Account Credit Requested (A-C-R)
            adr:false, // Abbreviation for account debit requested (A-D-R)
            account:{},
            amount:0
        }
    }

    componentWillMount()
    {
        this.props.fetchAccounts();
    }

    handleNew()
    {
        this.setState({nar:true})
    }
    
    handleClose()
    {
        this.setState({nar:false})
    }

    handleAccountDebit(account={}){
        this.setState({adr:true,acr:false,account:account});
    }

    handleAccountCredit(account={}){
        this.setState({acr:true,adr:false,account:account});
    }

    handleAmountchange(event){
        let newAmount= Number.parseFloat(event.target.value);
        if(newAmount > 0){
            if(this.state.adr){
                if(newAmount<=this.state.account.amount){
                    this.setState({amount:newAmount});
                }
            }else if(this.state.acr){
                this.setState({amount:newAmount});
            }
        } 
    }

    handleDebitDialogClose(){
        this.setState({adr:false,acr:false});
    }

    handleCreditDialogClose(){
        this.setState({adr:false,acr:false});
    }

    handleDebitSubmission(){
        this.props.debitCustomerAccount(this.state.account['_id'],this.state.amount);
        this.setState({amount:0,account:{}});
        this.handleDebitDialogClose();
    }

    handleCreditSubmission(){
        this.props.creditCustomerAccount(this.state.account['_id'],this.state.amount);
        this.setState({amount:0,account:{}});
        this.handleCreditDialogClose();
    }

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <AccountsTable  items={this.props.accounts.list} handleNew={()=>this.handleNew()} handleDebit={(account)=>this.handleAccountDebit(account)} handleCredit={(account)=>this.handleAccountCredit(account)} handleFreeze={(id)=>this.props.freezeAccount(id)} handleUnFreeze={(id)=>this.props.unFreeze(id)} />
                    <AccountCreationDialog open={this.state.nar} onClose={()=>this.handleClose()} submitNew={this.props.createAccount} handleFreeze={(id)=>this.props.freezeAccount(id)} handleUnFreeze={(id)=>this.props.unFreeze(id)}/>
                    <Dialog open={this.state.acr}>
                        <DialogTitle>Compte {this.state.account['_id']}</DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <TextField label="Montant du credit" value={this.state.amount} onChange={(ev)=>this.handleAmountchange(ev)} fullWidth/>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={(ev)=>this.handleCreditDialogClose(ev)}>
                                        Fermer
                                    </Button>
                                    <Button onClick={(ev)=>this.handleCreditSubmission()}>
                                        Confirmer
                                    </Button>
                                </ListItem>
                            </List>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={this.state.adr}>
                        <DialogTitle>Compte {this.state.account['_id']}</DialogTitle>
                        <DialogContent>
                            <List>
                                <ListItem>
                                    <TextField label="Montant a débiter" value={this.state.amount} onChange={(ev)=>this.handleAmountchange(ev)} fullWidth/>
                                </ListItem>
                                <ListItem>
                                    <Button onClick={(ev)=>this.handleDebitDialogClose(ev)}>
                                        Fermer
                                    </Button>
                                    <Button onClick={(ev)=>this.handleDebitSubmission()}>
                                        Confirmer
                                    </Button>
                                </ListItem>
                            </List>
                        </DialogContent>
                    </Dialog>
                </Grid>       
            </Grid>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AccountsView);
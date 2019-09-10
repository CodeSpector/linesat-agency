import React from 'react';
import AccountsTable from './AccountsTable';
import { Grid, Dialog, DialogTitle, DialogContent, List, ListItem, Button, TextField, IconButton, Box, DialogActions, AppBar, Toolbar, Typography, InputBase, SwipeableDrawer, Paper } from '@material-ui/core';
import { Close, Done, MenuOutlined, SearchOutlined, AddOutlined } from '@material-ui/icons';
import {connect} from 'react-redux';
import { searchInAccounts } from '../actions/actions-creators';
import { makeStyles } from '@material-ui/styles';
import styles from '../css/global_appbar.module.css';
import MenuPanel from './MenuPanel';
import { creditCustomerAccount, fetchCustomerAccounts, createCustomerAccount } from '../actions/accounts_actions';

const fStyle = makeStyles(theme=>({
    paper: {
        minWidth:400,
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around'
    },
}))

function mapStateToProps(state){
    return {
        accounts:state.accounts
    }
}

function mapDispatchToProps(dispatch){
    return {
        search:(term)=>dispatch(searchInAccounts(term)),
        createAccount:(account)=>dispatch(createCustomerAccount(account)),
        fetchAccounts:()=>dispatch(fetchCustomerAccounts()),
        creditCustomerAccount:(accid,amount,reason)=>dispatch(creditCustomerAccount({aid:accid,amount:amount,reason:reason})),
    }
}

function AccountCreationDialog(props){
    const [done,setDone]=React.useState(false);
    const [account,setAccount]=React.useState({customerCode:'',amount:1})
    const classes = fStyle();
    function handleChange(event)
    {
        let acc={...account};
        acc[event.target.name]=event.target.value;
        setAccount(acc);
    }

    function handleSubmit(event)
    {
        event.preventDefault();
        props.submitNew(account);
    }

    function builder()
    {
        return (
            <Dialog open={props.open}>
                <DialogTitle>Nouveau Compte Client</DialogTitle>
                <DialogContent>
                    <form className={classes.paper}>
                        <TextField 
                            value={account.customerCode} 
                            name='customerCode' 
                            fullWidth
                            onChange={handleChange} 
                            label='Code Client'/>
                        <div style={{height:24}}></div>
                        <TextField 
                            value={account.amount} 
                            name='amount' 
                            fullWidth
                            onChange={handleChange} 
                            type='number' 
                            label='Montant initial'/>
                        <div style={{height:24}}></div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant="contained" color="default">
                        Fermer
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return builder();
}

class AccountsView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            menuOpen:false,
            nar:false,// Abbreviation for New Account Requested (N-A-R)
            acr:false, // Abbreviation for Account Credit Requested (A-C-R)
            account:{},
            amount:0,
            reason:''
        }
    }

    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    componentWillMount(){
        this.props.fetchAccounts();
    }

    handleNew(){
        this.setState({nar:true})
    }
    
    handleClose(){
        this.setState({nar:false})
    }

    handleAccountCredit(account={}){
        this.setState({acr:true,account:account});
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

    handleReasonChange(event){
        this.setState({reason:event.target.value});
    }

    handleCreditDialogClose(){
        this.setState({adr:false,acr:false});
    }

    handleCreditSubmission(){
        this.props.creditCustomerAccount(this.state.account['_id'],this.state.amount,this.state.reason);
        this.setState({amount:0,reason:'',account:{}});
        this.handleCreditDialogClose();
    }

    onSearch(ev){
        this.props.search(ev.target.value);
    }

    render(){
        return (
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={()=>this.handleMenuClick()} color="inherit">
                            <MenuOutlined/>
                        </IconButton>
                        <Typography variant ="h6" className={styles.bar_title}>Comptes client</Typography>
                        <Paper classes={{root:styles.bar_search_bar}}>
                            <IconButton color="inherit">
                                <SearchOutlined/>
                            </IconButton>
                            <InputBase
                            onChange={(ev)=>this.onSearch(ev)}
                            placeholder="Code du compte..."/>
                        </Paper>
                        <IconButton color="inherit" onClick={()=>this.handleNew()}>
                            <AddOutlined/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer open={this.state.menuOpen} onOpen={()=>this.handleMenuClick()} onClose={()=>this.handleMenuClick()}>
                    <MenuPanel/>
                </SwipeableDrawer>
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
                                    <TextField label="Motif" value={this.state.reason} onChange={(ev)=>this.handleReasonChange(ev)} fullWidth/>
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
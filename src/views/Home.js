import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import BouquetsView from './BouquetsView';
import AccountsView from './AccountsView';
import SubView from './SubscriptionsView';
import UserView from './UsersView';
import AgencyProfilePage from './AgencyProfilePage';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { CircularProgress, Typography, Grid, Toolbar, AppBar, IconButton, Button } from '@material-ui/core';
import { ExitToApp, VerifiedUser } from '@material-ui/icons';
import { blue, orange, teal } from '@material-ui/core/colors';

import PermissionManager from '../lib/PermissionManager';

function PreparingInterface(props){
    return (
        <div style={{
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            background:'linear-gradient(to bottom right,white,blanchedalmond)'
        }}>
            <Typography variant='h4' style={{
                marginBottom:20
            }}>LineSat</Typography>
            <div  style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around'
            }}>
                <CircularProgress size={60} color={'primary'} variant={"indeterminate"}/>
                <Typography style={{
                    marginLeft:45
                }}>Préparation de votre interface</Typography>
            </div>
        </div>
    );
}

const mapStateToProps = state=>{
    console.log(state);
    return {
        user:state.user,
        agency:state.agency
    }
}

const iStyles={
    root:{
        flexGrow:1
    },
    toolBar:{
        height:'100%',
        padding:'12px 0px',
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-between"
    },
    menuContainer:{
        width:'100%',
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start"
    },
    link:{
        textDecoration: 'none',
        color:'black',
        padding:'14px 8px',
        width: 'calc(100% - 16px)',
        textAlign: 'left'
    },
    activeLink:{
        color:'coral',
        textDecoration: 'none',
    }
};

function MenuView({user}){
    let lvl = user.roles.grantLevel;
    return (
        <div style={{
            width:'15%',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'flexStart',
            position:'fixed',
            left:0,
            borderRight:'1px solid rgba(0,0,0,12%)'
        }}>
            <nav style={iStyles.menuContainer}>
                {PermissionManager.canReadBouquets(lvl) ?
                <NavLink to="/bouquets" activeStyle={iStyles.activeLink} style={iStyles.link}>
                    <Typography variant='button'>Bouquets</Typography>
                </NavLink>  :''
                }
                {PermissionManager.canReadCustomerAccounts(lvl) ?
                <NavLink to="/accounts" activeStyle={iStyles.activeLink} style={iStyles.link}>
                    <Typography variant='button'>Comptes Client</Typography>
                </NavLink>  :''
                }
                {PermissionManager.canReadSubscriptions(lvl) ?
                <NavLink to="/subscriptions" activeStyle={iStyles.activeLink} style={iStyles.link}>
                    <Typography variant='button'>Réabonnements</Typography>
                </NavLink>  :''
                }
                {PermissionManager.canReadUsers(lvl) ?
                <NavLink to="/users" activeStyle={iStyles.activeLink} style={iStyles.link}>
                    <Typography variant='button'>Utilisateurs</Typography>
                </NavLink>  :''
                }
            </nav>
        </div>
    );
}

class HomeView extends React.Component{

    componentDidMount(){
        console.log(this.props.agency.identity);
    }

    render(){
        if(!this.props.user.logged){
            if(!this.props.user.requireCredentials){
                return (
                    <PreparingInterface/>
                );
            }else{
                return (
                    <Redirect to='/login'/>
                );
            }
        }

        let name = this.props.user.details.owner.name;
        let gender= this.props.user.details.owner.gender;
        let lvl= this.props.user.details.roles.grantLevel;
        return (
            <Grid container>
                <AppBar position='sticky' style={{
                    background:'rgba(0,0,0,64%)',
                    color:'white'
                }}>
                    <Toolbar>
                        <Typography variant="h6" style={{flexGrow:1}}>
                            LineSat
                        </Typography>
                        <Button>
                            <NavLink to='/profile' activeStyle={iStyles.activeLink} style={{...iStyles.link,color:'white'}}>
                                <Typography>{this.props.agency.identity.name}</Typography>
                            </NavLink>
                        </Button>
                        <Button>
                            <VerifiedUser htmlColor='white'/>
                            <Typography style={{color:'white'}}>{name.first} {name.last}</Typography>
                        </Button>
                        <IconButton>
                            <ExitToApp htmlColor="white" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid item xs={12}>
                    <MenuView user={this.props.user.details}/>
                    <div style={{
                        width:'85%',
                        height:'100%',
                        marginLeft:'15%'
                    }}>
                        <Switch>
                            <Route path="/profile">
                                <AgencyProfilePage/>  
                            </Route>
                            {PermissionManager.canReadBouquets(lvl) ?
                            <Route path="/bouquets">
                                <BouquetsView/>
                            </Route> :''
                            }
                            {
                            PermissionManager.canReadCustomerAccounts(lvl) ?
                            <Route path="/accounts">
                                <AccountsView/>  
                            </Route> :''
                            }
                            {
                            PermissionManager.canReadUsers(lvl) ?
                            <Route path="/users">
                                <UserView/>  
                            </Route> : ''
                            }
                            {
                            PermissionManager.canReadSubscriptions(lvl) ?
                            <Route path="/subscriptions">
                                <SubView/>  
                            </Route>:''
                            }
                        </Switch>
                    </div>
                </Grid>
            </Grid>
        );
    }
}


export default connect(mapStateToProps)(HomeView);
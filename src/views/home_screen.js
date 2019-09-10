import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import BouquetsView from './BouquetsView';
import AccountsView from './AccountsView';
import SubView from './SubscriptionsView';
import UserView from './UsersView';
import AgencyProfilePage from './AgencyProfilePage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Grid} from '@material-ui/core';

import PermissionManager from '../lib/PermissionManager';
import AgencyActivity from './AgencyActivity';
import LoadingUI from './loading_screen';
import MenuPanel from './MenuPanel';
import DashView from './DashView';
import ActivityView from './ActivityView';

const mapStateToProps = state=>{
    console.log(state);
    return {
        user:state.user,
        agency:state.agency
    }
}

class HomeView extends React.Component{

    componentDidMount(){
        console.log(this.props.agency.identity);
    }

    render(){
        if(!this.props.user.logged){
            if(!this.props.user.requireCredentials){
                return (
                    <LoadingUI/>
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

        console.log(this.props);
        return (
            <div style={{
                width:'100%',
                height:'100%',
                margin:'0'}}>
                <Grid container style={{
                    width:"100%",
                    height:'100%'}}>
                    <Grid item xs={12} style={{
                        width:'100%',
                        height:'100%',
                        position:'relative'
                    }}>
                        <Grid container>
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
                                {
                                PermissionManager.canReadTransactions(lvl) ?
                                <Route path="/activity">
                                    <ActivityView/>  
                                </Route>:''
                                }
                                <Route path="/">
                                    <DashView/>  
                                </Route>
                            </Switch>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HomeView);
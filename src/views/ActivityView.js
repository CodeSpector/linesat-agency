import React from 'react';
import { Container, CssBaseline, AppBar, Toolbar, IconButton, Typography, InputBase, Grid, SwipeableDrawer, Paper, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import { MenuOutlined, SearchRounded, AccountBalance, AddOutlined } from '@material-ui/icons';
import styles from '../css/global_appbar.module.css';
import MenuPanel from './MenuPanel';
import ActivityTable from './ActivityTable';
import {connect} from 'react-redux';
import { fetchAgencyAccount, fetchAgencyAccountActivity } from '../actions/agency_actions';
import AgencyAccountView from './AgencyAccountView';
import NewTransaction from './NewTransaction';

const mapStateToProps = state => {
    return {
        account:state.agencyAccount
    }
}

const mapDispatchToProps =  dispatch => {
    return  {
        prepare:()=>{
            dispatch(fetchAgencyAccount());
            dispatch(fetchAgencyAccountActivity());
        }
    }
}

class ActivityView extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            menuOpen:false,
            accountVisible:false,
            newTrans:false
        }
    }
    
    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    handleTransToggle(){
        this.setState({newTrans:!this.state.newTrans});
    }

    componentWillMount(){
        this.props.prepare();
    }

    toggleAccountVisibility(){
        this.setState({accountVisible:!this.state.accountVisible});
    }

    render(){
        return (
        <Grid container>
            <CssBaseline/>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton color="inherit" edge="start" style={{
                        margin:"0px 8px"
                    }}
                    onClick={()=>this.handleMenuClick()}>
                        <MenuOutlined/>
                    </IconButton>
                    <Typography variant="h6" className={styles.bar_title}>Activité</Typography>
                    <Paper classes={{root:styles.bar_search}}>
                        <IconButton color="inherit">
                            <SearchRounded/>
                        </IconButton>
                        <InputBase
                            classes={{
                                input:styles.bar_search_bar
                            }}
                            placeholder="Chercher une transaction..."/>
                    </Paper>
                    <Button variant="text" color='inherit' onClick={()=>this.toggleAccountVisibility()}>
                        <AccountBalance color="inherit" />
                        Compte
                    </Button>
                    <Button variant="text" color='inherit' onClick={()=>this.handleTransToggle()}>
                        <AddOutlined color="inherit" />
                        Nouveau
                    </Button>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer open={this.state.menuOpen} onClose={()=>this.handleMenuClick()} onOpen={()=>this.handleMenuClick()}>
                <MenuPanel/>
            </SwipeableDrawer>
            <main style={{
                width:'100%',
                height:'100%'
            }}>
                <Grid container>
                    <Grid item xs={12}>
                        <ActivityTable/>
                    </Grid>
                </Grid>
            </main>
            <Dialog open={this.state.accountVisible}>
                <DialogContent>
                <AgencyAccountView/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={()=>this.toggleAccountVisibility()}>Fermer</Button>
                </DialogActions>
            </Dialog>
            <NewTransaction open={this.state.newTrans} onClose={()=>this.handleTransToggle()}/>
        </Grid>);
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivityView);
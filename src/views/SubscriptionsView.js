import React from 'react';
import SubscriptionTable from './SubscriptionsTable';
import { Grid, Toolbar, IconButton, InputBase, AppBar, SwipeableDrawer, Typography, Paper } from '@material-ui/core';
import {connect} from 'react-redux';
import styles from "../css/global_appbar.module.css";
import { MenuOutlined, SearchOutlined } from '@material-ui/icons';
import MenuPanel from './MenuPanel';
import { fetchSubs } from '../actions/subs_actions';

const mapDispatchToProps=dispatch=>{
    return {
        fetchSubscriptions:()=>dispatch(fetchSubs())
    }
}

class SubscriptionView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            menuOpen:false
        }
    }

    onSearch(ev){

    }

    componentWillMount(){
        this.props.fetchSubscriptions();
    }

    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    render(){
        return (
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={()=>this.handleMenuClick()} color="inherit">
                            <MenuOutlined/>
                        </IconButton>
                        <Typography variant ="h6" className={styles.bar_title}>Souscriptions Canal+</Typography>
                        <Paper classes={{root:styles.bar_search_bar}}>
                            <IconButton color="inherit">
                                <SearchOutlined/>
                            </IconButton>
                            <InputBase
                            onChange={(ev)=>this.onSearch(ev)}
                            classes={{
                                input:styles.bar_search_bar
                            }}
                            placeholder="Réference..."/>
                        </Paper>
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer open={this.state.menuOpen} onOpen={()=>this.handleMenuClick()} onClose={()=>this.handleMenuClick()}>
                    <MenuPanel/>
                </SwipeableDrawer>
                <Grid item xs={12}>
                    <SubscriptionTable/>
                </Grid>        
            </Grid>
        );
    }
}

export default connect(null,mapDispatchToProps)(SubscriptionView);
import React, { useEffect } from 'react';
import { searchInBouquets} from '../actions/actions-creators';
import { fetchFormulas } from '../actions/bouquet_actions';
import BouquetsTable from './BouquetsTable';
import { connect } from 'react-redux';
import {Grid, Card, CardContent, Typography, Chip, AppBar, Toolbar, CssBaseline, IconButton, InputBase, SwipeableDrawer, Paper} from '@material-ui/core';
import MenuPanel from './MenuPanel';
import { makeStyles } from '@material-ui/styles';
import { MenuOutlined, SearchOutlined } from '@material-ui/icons';
import styles from '../css/global_appbar.module.css';


function mapDispatchToProps(dispatch){
    return {
        fetchBouquets:()=>dispatch(fetchFormulas()),
        search:(term) =>dispatch(searchInBouquets(term))
    }
}

class BouquetApp extends React.Component{

    constructor(props){
        super(props);
        this.state={
            menuOpen:false
        }
    }

    componentWillMount(){
        this.props.fetchBouquets();
    }

    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    onSearch(ev){
        this.props.search(ev.target.value);
    }

    render(){
        return (
            <Grid container>
                <CssBaseline/>
                <Grid item xs={12}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" edge="start" style={{
                                margin:"0px 8px"
                            }}
                            onClick={()=>this.handleMenuClick()}>
                                <MenuOutlined/>
                            </IconButton>
                            <Typography variant="h6" className={styles.bar_title}>Bouquets</Typography>
                            <Paper classes={{root:styles.bar_search}}>
                                <InputBase 
                                onChange={(ev)=>this.onSearch(ev)}
                                placeholder="Chercher un bouquet..."/>
                                <IconButton color="inherit">
                                    <SearchOutlined/>
                                </IconButton>
                            </Paper>
                        </Toolbar>
                    </AppBar>
                    <SwipeableDrawer open={this.state.menuOpen} onClose={()=>this.handleMenuClick()} onOpen={()=>this.handleMenuClick()}>
                        <MenuPanel/>
                    </SwipeableDrawer>
                    <main>
                        <BouquetsTable/>
                    </main>
                </Grid>        
            </Grid>
        );
    }
}

export default connect(null,mapDispatchToProps)(BouquetApp);
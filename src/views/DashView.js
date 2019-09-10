import React from 'react';
import { Container, CssBaseline, AppBar, Toolbar, IconButton, Typography, InputBase, Grid, SwipeableDrawer } from '@material-ui/core';
import { MenuOutlined, SearchRounded } from '@material-ui/icons';
import styles from '../css/global_appbar.module.css';
import MenuPanel from './MenuPanel';



class DashView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            menuOpen:false
        }
    }
    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    render(){
        return (
        <Grid container>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" edge="start" style={{
                        margin:"0px 8px"
                        }}
                        onClick={()=>this.handleMenuClick()}>
                        <MenuOutlined/>
                    </IconButton>
                    <Typography variant="h6" className={styles.bar_title}>Accueil</Typography>
                    <div className={styles.bar_search}>
                        <IconButton color="inherit">
                            <SearchRounded/>
                        </IconButton>
                        <InputBase
                            classes={{
                                input:styles.bar_search_bar
                            }}
                            placeholder="Chercher un bouquet..."/>
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer open={this.state.menuOpen} onClose={()=>this.handleMenuClick()} onOpen={()=>this.handleMenuClick()}>
                <MenuPanel/>
            </SwipeableDrawer>
        </Grid>
        );
    }
}


export default DashView;
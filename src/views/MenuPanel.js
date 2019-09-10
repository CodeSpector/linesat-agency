import React from 'react';
import { Drawer, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import PermissionManager from '../lib/PermissionManager';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/styles';

const mapStateToProps = state => {
    return {
        user:state.user.details,
        agency:state.agency
    }
}

const  useStyle = makeStyles(theme=>({
    drawer:{
        zIndex:theme.zIndex.drawer
    }
}));

function MenuPanel(props){
    let lvl = 4;//props.user.roles.grantLevel;
    let history = props.history;
    function handleMenuLinkClick(route=''){
        history.push(route);
    }

    return (
        <List>
            <ListItem>
                <ListItemText>
                    <Typography variant="h5">Koris Pay</Typography>
                </ListItemText>
            </ListItem>
            <ListItem divider>
                <ListItemText> 
                    <Typography variant="h6">Agence {props.agency.identity.name}</Typography>
                </ListItemText>
            </ListItem>
            <ListItem divider button onClick={()=>handleMenuLinkClick("/")}>
                <ListItemText>Accueil</ListItemText>
            </ListItem>
            <ListItem divider button onClick={()=>handleMenuLinkClick("/activity")}>
                <ListItemText>Activité</ListItemText>
            </ListItem>
            {PermissionManager.canReadBouquets(lvl) ?
            <ListItem divider button onClick={()=>handleMenuLinkClick("/bouquets")}>
                <ListItemText>Bouquets</ListItemText>
            </ListItem>:''
            }
            {PermissionManager.canReadCustomerAccounts(lvl) ?
            <ListItem divider button onClick={()=>handleMenuLinkClick("/accounts")}>
                <ListItemText>Comptes</ListItemText>
            </ListItem> : ''
            }
            {PermissionManager.canReadSubscriptions(lvl) ?
            <ListItem divider button onClick={()=>handleMenuLinkClick("/subscriptions")}>
                <ListItemText>Souscriptions CANAL+</ListItemText>
            </ListItem> : ''
            }
            {PermissionManager.canReadUsers(lvl) ?
            <ListItem divider button onClick={()=>handleMenuLinkClick("/users")}>
                <ListItemText>Utilisateurs</ListItemText>
            </ListItem> : ''
            }
            <ListItem divider button>
                <ListItemText>Déconnexion</ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Typography variant="body1">Utilisateur {props.user.owner.name.first} {props.user.owner.name.last}</Typography>
                </ListItemText>
            </ListItem>
        </List>
    );
}

export default connect(mapStateToProps)(withRouter(MenuPanel));
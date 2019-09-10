import React from 'react';
import { Paper, Typography, ListItem, ListItemText, List } from '@material-ui/core';
import {connect} from 'react-redux';


const mapStateToProps = state =>{
    return {
        account:state.agencyAccount
    }
}

class  AgencyAccount extends React.Component{
    

    render(){
        return (
        <List>
            <ListItem divider>
                <ListItemText 
                secondary="Code du compte"
                primary={`${this.props.account.detail.code}`}/>
            </ListItem>
            <ListItem divider>
                <ListItemText 
                primary={`${this.props.account.detail.amount} ${this.props.account.detail.currency}`}
                secondary="Solde actuel"/>
            </ListItem>
            <ListItem divider>
                <ListItemText
                secondary="Date de création"
                primary={`${new Date(this.props.account.detail.creationDate).toUTCString()}`}/>
            </ListItem>
            <ListItem>
                <ListItemText
                secondary="Derniere opération"
                primary={`${new Date(this.props.account.detail.lastOperationDate).toUTCString()}`}/>
            </ListItem>
        </List>
        );
    }
}


export default connect(mapStateToProps)(AgencyAccount);
import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Divider, Button } from '@material-ui/core';
import {PlaceOutlined, EmailOutlined, PhoneCallbackOutlined, Phone, AccountBalance } from '@material-ui/icons';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        user:state.user.details,
        agency:state.agency
    }
}

class AgencyProfilePage extends React.Component{

    componentDidMount(){
        console.log(this.props.agency)
    }
    render(){
        let location = this.props.agency.location;
        let user = this.props.user;
        return (
            <Grid container xs={12} alignContent='center' justify='center' alignItems='center'>
                <Grid item xs={10} justify='center' alignContent='center'>
                    <div style={{height:25}}></div>
                    <Typography variant='h5'>{this.props.agency.identity?this.props.agency.identity.name:'Nom de l\'agence'}</Typography>
                    <div style={{height:25}}></div>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <PlaceOutlined/>
                            </ListItemAvatar>
                            <ListItemText>{location.street}, {location.city}, {location.country}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <EmailOutlined/>
                            </ListItemAvatar>
                            <ListItemText>{this.props.agency.contact.email}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <Phone/>
                            </ListItemAvatar>
                            <ListItemText>{this.props.agency.contact.phone}</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                            <AccountBalance/>
                            </ListItemAvatar>
                            <ListItemText>
                                <Button>Activité du compte</Button>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        );
    }
}

export default  connect(mapStateToProps)(AgencyProfilePage);
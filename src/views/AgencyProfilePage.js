import React from 'react';
import { Grid, Paper, Typography, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import {PlaceOutlined, EmailOutlined, PhoneCallbackOutlined, Phone } from '@material-ui/icons';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        user:state.user,
        agency:state.agency
    }
}

class AgencyProfilePage extends React.Component{

    componentDidMount(){
        console.log(this.props.agency)
    }
    render(){
        return (
            <Paper>
                <Grid container xs={12}>
                    <Grid item xs={6}>
                        <Typography variant='h5'>{this.props.agency.identity?this.props.agency.identity.name:'Nom de l\'agence'}</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <PlaceOutlined/>
                                </ListItemAvatar>
                                <ListItemText>222 Baker Street, Cotonou ,Benin</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <EmailOutlined/>
                                </ListItemAvatar>
                                <ListItemText>atttrans@gmail.com</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Phone/>
                                </ListItemAvatar>
                                <ListItemText>22967890654</ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h5'>{this.props.agency.identity?this.props.agency.identity.name:'Nom de l\'agence'}</Typography>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <PlaceOutlined/>
                                </ListItemAvatar>
                                <ListItemText>222 Baker Street, Cotonou ,Benin</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <EmailOutlined/>
                                </ListItemAvatar>
                                <ListItemText>atttrans@gmail.com</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Phone/>
                                </ListItemAvatar>
                                <ListItemText>22967890654</ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default  connect(mapStateToProps)(AgencyProfilePage);
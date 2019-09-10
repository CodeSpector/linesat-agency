import React from 'react';
import { Grid, Table, TableHead, TableRow, TableCell, Button, Typography, TableBody, Dialog, DialogTitle, DialogContent, List, ListItem, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, Checkbox, FormControl, IconButton, Menu, MenuItem, DialogActions, Slider, AppBar, Toolbar, InputBase, SwipeableDrawer, Paper } from '@material-ui/core';
import { AddOutlined,MenuOutlined, SearchOutlined } from '@material-ui/icons';
import {connect} from 'react-redux';
import { fetchAgencyUsers, createUserAccount, creditUser, discreditUser } from '../actions/a_user_actions';
import PermissionManager from '../lib/PermissionManager';
import MenuPanel from './MenuPanel';
import UsersTable from './UsersTable';
import styles from '../css/global_appbar.module.css';
import { searchInUsers } from '../actions/actions-creators';

function mapStateToProps(state){
    return {
        users:state.users,
        uid:state.user.details._id,
        lvl:state.user.details.roles.grantLevel
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchUsers:()=>dispatch(fetchAgencyUsers()),
        createUser:(account={})=>dispatch(createUserAccount(account)),
        creditUser:(uid)=>dispatch(creditUser(uid)),
        discreditUser:(uid)=>dispatch(discreditUser(uid)),
        search:(term)=>dispatch(searchInUsers(term))
    }
}

const levelMarks=[
    {
        value:1,
        label:'1'
    },
    {
        value:2,
        label:'2'
    },
    {
        value:3,
        label:'3'
    },
    {
        value:4,
        label:'4'
    },
]

function NewUserDialog(props){
    const [user, setUser] = React.useState({
        firstName:'',
        lastName:'',
        gender:'men',
        username:'',
        password:'',
        grantLevel:1
    });

    function onGenderChange(event){
        setUser({...user,gender:event.target.value});
    }

    function handleGrantChange(event,newVal){
        setUser({...user,grantLevel:newVal});
    }

    function handleSubmission(){
        console.log(user);
        props.handleSubmitNew(user);
    }

    function handleFormChange(ev){
        let name=ev.target.name;
        let value= ev.target.value;
        setUser({...user,[name]:value})
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Nouvel Utilisateur</DialogTitle>
            <DialogContent>
                <form onChange={handleFormChange}>
                    <List>
                    <ListItem>
                        <TextField
                            label='Prenoms'
                            name='firstName'
                            style={{
                                width:600,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label='Nom'
                            name='lastName'
                            style={{
                            width:600,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <RadioGroup name="gender" onChange={onGenderChange} value={user.gender} row>
                            <FormControlLabel
                                value="men"
                                label="Homme"
                                control={<Radio/>}
                            />
                            <FormControlLabel
                                value="women"
                                label="Femme"
                                control={<Radio/>}
                            />
                        </RadioGroup>
                    </ListItem>
                    <ListItem>
                        <TextField
                            label="Nom d'utilisateur"
                            name='username'
                            style={{
                            width:600,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <TextField
                            label='Mot de passe'
                            name='password'
                            type='password'
                            style={{
                                width:600,
                            }}
                        />
                    </ListItem>
                    <ListItem>
                        <FormLabel>Accréditations</FormLabel>
                        
                    </ListItem>
                    <ListItem>
                        <Slider onChangeCommitted={handleGrantChange} min={1} marks={levelMarks} max={4} step={1}/>
                    </ListItem>
                    </List>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDialogClosure}>Annuler</Button>
                <Button onClick={handleSubmission}>Confirmer</Button>
            </DialogActions>
        </Dialog>

    );
}

class UserView extends React.Component{

    constructor(props){
        super(props);
        this.state={
            menuOpen:false,
            nudr:false, // New User Dialog Requested 
        }
    }

    handleMenuClick(){
        this.setState({menuOpen:!this.state.menuOpen});
    }

    componentWillMount(){
        this.props.fetchUsers();
    }

    handleNewUser(){
        this.setState({nudr:true});
    }

    handleNewUserDialogClosure(){
        this.setState({nudr:false});
    }

    handleNewSubmission(account){
        this.props.createUser(account);
        this.setState({nudr:false});
    }

    onSearch(ev){
        this.props.search(ev.target.value);
    }

    render(){
        return (
            <Grid container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" edge="start" style={{
                            margin:"0px 8px"
                        }}
                        onClick={()=>this.handleMenuClick()}>
                            <MenuOutlined/>
                        </IconButton>
                        <Typography variant="h6" className={styles.bar_title}>Utilisateurs</Typography>
                        <Paper classes={{root:styles.bar_search}}>
                            <IconButton color="inherit">
                                <SearchOutlined/>
                            </IconButton>
                            <InputBase
                                onChange={(ev)=>this.onSearch(ev)}
                                classes={{
                                    input:styles.bar_search_bar
                                }}
                                placeholder="Chercher un Utilisateur..."/>
                        </Paper>
                        {
                            PermissionManager.canCreateUser(this.props.lvl) ?
                            <Button onClick={()=>this.handleNewUser()} variant="text" color="inherit">
                                <AddOutlined/>
                                Nouveau
                            </Button>  :''
                        }
                    </Toolbar>
                </AppBar>
                <SwipeableDrawer open={this.state.menuOpen} onClose={()=>this.handleMenuClick()} onOpen={()=>this.handleMenuClick()}>
                    <MenuPanel/>
                </SwipeableDrawer>
                <Grid item xs={12}>
                    <UsersTable handleNew={()=>this.handleNewUser()}/>
                    {
                    PermissionManager.canCreateUser(this.props.lvl) ?
                    <NewUserDialog open={this.state.nudr} handleDialogClosure={()=>this.handleNewUserDialogClosure()} handleSubmitNew={(account={})=>this.handleNewSubmission(account)}/>
                        :''
                    }
                </Grid>
            </Grid>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserView);
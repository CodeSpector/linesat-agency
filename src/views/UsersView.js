import React from 'react';
import { Grid, Table, TableHead, TableRow, TableCell, Button, Typography, TableBody, Dialog, DialogTitle, DialogContent, List, ListItem, TextField, Radio, RadioGroup, FormLabel, FormControlLabel, Checkbox, FormControl, IconButton, Menu, MenuItem, DialogActions, Slider } from '@material-ui/core';
import { AddOutlined, ArrowDropDownCircleOutlined, ArrowDropDownRounded, StopRounded, Delete } from '@material-ui/icons';
import {connect} from 'react-redux';
import { fetchUsers, createUserAccount, creditUser, discreditUser } from '../actions/actions-creators';
import PermissionManager from '../lib/PermissionManager';


function mapStateToProps(state){
    return {
        users:state.users,
        uid:state.user.details._id,
        lvl:state.user.details.roles.grantLevel
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchUsers:()=>dispatch(fetchUsers()),
        createUser:(account={})=>dispatch(createUserAccount(account)),
        creditUser:(uid)=>dispatch(creditUser(uid)),
        discreditUser:(uid)=>dispatch(discreditUser(uid))
    }
}

function UsersTable(props){

    function UserRow({user}){

        const [mv,setMv]=React.useState(false);
        const [anchor,setAnchor]=React.useState(null);

        function openMenu(ev){
            setMv(true);
            setAnchor(ev.target);
        }

        function closeMenu(){
            setMv(false);
            setAnchor(null);
        }

        /// We don't show the currently connected user in the list.
        if(props.uid===user._id){
            return '';
        }
        return (
            <TableRow>
                <TableCell>{user.owner.name.first}</TableCell>
                <TableCell>{user.owner.name.last}</TableCell>
                <TableCell>{user.owner.gender}</TableCell>
                <TableCell>{user.roles.grantLevel}</TableCell>
                <TableCell>
                    <div>
                        {
                        PermissionManager.canCreateUser(props.level) ?
                        <IconButton onClick={openMenu}>
                            <ArrowDropDownRounded/>
                        </IconButton> :''
                        }
                        {
                        PermissionManager.canCreateUser(props.level) ?
                        <Menu open={mv} anchorEl={anchor} onClose={closeMenu}>
                            <MenuItem onClick={()=>props.creditUser(user._id)}>
                                <Typography variant='button'>Passer au niveau supérieur</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>props.discreditUser(user._id)}>
                                <Typography variant='button'>Passer au niveau inférieur</Typography>
                            </MenuItem>
                            <MenuItem>
                            <Delete/>
                                Supprimer
                            </MenuItem>
                        </Menu> : ''
                        }
                    </div>
                </TableCell>
            </TableRow>
        );
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={6}>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'flex-start',
                            justifyContent:'space-between'
                        }}>
                            <Typography>Utilisateurs systeme</Typography>
                            {
                            PermissionManager.canCreateUser(props.level) ?
                            <Button onClick={()=>props.handleNew()}>
                                <AddOutlined/>
                                Nouvel utilisateur
                            </Button>  :''
                            }
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Roles</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                props.users.map((user)=>{
                    return (
                        <UserRow user={user} key={user._id}/>   
                    );
                })
            }
            </TableBody>
        </Table>
    );
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
            nudr:false, // New User Dialog Requested 
        }
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

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <UsersTable uid={this.props.uid} creditUser={this.props.creditUser} discreditUser={this.props.discreditUser} level={this.props.lvl} users={this.props.users.list} handleNew={()=>this.handleNewUser()}/>
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
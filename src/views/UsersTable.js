import React from 'react';
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, IconButton, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDownRounded, Delete } from '@material-ui/icons';
import {connect} from 'react-redux';
import { fetchAgencyUsers, createUserAccount, creditUser, discreditUser } from '../actions/a_user_actions';
import PermissionManager from '../lib/PermissionManager';

function mapStateToProps(state){
    let users = {...state.users};
    users.list=search(users.search.term,users.list);
    return {
        users:users,
        uid:state.user.details._id,
        level:state.user.details.roles.grantLevel
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchUsers:()=>dispatch(fetchAgencyUsers()),
        createUser:(account={})=>dispatch(createUserAccount(account)),
        creditUser:(uid)=>dispatch(creditUser(uid)),
        discreditUser:(uid)=>dispatch(discreditUser(uid))
    }
}

function search(term='',list=[]){
    if(!term){
        return list;
    }
    return list.filter((idx) => { 
        let name = idx.owner.name;
        let fullName = name.first +" "+ name.last;
        if(fullName.includes(term)){
            return true;
        }
        return false;
    });
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

        return (
            <TableRow>
                <TableCell>{user.owner.name.first} {user.owner.name.last}</TableCell>
                <TableCell>{user.owner.gender}</TableCell>
                <TableCell>{user.roles.grantLevel}</TableCell>
                <TableCell>
                    <div>
                        {
                        PermissionManager.canCreateUser(props.level) && props.uid !== user._id ?
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
                    <TableCell>Nom complet</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Roles</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                props.users.list.map((user)=>{
                    return (
                        <UserRow user={user} key={user._id}/>   
                    );
                })
            }
            </TableBody>
        </Table>
    );
}


export default connect(mapStateToProps,mapDispatchToProps)(UsersTable);
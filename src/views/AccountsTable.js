import React,{useState} from 'react';
import { connect } from 'react-redux';
import {Typography,Table, TableHead, TableRow, TableCell, Button, TableBody, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, ButtonGroup, TableSortLabel } from '@material-ui/core';
import { AddOutlined, ArrowDropDown, Lock, ArrowUpward, ArrowDownward } from '@material-ui/icons';

function search(term='',list=[]){
    if(term){
        return list.filter((idx)=>{return idx.code === term || idx.code.includes(term)});
    }
    return list;
}

function mapStateToProps(state){
    let accounts = {...state.accounts};
    accounts.list = search(accounts.search.term,accounts.list);

    return {
        accounts:accounts
    }
}

function AccountsTable(props){
    const [credit,setCredit]=React.useState(0);
    const [debit,setDebit]=React.useState(0);
    const [cdv,setCdv]=React.useState(false);

    function AccountRow(prps){
        const [anchorEl,setAnchor]= React.useState(null);
        function handleOpen(event){
            setAnchor(event.target);
        }

        function handleClose(){
            setAnchor(null);
        }

        return (
            <TableRow style={{
                background:prps.item.state==='freezed'?'grey':'white'
            }}>
                <TableCell>{prps.item.code}</TableCell>
                <TableCell>{prps.item.identity.name.first}</TableCell>
                <TableCell>{prps.item.identity.name.last}</TableCell>
                <TableCell>{prps.item.identity.gender}</TableCell>
                <TableCell>{prps.item.amount} XOF</TableCell>
                <TableCell>{new Date(prps.item.creationDate).toUTCString()}</TableCell>
                <TableCell>
                    <IconButton onClick={handleOpen}>
                        <ArrowDropDown/>
                    </IconButton>
                    <Menu open={anchorEl!=null} anchorEl={anchorEl} onClose={handleClose}>
                        <MenuItem onClick={(ev)=>props.handleCredit(prps.item)}>
                            <ArrowUpward/>
                            Créditer
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        );
    }
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>
                        Sexe
                    </TableCell>
                    <TableCell>
                        <TableSortLabel >Solde</TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel >Date de création</TableSortLabel>
                    </TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.accounts.list.map((it,idx)=>{
                        return <AccountRow item={it} key={it['_id']}/>
                    })
                }
            </TableBody>
        </Table>
    );
}

export default connect(mapStateToProps)(AccountsTable);
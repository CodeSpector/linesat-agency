import React,{useState} from 'react';
import { connect } from 'react-redux';
import {Typography,Table, TableHead, TableRow, TableCell, Button, TableBody, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, ButtonGroup } from '@material-ui/core';
import { AddOutlined, ArrowDropDown, Lock, ArrowUpward, ArrowDownward } from '@material-ui/icons';

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
                        <MenuItem onClick={()=>props.handleDebit(prps.item)}>
                            <ArrowDownward/>
                            Débiter
                        </MenuItem>
                        {
                            prps.item.state==='freezed'? 
                            <MenuItem onClick={()=>props.handleUnFreeze(prps.item['_id'])}>
                                <Lock/>
                                Dégeler le compte
                            </MenuItem> : 
                            <MenuItem onClick={()=>props.handleFreeze(prps.item['_id'])}>
                                <Lock/>
                                Geler le compte
                            </MenuItem>
                        }  
                    </Menu>
                </TableCell>
            </TableRow>
        );
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={7}>
                        <div style={{
                            color:"rgba(0,0,0,87%)",
                                display:"flex",
                                flexDirection:"row",
                                alignItems:"center",
                                justifyContent:"space-between"
                        }}>
                            <Typography variant="h6">Comptes Clients</Typography>
                            <Button onClick={props.handleNew}>
                                <AddOutlined/>
                                Créer un compte
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Sexe</TableCell>
                    <TableCell>Solde</TableCell>
                    <TableCell>Date de création</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    props.items.map((it,idx)=>{
                        return <AccountRow item={it} key={it['_id']}/>
                    })
                }
            </TableBody>
        </Table>
    );
}

export default AccountsTable;
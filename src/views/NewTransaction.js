import React from 'react';
import { Container, CssBaseline, TextField, Dialog, DialogTitle, Typography, DialogContent, DialogActions, Button } from '@material-ui/core';


function NewTransaction(props={}){
    return (
        <Dialog open={props.open}>
            <DialogTitle>
                <Typography>Nouveau Transfert</Typography>
            </DialogTitle>
            <DialogContent>
                <form style={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    minWidth:'400px',          
                }}>
                    <TextField
                    fullWidth
                    placeholder="Numero du compte"/>
                    <div style={{height:'24px'}}></div>
                    <TextField
                    fullWidth
                    placeholder="Montant"/>
                    <div style={{height:'24px'}}></div>
                    <TextField
                    fullWidth
                    placeholder="Motif"/>
                    <div style={{height:'24px'}}></div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} variant="contained" color="inherit">Annuler</Button>
                <Button variant="contained" color="primary">Transférer</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewTransaction;
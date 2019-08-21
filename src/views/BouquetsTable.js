import React,{useState} from 'react';
import {fetchBouquets} from '../actions/actions-creators';
import { connect } from 'react-redux';
import {BOUQUET_STATE_ACTIVE,BOUQUET_STATE_LOCKED} from '../constants';
import {Typography,Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';

function mapStateToProps(state){
    return {
        bouquets:state.bouquets
    }
}

function BouquetsTable(props){
    function BouquetRow(prps){
        const bouquet= prps.bouquet;
        return (
        <TableRow style={{
            background:bouquet.state===BOUQUET_STATE_LOCKED?'blanchedalmond':'white'
        }}>
            <TableCell>{bouquet.label}</TableCell>
            <TableCell>{bouquet.pricing.price}</TableCell>
            <TableCell>{bouquet.pricing.currency}</TableCell>
            <TableCell>{bouquet.pricing.timeUnit}</TableCell>
            <TableCell>{bouquet.description}</TableCell>
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
                            <Typography variant="h6">Bouquets</Typography>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Designation</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Devise</TableCell>
                    <TableCell>Unité temporelle</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {   
                props.bouquets.list.map((bouquet,idx)=>{
                    return (
                        <BouquetRow key={bouquet['_id']} bouquet={bouquet}/>
                    );
                })
            }
            </TableBody>
        </Table>
    );
}

export default connect(mapStateToProps)(BouquetsTable);
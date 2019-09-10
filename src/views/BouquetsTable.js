import React,{useState} from 'react';
import {fetchBouquets} from '../actions/actions-creators';
import { connect } from 'react-redux';
import {BOUQUET_STATE_ACTIVE,BOUQUET_STATE_LOCKED} from '../constants';
import {Typography,Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';

function search(term='', list=[]){
    if(!term) return list;
    return list.filter((idx)=>{return idx.label.toLowerCase() === term.toLowerCase() || idx.label.toLowerCase().includes(term.toLowerCase())});
}

function mapStateToProps(state){
    let bouquets ={...state.bouquets};
    bouquets.list=search(state.bouquets.search.term,state.bouquets.list);
    console.log(bouquets);
    return {
        bouquets:bouquets
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
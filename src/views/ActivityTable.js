import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody } from '@material-ui/core';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        activity:state.agencyAccountActivity
    }
}

function ActivityTable(props){

    function ActivityEntry(prs){
        return (
            <TableRow>
                <TableCell>{prs.item.emitter || ""}</TableCell>
                <TableCell>{prs.item.receiver || ""}</TableCell>
                <TableCell>{prs.item.reason || "Aucun motif"}</TableCell>
                <TableCell>{prs.item.amount}</TableCell>
                <TableCell>{prs.item.balanceBefore}</TableCell>
                <TableCell>{prs.item.balanceAfter}</TableCell>
                <TableCell>{new Date(prs.item.date).toUTCString()}</TableCell>
                <TableCell>{prs.item.txnType}</TableCell>
            </TableRow>
        );
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Emetteur
                    </TableCell>
                    <TableCell>
                        Récepteur
                    </TableCell>
                    <TableCell>
                        Motif
                    </TableCell>
                    <TableCell>
                        <TableSortLabel>
                            Montant
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>Solde Avant</TableCell>
                <TableCell>Solde Apres</TableCell>
                    <TableCell>
                        <TableSortLabel>Date</TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel>Mouvement</TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.activity.list.map((idx)=>{
                    return (<ActivityEntry item={idx}/>);
                })}
            </TableBody>
        </Table>
    );
}

export default connect(mapStateToProps)(ActivityTable);
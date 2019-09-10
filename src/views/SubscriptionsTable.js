import React,{useState} from 'react';
import { connect } from 'react-redux';
import {Typography,Table, TableHead, TableRow, TableCell, Button, TableBody, Tab, IconButton, MenuItem, Menu, Chip, TableSortLabel } from '@material-ui/core';
import { AddOutlined, MoreHorizOutlined, FilterList } from '@material-ui/icons';
import { subscription_state } from '../constants';
import { setSubscriptionFilter } from '../actions/actions-creators';
import { orange, lightBlue, green, red } from '@material-ui/core/colors';
import { SUBS_FILTER } from '../actions/actions-types';
import { markSubscriptionAborted, markSubscriptionOngoing, markSubscriptionDone } from '../actions/subs_actions';

function applyFilter(filter='',list=[]){
    switch(filter){
        case SUBS_FILTER.CONFIRMED:{
            return list.filter((val)=>{
                return val.state===subscription_state.done;
            })
        }
        case SUBS_FILTER.ONGOING:{
            return list.filter((val)=>{
                return val.state===subscription_state.ongoing;
            })
        }
        case SUBS_FILTER.WAITING:{
            return list.filter((val)=>{
                return val.state===subscription_state.waiting;
            })
        }
        case SUBS_FILTER.CANCELLED:{
            return list.filter((val)=>{
                return val.state===subscription_state.aborted;
            })
        }
        default:{
            return list;
        }
    }
}

const mapStateToProps=state=>{
    let filter = state.subscriptions.filter;
    let list= state.subscriptions.list;
    return {
        subscriptions:{...state.subscriptions,list:applyFilter(filter,list)}
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        setAborted:(id)=>dispatch(markSubscriptionAborted(id)),
        setOnGoing:(id)=>dispatch(markSubscriptionOngoing(id)),
        setDone:(id)=>dispatch(markSubscriptionDone(id)),
        setFilter:(filter='')=> dispatch(setSubscriptionFilter(filter))
    }
}

function SubscriptionsTable(props){
    function SubRow(prs){
        let item = prs.item;
        const [anchor,setAnchor]=React.useState(null);

        function handleOpen(event){
            setAnchor(event.target);
        }

        function handleClose(){
            setAnchor(null);
        }

        return (
            <TableRow>
                <TableCell>{item.customer.name.first}</TableCell>
                <TableCell>{item.customer.name.last}</TableCell>
                <TableCell>{item.formula.label}</TableCell>
                <TableCell>{item.formula.price} Fcfa/mois</TableCell>
                <TableCell>{item.duration} mois</TableCell>
                <TableCell>{item.card}</TableCell>
                <TableCell>{new Date(item.date).toDateString()}</TableCell>
                <TableCell>
                    {
                        item.state===subscription_state.waiting?
                        <Chip style={{
                            background:orange[200]
                        }} 
                            label="En attente"
                        />:""
                    }
                    {
                        item.state===subscription_state.ongoing?
                        <Chip style={{
                            background:lightBlue[200]
                        }} 
                            label="En cours"
                        />:""
                    }
                    {
                        item.state===subscription_state.done?
                        <Chip style={{
                            background:green[200]
                        }} 
                            label="Exécuté"
                        />:""
                    }
                    {
                        item.state===subscription_state.aborted?
                        <Chip style={{
                            background:red[200]
                        }} 
                            label="Annulé"
                        />:""
                    }
                </TableCell>
                <TableCell>
                    {
                        ((item.state!==subscription_state.done) && (item.state!==subscription_state.aborted)) ?
                        <div>
                        <IconButton onClick={handleOpen}>
                            <MoreHorizOutlined/>
                        </IconButton>
                        <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={handleClose}>
                            {
                                item.state===subscription_state.waiting?
                                <MenuItem onClick={()=>props.setOnGoing(item._id)}>
                                    Marquer comme en cours
                                </MenuItem> :""
                            }

                            {
                                item.state===subscription_state.ongoing?
                                <MenuItem onClick={()=>props.setDone(item._id)}>
                                Marquer comme effectué
                                </MenuItem>:""
                            }

                            {
                                (item.state===subscription_state.waiting) || (item.state===subscription_state.ongoing)?
                                <MenuItem onClick={()=>props.setAborted(item._id)}>
                                    Annuler cet abonnement
                                </MenuItem> :""
                            }

                        </Menu>
                    </div> :""
                    }
                </TableCell>
            </TableRow>
        );
    }

    const [menuAnchor,setAnchor] = React.useState(null);

    function handleOpen(event){
        setAnchor(event.target);
    }

    function handleClose(){
        setAnchor(null);
    }
    const filter =<Menu open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={handleClose}>
    <MenuItem onClick={()=>props.setFilter(SUBS_FILTER.NONE)}>Aucun</MenuItem>
        <MenuItem onClick={()=>props.setFilter(SUBS_FILTER.CONFIRMED)}>Souscription confirmée</MenuItem>
        <MenuItem onClick={()=>props.setFilter(SUBS_FILTER.ONGOING)}>Souscription en cours</MenuItem>
        <MenuItem onClick={()=>props.setFilter(SUBS_FILTER.WAITING)}>Souscription en attente</MenuItem>
        <MenuItem onClick={()=>props.setFilter(SUBS_FILTER.CANCELLED)}>Souscription annulée</MenuItem>
    </Menu>

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2}>Client</TableCell>
                    <TableCell colSpan={2}>Bouquet</TableCell>
                    <TableCell colSpan={4}>Détails</TableCell>
                    <TableCell rowSpan={2}>Actions</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <TableSortLabel
                            active={false}>
                            Prénom
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={false}>
                            Nom
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={false}>
                            Désignation
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={true}>
                            Prix
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={true}>
                            Durée
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={true}>
                            Date d'initiation
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={true}>
                            Carte
                        </TableSortLabel>
                    </TableCell>
                    <TableCell>
                        <TableSortLabel
                            active={true}>
                            Etat
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                props.subscriptions.list.map((sub,idx)=>{
                    return <SubRow item={sub} key={sub._id}/>;
                })
            }
            </TableBody>
        </Table>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(SubscriptionsTable);
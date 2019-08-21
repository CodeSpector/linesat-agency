import React from 'react';
import {fetchBouquets} from '../actions/actions-creators';
import BouquetsTable from './BouquetsTable';
import { connect } from 'react-redux';

import {Grid, Card, CardContent, Typography, Chip} from '@material-ui/core';

function mapStateToProps(state){
    return {
        bouquets:state.bouquets
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchBouquets:()=>dispatch(fetchBouquets()),
    }
}

class BouquetView extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchBouquets();
    }

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <BouquetsTable/>
                </Grid>        
            </Grid>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BouquetView);
import React from 'react';
import SubscriptionTable from './SubscriptionsTable';
import { Grid } from '@material-ui/core';
import { fetchSubscriptions } from '../actions/actions-creators';
import {connect} from 'react-redux';

const mapDispatchToProps=dispatch=>{
    return {
        fetchSubscriptions:()=>dispatch(fetchSubscriptions())
    }
}

class SubscriptionView extends React.Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchSubscriptions();
    }

    render(){
        return (
            <Grid container>
                <Grid item xs={12}>
                    <SubscriptionTable/>
                </Grid>        
            </Grid>
        );
    }
}

export default connect(null,mapDispatchToProps)(SubscriptionView);
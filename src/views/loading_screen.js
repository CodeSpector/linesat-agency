import React from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';

export default function LoadingUI(props){
    return (
        <Container maxWidth="xs" style={{
            width:'100%',
            height:'100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <Typography variant='h4' style={{
                marginBottom:20
            }}>Koris Pay</Typography>
            <div  style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around'
            }}>
                <CircularProgress size={60} color={'primary'} variant={"indeterminate"}/>
                <Typography style={{
                    marginLeft:45
                }}>Préparation de votre interface</Typography>
            </div>
        </Container>
    );
}
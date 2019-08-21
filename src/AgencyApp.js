import React from 'react';
import HomeView from './views/Home';
import {connect} from 'react-redux';
import clsx from 'clsx';
import { Switch,Route,Redirect,BrowserRouter} from "react-router-dom";
import { tryAuth, setGeneralMessage } from './actions/actions-creators';
import { blue, amber, cyan, green } from '@material-ui/core/colors';

import { Typography, Grid, List, ListItem, TextField, Button, Paper, FormGroup, FormLabel, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import {NavigateNextRounded, AccountBoxRounded, CheckCircle, Warning, ErrorOutline, InfoOutlined, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const mapDispatchToProps=dispatch=>{
    return {
        tryDefaultAuth:(credentials={})=>dispatch(tryAuth(credentials)),
        notify:(msg,type) => dispatch(setGeneralMessage(msg,type))
    }
}

const mapStateToProps=state=>{
    return {
        logged:state.user.logged,
        requireCredentials:state.user.requireCredentials,
        message:state.message
    }
}

const useStyles=makeStyles({
    loginButton:{
      background:"rgba(0,0,0,67%)",
      color:cyan[600],
      height:45
    }
  })
  
const useStyles1= makeStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor:"rgba(0,0,0,67%)",
    },
    info: {
      backgroundColor:blue[600],
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant:{
      opacity: 0.9,
      marginRight:8,
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
});
  
const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorOutline,
    info: InfoOutlined,
};

function LoginComponent(props){
    const [creds,setcreds]=React.useState({username:'',password:''});
    function handleFormchange(event){
      let name=event.target.name;
      let value=event.target.value;
      let lastCreds={...creds};
      lastCreds[name]=value;
      setcreds(lastCreds);
    }

    function handleSubmit(ev){
      props.tryDefaultAuth(creds);
    }

    if(props.logged){
      return (<div><Redirect to="/bouquets"/></div>);
    }

    return (
        <Grid container alignItems='center' justify='center'>
            <Grid item xs={12} style={{textAlign:'center'}}>
                <Typography variant='h4'>LineSat</Typography>
                <div style={{height:26}}></div>
                <Typography variant='h6'>Espace d'administration</Typography>
            </Grid>
            <Grid item xs={12}>
              <div style={{height:26}}></div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <form name='connection' autoComplete='off'>
                <FormGroup>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <div style={{height:26}}></div>
                  <TextField type='text' variant='outlined' fullWidth name='username' value={creds.username} onChange={handleFormchange}/>
                </FormGroup>
                <div style={{height:26}}></div>
                <FormGroup>
                  <FormLabel>Mot de passe</FormLabel>
                  <div style={{height:26}}></div>
                  <TextField type='password' variant='outlined' fullWidth name='password' value={creds.password} onChange={handleFormchange} />
                </FormGroup>
                <div style={{height:26}}></div>
                <FormGroup>
                  <Button fullWidth onClick={handleSubmit}>
                    Connexion
                    <NavigateNextRounded/>
                  </Button>
                </FormGroup>
              </form>
            </Grid>
        </Grid>
    );
}

const ConnectLogin = connect(mapDispatchToProps,mapDispatchToProps)(LoginComponent);

function SnackWrapper(props){
    const classes= useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon['info'];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <Close className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  }

class  AgencyApp extends React.Component{
    componentDidMount(){
        setTimeout(()=>{
            this.props.tryDefaultAuth();
        },3000);
    }

    closeSnack(){
      this.props.notify('')
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/login'>
                        <ConnectLogin logged={this.props.logged} requireCredentials={this.props.requireCredentials}/>
                    </Route>
                    <Route path='/'>
                        <HomeView/>
                    </Route>
                </Switch>
                <Snackbar anchorOrigin={{horizontal:'right',vertical:'bottom'}} open={(Boolean(this.props.message.text) && this.props.message.text!=='')} autoHideDuration={2500} onClose={()=>this.closeSnack()}>
                    <SnackWrapper variant={this.props.message.type} message={this.props.message.text} onClose={()=>this.closeSnack()}/>
                </Snackbar>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AgencyApp);
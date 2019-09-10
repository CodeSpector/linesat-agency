import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import { setGeneralMessage } from '../actions/actions-creators';
import { PersonOutline } from '@material-ui/icons';
import { authenticate } from '../actions/user_actions';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapStateToProps=state=>{
    return {
        logged:state.user.logged,
        requireCredentials:state.user.requireCredentials,
        message:state.message
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        tryDefaultAuth:(credentials={username:'',password:''})=>dispatch(authenticate(credentials)),
        notify:(msg,type) => dispatch(setGeneralMessage(msg,type))
    }
}

function SignIn(props) {
    const classes = useStyles();
    const [creds,setcreds]=React.useState({username:'',password:''});

    function handleFormchange(event){
        let name=event.target.name;
        let value=event.target.value;
        let lastCreds={...creds};
        lastCreds[name]=value;
        setcreds(lastCreds);
    }

    function handleSubmit(ev){
        ev.preventDefault();
        props.tryDefaultAuth(creds);
    }

    if(props.logged){
        return <Redirect to='/' />
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonOutline/>
                </Avatar>
                <Typography component="h1" variant="h6">
                   Agence KorisPay
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Nom d'utilisateur"
                    name="username"
                    autoComplete="email"
                    autoFocus
                    onChange={handleFormchange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleFormchange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Se connecter
                </Button>
                </form>
            </div>
        </Container>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
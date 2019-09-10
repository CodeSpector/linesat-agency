import React from 'react';
import HomeScreen from './views/home_screen';
import {connect} from 'react-redux';
import { Switch,Route,BrowserRouter} from "react-router-dom";
import {Snackbar, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import SignIn from './views/signin_screen';
import SnackWrapper from './views/snackwrapper';
import { setGeneralMessage } from './actions/actions-creators';
import { authenticate } from './actions/user_actions';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffc400',
      main: '#1e88E5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
});

const mapStateToProps=state=>{
  return {
    message:state.message
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    tryDefaultAuth:(credentials={username:'',password:''})=>dispatch(authenticate(credentials)),
    notify:(msg,type) => dispatch(setGeneralMessage(msg,type))
  }
}

class  AgencyApp extends React.Component{

  componentDidMount(){
    setTimeout(()=>{
      this.props.tryDefaultAuth();
    },3000);
  }

  closeSnack(){
    this.props.notify('');
  }

  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path='/login'>
              <SignIn/>
            </Route>
            <Route path='/'>
              <HomeScreen/>
            </Route>
          </Switch>
          <Snackbar anchorOrigin={{horizontal:'right',vertical:'bottom'}} open={(Boolean(this.props.message.text) && this.props.message.text!=='')} autoHideDuration={2500} onClose={()=>this.closeSnack()}>
            <SnackWrapper variant={this.props.message.type} message={this.props.message.text} onClose={()=>this.closeSnack()}/>
          </Snackbar>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AgencyApp);
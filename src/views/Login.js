

/*
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

*/
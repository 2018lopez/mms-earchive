import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate  } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import {login, userByRole,resetPassword} from '../../service/call'

const Login = ()=>{

  
    const [username, setUsername] = React.useState([]);
    const [password, setPassword] = React.useState([]);
    const [resetusername, setResetUsername] = React.useState([]);
    const [resetpassword, setResetPassword] = React.useState([]);
    const[status, setStatus] = React.useState([])
    const[msg, setMsg]=React.useState([])
   
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);


    const handleClickOpen = () => {
      setDialogOpen(true);
    };
  
    const handleClose = () => {
      setDialogOpen(false);
      setResetPassword('')
      setResetUsername('')
    };

    const handleResetPassword = async(e) =>{
      e.preventDefault()
      const response = await resetPassword({resetusername, resetpassword})
      try{
        if(response.status === 200){
          
          alert(response.data.message)
          
          setTimeout(() => setDialogOpen(false), 3000)


        }
      }catch(e){

        alert(response.data.message)
        
      }
      

    }
    const handleLogin = async (e) =>{
      
        e.preventDefault()
        const response = await login({ username, password });
        const role = await userByRole(username);
        const user_type = role.data.type
        
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.username)

        const dashboardRedirect = (userType)=>{

          switch (userType) {
            case 'Admin':
              navigate('/Admin/Home');
              break;
            case 'Vendor':
              navigate('/Vendor/Home')
              break;
          
            default:
              break;
            }
        }

        try{

          if(response.status === 200){
            setStatus('success')
            setMsg('Login Successfully')
            setOpen(true)
            
            setTimeout(() => dashboardRedirect(user_type), 3000)
  
  
          }
        }catch(e){

          setStatus('error')
          setMsg('Unable to Login')
          setOpen(true)
          setTimeout(() =>  setOpen(false), 4000)
          
        }
     
   
    
       
    }

    

    
    return(
      
      <div>
        
        <Header/>

        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={ username }
                    onChange={ (e) => setUsername(e.target.value) }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
              autoComplete="current-password"
            />
            <Snackbar open={open}>
              <Alert severity={status}>{msg}</Alert>
            </Snackbar>
         

            
            <Button
              type="submit"
              fullWidth
              onClick={handleLogin}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color='success'
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                
                <Button
             
             
              onClick={handleClickOpen}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Forgot Password
            </Button>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Forgot Password </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Enter Username and new password to reset password
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resetUsername"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            value={resetusername }
            onChange={ (e) => setResetUsername(e.target.value) }
          />
           <TextField
            autoFocus
            margin="dense"
            id="resetPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            value={resetpassword }
            onChange={ (e) => setResetPassword(e.target.value) }
          />
             
        </DialogContent>
        <DialogActions>
          <Button color='success' onClick={handleResetPassword }>Reset Password</Button>
          <Button color='error' onClick={handleClose}>Cancel</Button>
          
        </DialogActions>
      </Dialog>
       </Container>
       <Footer/>
    </div>
  );

};

export default  Login;
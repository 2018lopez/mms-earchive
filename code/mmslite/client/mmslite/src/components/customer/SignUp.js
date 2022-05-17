
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {  AutoCompleteFieldController } from '../lib/component'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import {create, getRoles, getDistricts} from '../../service/call'
import {  useNavigate  } from 'react-router-dom';

import { useForm } from 'react-hook-form';

const SignUp = ()=>{

    const [name, setName] = React.useState([]);
    const [address1, setAddress1] = React.useState([]);
    const [address2, setAddress2] = React.useState([]);
    const [phone, setPhone] = React.useState([]);
    const [email, setEmail] = React.useState([]);
    const [username, setUsername] = React.useState([]);
    const [password, setPassword] = React.useState([]);
    const [ roleOptions, setroleOptions ] = React.useState([]);
    const [ districtOptions, setDistrictOptions ] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const[status, setStatus] = React.useState([])
    const[msg, setMsg]=React.useState([])
    const navigate = useNavigate();
   
    React.useEffect(()=>{

      roles()
      districts()

  }, []);

  const roles = async() =>{

    const response = await getRoles()
    setroleOptions(response.data)
  }



  const districts = async() => {

    const response = await getDistricts()
    setDistrictOptions(response.data)

  }

    //FORM HOOK 
    const {  control,  watch,  formState: { errors } } = useForm({
      shouldUnregister: true
  });

    const roleSelect = watch('role')
    const districtSelect = watch('district')

    const signIn = async (e) =>{
        e.preventDefault()

        let district = districtSelect.name
        let userType = roleSelect.type

        const response = await create({name,address1, address2, district , phone, email, username, password, userType})

        try{

          if(response.status === 200){
            setStatus('success')
            setMsg(response.data.msg)
            setOpen(true)
            
            setTimeout(() => navigate('/Login'), 3000)
  
  
          }
        }catch(e){

          setStatus('error')
          setMsg('Unable to Create Account')
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
              Sign up
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    error={name === ""}
                    helperText={name === "" ? 'FullName field is empty!' : ' '}
                    onChange={ (e) => setName(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address1"
                    label="Address 1"
                    name="address1"
                    autoComplete="address1"
                    value ={ address1}
                    error={address1 === ""}
                    helperText={address1=== "" ? 'Address 1 field is empty!' : ' '}
                    onChange={ (e) => setAddress1(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address2"
                    label="Address 2"
                    name="address2"
                    autoComplete="address2"
                    value={ address2}
                    error={address2 === ""}
                    helperText={address2 === "" ? 'Address 2 field is empty!' : ' '}
                    onChange={ (e) => setAddress2(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                <AutoCompleteFieldController
                    options={districtOptions.map(el => ({...el, label: (el.name )}) )}
                    //errors={errors.product || null}
                    control={control}
                    name="district"
                    label="Districts"
                    rules={{ required: "District is Required!" }}
                
                />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    value={phone}
                    error={phone === ""}
                    helperText={phone === "" ? 'Phone field is empty!' : ' '}
                    onChange={ (e) => setPhone(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    error={email === ""}
                    helperText={email === "" ? 'Email field is empty!' : ' '}
                    onChange={ (e) => setEmail(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    error={username === ""}
                    helperText={username === "" ? 'Username field is empty!' : ' '}
                    onChange={ (e) => setUsername(e.target.value) }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    error={password === ""}
                    helperText={password === "" ? 'Password field is empty!' : ' '}
                    onChange={ (e) => setPassword(e.target.value) }
                  />
                </Grid>

                <Grid item xs={12}>
                <AutoCompleteFieldController
                    options={roleOptions.map(el => ({...el, label: (el.type )}) )}
                    errors={errors.role || null}
                    control={control}
                    name="role"
                    label="User Type"
                    rules={{ required: "User Type is Required!" }}
                />
                </Grid>
                
              </Grid>
              <Snackbar open={open}>
              <Alert hidden severity={status}>{msg}</Alert>
              </Snackbar>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signIn}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/Login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
       
        <Footer/>
        </div>
    );

};

export default SignUp
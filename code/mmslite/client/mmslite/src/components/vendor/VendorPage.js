// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';



// import {Route, Routes } from "react-router-dom";

// import CssBaseline from "@material-ui/core/CssBaseline";
// import { ThemeProvider } from "@material-ui/core/styles";

// import theme from "assets/theme/theme.js";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from './layouts/Admin';


import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import {Link} from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import {  useNavigate  } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { dRoutes } from './dRoutes';

const viewsMain = ['Home', 'Orders', 'Stall', 'Products', 'Report'];
const viewsLower = ['Inquiry', 'Billing', 'Settings'];

const drawerWidth = 240;


const openedMixin = (theme) => ({
  // top: '10%',
//   backgroundColor: 'green',
//   color: 'white',
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  // top: '10%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({        
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    // top: '10%',    
    backgroundColor: '#0a874f',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    }),
  ...(open && {      
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({       
    width: drawerWidth,    
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

//name to VendorPage
export default function MiniDrawer() {    

  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async (e) =>{
      
    e.preventDefault() 
   localStorage.removeItem('token')
   localStorage.removeItem('username')
   handleClose()
    navigate('/Login');

  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // display: 'flex'
  
  
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6"   component="div">
            Vendor 
          </Typography>
           
          
          <Grid container justifyContent="flex-end"> 
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>  Welcome, {localStorage.getItem('username')}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
               
              </Menu>
            </Grid>
         

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          
          <IconButton onClick={handleDrawerClose}>
            
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />  
        {/*main view list (pages) */}
        <List>             
          {viewsMain.map((text, index) => (
            <Link style={{textDecoration: 'none', color:'inherit'}} to={`/Vendor/${text}`}>
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >            
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',                  
                }}
              >
                  {index === 0 ? <DashboardIcon/> : index === 1 ? <ShoppingCartIcon/> : index === 2 ? <StorefrontIcon/> :index === 3  ?  <InventoryIcon/> : index === 4 ? <EventNoteIcon/> : index ===5}
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>

              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />              
            </ListItemButton>
            </Link>
          ))}        
        </List>
        <Divider />

        {/*secondary view lists (pages) */}
        <List>
          {viewsLower.map((text, index) => (
            <Link style={{textDecoration: 'none', color:'inherit'}} to={`/Vendor/${text}`}>
            <ListItemButton
              key={text}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {index === 0 ? <ContactSupportIcon/> : index === 1 ? <ReceiptIcon/> : <SettingsIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>   
            </Link>         
          ))}          
        </List>       
      </Drawer>

      {/* content of each items selected*/}
      <Box sx={{ flexGrow: 1, p: '2%'}}>
        <DrawerHeader />         
        {dRoutes}            
      </Box>
    </Box>
  );
              
}
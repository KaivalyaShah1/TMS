import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import logo from './assets/logo.png';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import { PropertyList } from './pages/PropertyList';
import './App.css';
import PropertyDetail from './pages/PropertyDetail';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { GetUserData, SetUserData } from './utils/utils';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import AddProperty from './pages/AddProperty';
import MapIcon from '@mui/icons-material/Map';
import Maps from './pages/Maps';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [userData, setuserData] = React.useState(null);

  React.useEffect(() => {
    const userData = GetUserData();
    if (userData) {
      setuserData(true);
    }
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setuserData(null);
    SetUserData(null);
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarComponent open={open} setOpen={setOpen} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={open}
        >
          <DrawerHeader>
            <img src={logo} width={80} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Link to='/maps' style={{ color: 'black', textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <MapIcon />
                </ListItemIcon>
                <ListItemText primary='Maps' />
              </ListItem>
            </Link>
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
              <ListItem button>
                <ListItemIcon>
                  <MapsHomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary='Properties' />
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary='About' />
            </ListItem>
            {!userData && (
              <>
                <Link
                  to='/login'
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary='Login' />
                  </ListItem>
                </Link>
                <Link
                  to='/signup'
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <HowToRegIcon />
                    </ListItemIcon>
                    <ListItemText primary='Sign Up' />
                  </ListItem>
                </Link>
              </>
            )}
            {userData && (
              <>
                <Link
                  to='/profile'
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <PersonSharpIcon />
                    </ListItemIcon>
                    <ListItemText primary='Profile' />
                  </ListItem>
                </Link>

                <ListItem button onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Box className='main-container'>
            <Routes>
              <Route path='/' element={<PropertyList />} />
              <Route
                path='propertyDetails/:propertyId'
                element={<PropertyDetail />}
              />
              <Route
                path='maps'
                element={
                  <Maps
                    regionCoord={[48.864716, 2.349014]}
                    regionName='Paris'
                  />
                }
              />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='addproperty' element={<AddProperty />} />
            </Routes>
          </Box>{' '}
        </Main>
      </Box>
    </BrowserRouter>
  );
}

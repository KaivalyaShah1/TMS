import React from 'react';
import {
  Grid,
  TextField,
  Button,
  CardContent,
  Card,
  Box,
  CardActions,
} from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { SetUserData } from '../utils/utils';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        SetUserData(data);
        window.location.href = '/';
      });
  };

  return (
    <Box
      sx={{
        margin: 'auto',
        maxWidth: '500px',
        padding: '1rem',
      }}
    >
      <Card>
        <CardContent>
          <Grid container spacing={2} padding={(0, 2)}>
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: '3rem',
                textAlign: 'center',
              }}
            >
              <img src={logo} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='standard-basic'
                label='Email'
                name='email'
                fullWidth
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='standard-basic'
                label='Password'
                name='password'
                fullWidth
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
        </CardActions>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          FIRST TIME HERE? <Link to='/signUp'>REGISTER</Link>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;

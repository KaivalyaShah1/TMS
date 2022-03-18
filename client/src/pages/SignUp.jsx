import React from 'react';
import {
  Grid,
  TextField,
  Button,
  CardContent,
  Card,
  Box,
  CardActions,
  Select,
  MenuItem,
} from '@mui/material';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { SetUserData } from '../utils/utils';

const SignUp = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value);
    } else if (e.target.name === 'role') {
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: name,
        email,
        password,
        role,
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
                label='Name'
                name='name'
                fullWidth
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={name}
                onChange={handleChange}
              />
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
                type={'password'}
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='standard-basic'
                label='Confirm Password'
                name='confirmPassword'
                fullWidth
                type={'password'}
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                id='standard-basic'
                label='Role'
                name='role'
                fullWidth
                variant='standard'
                autoComplete='off'
                autoCorrect='off'
                value={role}
                onChange={handleChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='Tenant'>Tenant</MenuItem>
                <MenuItem value='Owner'>Owner</MenuItem>
              </Select>
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
            Sign Up
          </Button>
        </CardActions>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          Already Have an Account? <Link to='/login'>Login</Link>
        </Box>
      </Card>
    </Box>
  );
};

export default SignUp;

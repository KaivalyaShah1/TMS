import React, { Fragment } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormLabel,
} from '@mui/material';
import { GetToken } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  // const validationSchema = Yup.object().shape({
  //   fullname: Yup.string().required('Fullname is required'),
  //   username: Yup.string()
  //     .required('Username is required')
  //     .min(6, 'Username must be at least 6 characters')
  //     .max(20, 'Username must not exceed 20 characters'),
  //   email: Yup.string().required('Email is required').email('Email is invalid'),
  //   password: Yup.string()
  //     .required('Password is required')
  //     .min(6, 'Password must be at least 6 characters')
  //     .max(40, 'Password must not exceed 40 characters'),
  //   confirmPassword: Yup.string()
  //     .required('Confirm Password is required')
  //     .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  //   acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
  // });
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append('files1', data.attachments[0]);

    const datatopass = {
      name: data.name,
      address: data.address,
      description: data.description,
      type: data.type,
      position: {
        lat: data.latitude,
        lng: data.longitude,
      },
      price: data.price,
      features: data.features,
      currency: data.currency,
      contactNumber: data.contactNumber,
      contactEmail: data.contactEmail,
    };
    debugger;
    Object.keys(datatopass).forEach((key) => {
      if (key == 'position') {
        formData.append(key, JSON.stringify(datatopass[key]));
      } else {
        formData.append(key, datatopass[key]);
      }
    });

    fetch('http://localhost:5000/properties', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'x-access-token': GetToken(),
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        navigate('/');
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      <Paper>
        <Box p={3}>
          <Typography variant='h6'>Add Property</Typography>
        </Box>
        <Box px={3} py={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='name'
                name='name'
                label='Name'
                fullWidth
                margin='dense'
                {...register('name')}
                error={errors.name ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='address'
                name='address'
                label='Address'
                fullWidth
                margin='dense'
                {...register('address')}
                error={errors.address ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.address?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='description'
                name='description'
                label='Description'
                fullWidth
                margin='dense'
                multiline
                rows={4}
                {...register('description')}
                error={errors.description ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.description?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select
                fullWidth
                id='type'
                name='type'
                label='Type'
                {...register('type')}
                defaultValue='Residential'
              >
                {['Residential', 'Commercial', 'Industrial', 'Land'].map(
                  (item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
            </Grid>
            <Grid item xs={12} sm={12} mt={1}>
              <Select
                fullWidth
                id='currency'
                name='currency'
                label='Currency'
                {...register('currency')}
                defaultValue='CAD'
              >
                {['$', 'CAD'].map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='price'
                name='price'
                label='Price'
                fullWidth
                margin='dense'
                type={'number'}
                {...register('price')}
                error={errors.price ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.price?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='features'
                name='features'
                label='Features'
                fullWidth
                multiline
                rows={2}
                placeholder=''
                margin='dense'
                {...register('features')}
                error={errors.features ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                For multiple features separate with comma( , )
                {errors.features?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2}>
              <TextField
                required
                id='latitude'
                name='latitude'
                label='Latitude'
                fullWidth
                margin='dense'
                type={'number'}
                {...register('latitude')}
                error={errors.latitude ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.latitude?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2}>
              <TextField
                required
                id='longitude'
                name='longitude'
                label='Longitude'
                fullWidth
                type={'number'}
                margin='dense'
                {...register('longitude')}
                error={errors.longitude ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.longitude?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='contactNumber'
                name='contactNumber'
                label='Contact Number'
                fullWidth
                type={'number'}
                margin='dense'
                {...register('contactNumber')}
                error={errors.contactNumber ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.contactNumber?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id='email'
                name='email'
                label='Email'
                fullWidth
                margin='dense'
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant='inherit' color='textSecondary'>
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} mt={2}>
              <FormLabel component='legend'>
                <Typography variant='inherit' color='textSecondary'>
                  Property Image
                </Typography>
              </FormLabel>
              <Controller
                name='attachments'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <input
                    type='file'
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                    multiple
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleSubmit(onSubmit)}
            >
              Add Property
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  );
};

export default AddProperty;

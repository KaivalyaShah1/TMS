import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  Avatar,
  TextField,
  CardActions,
  Button,
} from '@mui/material';
import PropertyTypeCardBadge from '../components/PropertyTypeCardBadge';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';

const PropertyDetail = () => {
  let { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [enquiry, setenquiry] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/properties/${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProperty(data.data);
      });
  }, [propertyId]);

  const handleChange = (e) => {
    setenquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(enquiry);
  };

  return (
    property && (
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} md={8}>
          <Card style={{ marginBottom: '1rem' }}>
            <CardContent>
              <PropertyTypeCardBadge type={property.type} />
              <Box
                sx={{
                  marginBottom: '1rem',
                }}
              >
                <Typography variant='h4'>{property.name}</Typography>
                <Typography variant='body2'>
                  <b>Created At: </b>
                  {property.createdAt}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card style={{ marginBottom: '1rem' }}>
            <CardContent>
              <img className='img' src={property.images[0]} height={400} />
              <Box
                sx={{
                  padding: '1rem',
                }}
              >
                <Box>
                  <Typography variant='subtitle1' mb={2}>
                    {property.description && property.description}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card style={{ marginBottom: '1rem' }}>
            <CardContent>
              <div className='cardHeader'>
                <b>Address</b>
              </div>
              {property.address || 'No address'}
            </CardContent>
          </Card>
          <Card style={{ marginBottom: '1rem' }}>
            <CardContent>
              <div className='cardHeader'>
                <b>Features</b>
              </div>
              {property.features &&
                property.features
                  .toString()
                  .split(',')
                  .map((feature, i) => (
                    <Chip
                      key={i}
                      avatar={
                        <Avatar>
                          <ApartmentSharpIcon />
                        </Avatar>
                      }
                      label={feature}
                      style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                    />
                  ))}
            </CardContent>
          </Card>
          <Card style={{ marginBottom: '1rem' }}>
            <CardContent>
              <div className='cardHeader'>
                <b>Pricing</b>
              </div>
              <p className='price'>
                {property.currency || '$'} {property.price || '00.00'}
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4} md={4}>
          <Card
            sx={{
              borderTop: '3px solid #1976D2',
            }}
          >
            <CardContent>
              <Typography variant='h5'>
                <b>Enquire for more Information</b>
              </Typography>
              <Box sx={{ marginTop: '1rem' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label='Title'
                      name='title'
                      variant='standard'
                      fullWidth
                      autoComplete='off'
                      autoCorrect='off'
                      value={enquiry.title}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='Email'
                      name='email'
                      variant='standard'
                      fullWidth
                      autoComplete='off'
                      autoCorrect='off'
                      value={enquiry.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label='Message'
                      name='message'
                      variant='standard'
                      multiline
                      rows={4}
                      fullWidth
                      autoComplete='off'
                      autoCorrect='off'
                      value={enquiry.message}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button size='large' variant='contained' onClick={handleSubmit}>
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  );
};

export default PropertyDetail;

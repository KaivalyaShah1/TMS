import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import PropertyTypeCardBadge from './PropertyTypeCardBadge';
import { useNavigate } from 'react-router-dom';
import { GetToken, isLoggedIn } from '../utils/utils';

const PropertyCard = (props) => {
  const {
    type,
    createdAt,
    images,
    name,
    description,
    property_id,
    price,
    currency,
  } = props.property;
  const isLoggedin = isLoggedIn();

  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const confirm = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (confirm) {
      fetch(`http://localhost:5000/properties/${property_id}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': GetToken(),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
        })
        .catch((err) => {
          debugger;
        });
    }
  };

  return (
    <Grid item lg={3} md={4}>
      <Card
        onClick={() => {
          // history.push(`/propertyDetails/${property_id}`);
          navigate(`/propertyDetails/${property_id}`);
        }}
        sx={{ width: '100%', cursor: 'pointer' }}
      >
        <CardContent>
          {/* <Paper sx={{ width: '100%' }}> */}
          <img className='img' src={images[0]} width={370} height={200} />
          <Box
            sx={{
              padding: '1rem',
            }}
          >
            <PropertyTypeCardBadge type={type} />
            <Box
              sx={{
                marginBottom: '1rem',
              }}
            >
              <Typography variant='subtitle1'>{name}</Typography>
              <Typography variant='body2'>{createdAt}</Typography>
            </Box>
            <Box
              sx={{
                height: '144px',
              }}
            >
              <Typography variant='body2' mb={2}>
                {description && description.substring(0, 160)}
              </Typography>
              <p className='price'>
                {currency || '$'} {price || '00.00'}
              </p>
            </Box>
          </Box>
          <Box mt={2}>
            <Button
              variant='contained'
              color='error'
              onClick={handleDelete}
              fullWidth
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='secondary'
              fullWidth
              style={{
                marginTop: '1rem',
              }}
            >
              Edit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PropertyCard;

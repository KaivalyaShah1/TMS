import { Grid, styled, useTheme, Paper, Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
export const PropertyList = () => {
  const [properties, setproperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/properties')
      .then((res) => res.json())
      .then((data) => setproperties(data.data));
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {properties &&
          properties.map((property) => (
            <PropertyCard property={property} key={property.property_id} />
          ))}
      </Grid>
      <Fab
        sx={{
          position: 'fixed',
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        color='primary'
        onClick={() => {
          navigate('/addproperty');
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

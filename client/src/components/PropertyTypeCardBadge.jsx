import { Box } from '@mui/system';
import React from 'react';

const PropertyTypeCardBadge = ({ type }) => {
  const background = (type) => {
    switch (type) {
      case 'Residential':
        return '#EB445A';
        break;
      case 'Commercial':
        return '#9006F6';
        break;
      case 'Industrial':
        return '#FFC409';
        break;
      case 'Land':
        return '#2DD36F';
        break;
      default:
        return '#2DD36F';
        break;
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: background(type),
        width: '100px',
        textAlign: 'center',
        borderRadius: '15px',
        marginBottom: '1rem',
        color: 'white',
        fontSize: '0.8rem',
      }}
    >
      {type}
    </Box>
  );
};

export default PropertyTypeCardBadge;

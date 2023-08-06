import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const trackingData = [
  {
    status: 'En attente de réception',
    location: 'Dépôt d\'expédition',
    timestamp: '2023-07-25 09:30',
  },
  {
    status: 'En cours de livraison',
    location: 'Centre de tri',
    timestamp: '2023-07-25 12:15',
  },
  {
    status: 'Livré',
    location: 'Domicile du destinataire',
    timestamp: '2023-07-25 15:00',
  },
];

const SuiviEchange = () => {
  return (
    <div     sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: 1, left : 250 , position : "relative" , width :1400 }}>

    <Box sx={{padding: 1, left : 250 , position : "relative" , width :1500 }}>
      <Typography variant="h5" gutterBottom>
        Suivi de l'échange de colis
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {trackingData.map((data, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={data.status}
                  secondary={`Emplacement: ${data.location} - Heure: ${data.timestamp}`}
                />
              </ListItem>
              {index !== trackingData.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
    </div>
  );
};

export default SuiviEchange;

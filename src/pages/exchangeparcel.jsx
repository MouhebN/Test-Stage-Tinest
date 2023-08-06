import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ExchangeColis = () => {
  const [colisData, setColisData] = React.useState({
    senderName: '',
    senderAddress: '',
    receiverName: '',
    receiverAddress: '',
    description: '',
  });

  const handleExchangeColis = () => {
    // Implement your logic to handle the colis exchange here
    console.log('Exchanged Colis Data:', colisData);
    // You can also update your database or backend with the exchanged colis data
    setColisData({
      senderName: '',
      senderAddress: '',
      receiverName: '',
      receiverAddress: '',
      description: '',
    });
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: 1, left : 250 , position : "relative" , width :1500 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Sender Details
        </Typography>
        <TextField
          label="Name"
          value={colisData.senderName}
          onChange={(e) => setColisData({ ...colisData, senderName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={colisData.senderAddress}
          onChange={(e) => setColisData({ ...colisData, senderAddress: e.target.value })}
          fullWidth
          margin="normal"
        />
        {/* Add other sender details as needed */}
      </Paper>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          Receiver Details
        </Typography>
        <TextField
          label="Name"
          value={colisData.receiverName}
          onChange={(e) => setColisData({ ...colisData, receiverName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={colisData.receiverAddress}
          onChange={(e) => setColisData({ ...colisData, receiverAddress: e.target.value })}
          fullWidth
          margin="normal"
        />
        {/* Add other receiver details as needed */}
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, gridColumn: 'span 2' }}>
        <Typography variant="h5" gutterBottom>
          Colis Description
        </Typography>
        <TextField
          label="Description"
          value={colisData.description}
          onChange={(e) => setColisData({ ...colisData, description: e.target.value })}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        {/* Add other colis description fields as needed */}
        <Button variant="contained" onClick={handleExchangeColis}>
          Exchange Colis
        </Button>
      </Paper>
    </Box>
  );
};

export default ExchangeColis;

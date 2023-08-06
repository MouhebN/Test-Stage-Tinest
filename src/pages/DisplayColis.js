import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from 'antd';
import QRCode from 'react-qr-code';
import { useColisContext } from './ColisContext';

const DisplayColis = () => {
  const { colisList } = useColisContext();

  const handlePrint = (qrCode) => {
    // Implement your logic for printing the colis here
    alert(`Printing Colis with QR Code: ${qrCode}`);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Liste des colis créés:
      </Typography>
      {colisList.map((colis) => (
        <Paper key={colis.qrCode} elevation={3} sx={{ padding: 2, marginBottom: 10 }}>
          <Typography variant="h6" gutterBottom>
            Colis {colis.qrCode}
          </Typography>
          <Typography>Prix: {colis.prix}</Typography>
          <Typography>Type de Payment: {colis.typeDePayment}</Typography>
          <Typography>Gouvernorate: {colis.Gouvernorate}</Typography>
          <Typography>Status: {colis.status}</Typography>
          <Typography>Largeur: {colis.largeur}</Typography>
          <Typography>Hauteur: {colis.hauteur}</Typography>
          <Typography>Code Barre: {colis.codeBarre}</Typography>
          <Typography variant="h6" gutterBottom>
            QR Code généré:
          </Typography>
          <QRCode value={colis.qrCode} />
          <Button variant="contained" style={{ marginTop: 20 }} onClick={() => handlePrint(colis.qrCode)}>
            Imprimer
          </Button>
        </Paper>
      ))}
    </div>
  );
};

export default DisplayColis;

import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from 'axios';
import qrcode from 'qrcode'; // Import the qrcode library
import QRCode from 'react-qr-code'; // Import the react-qr-code component
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'; // Import the TablePagination component
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const columns = [
  { id: 'Nomprenom', label: 'Nom & Prénom',minWidth:100 },
  { id: 'adresse', label: 'Adresse' , minWidth:100},
  { id: 'codepostale', label: 'Code postale', minWidth:100},
  { id: 'Governorate', label: 'Governaurate', minWidth:100},
  { id: 'Téléphone' , label: 'Téléphone', minWidth:100},
  { id: 'prix', label: 'Prix', minWidth: 100 },
  { id: 'typeDePayment', label: 'Type de Paiement', minWidth: 150 },
  { id: 'hauteur', label: 'Hauteur', minWidth: 100 },
  { id: 'largeur', label: 'Largeur', minWidth: 100 },
  { id: 'qrCode', label: 'QR Code', minWidth: 20 },
  { id: 'actions', label: 'Actions', minWidth: 150 }, // Nouvelle colonne pour les boutons d'action
];

const generateInvoiceHTML = (client, colis, qrCodeImage) => {
  const fraisLivraison = 8; // Frais de livraison par défaut
  const total = parseFloat(colis.prix) + fraisLivraison;

  
  // Obtenir la date et l'heure actuelles
  const dateActuelle = new Date();
  const dateFormatted = dateActuelle.toLocaleString();

  const template = `<!DOCTYPE html>
    <html>
    <head>
      <title>Colis Facture</title>
      <style>
        /* Ajouter les styles CSS ici */
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .facture-container {
          border: 2px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          margin-top: 20px;
        }
        .facture-header {
          display: flex;
          justify-content: space-between;
        }
        .facture-title {
          font-size: 24px;
          padding:30px 20px;
          text-align: center;
        }
        .facture-date {
          font-size: 14px;
        }
        .facture-info {
          margin-top: 10px;
          font-size: 14px;
        }
        .facture-table {
          border-collapse: collapse;
          margin-top: 20px;
          
        }
        .facture-table th,
        .facture-table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: center;
        }
        .facture-table th {
          background-color: #f0f0f0;
        }
        .qr-code-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
        .qr-code-id {
          font-size: 12px;
          text-align: center;
        }
      </style>
    </head>
    <body>
     <div class="facture-container">
     <div class="facture-header">
     <div class="facture-title" text-align: center;>TinestDelivery</div>
     <div class="facture-date">Date de création: ${dateFormatted}</div>
     </div>
     <div class="facture-info">
      <p>Nom & prénom: ${client.Nomprenom}</p>
      <p>Adresse: ${client.adresse}</p>
      <p>Code postal: ${client.codepostale}</p>
      <p>Gouvernorat: ${client.Gouvernorate}</p>
      <p>Téléphone: ${client.num_client}</p>
      <table class="facture-table">
      <tr>
            <th>Prix</th>
            <th>Frais de livraison</th>
            <th>Total</th>
          </tr>  
          <tr>       
            <td>${colis.prix}</td>
            <td>${fraisLivraison}</td>
            <td>${total.toFixed(2)}</td>
          </tr>
      </table>   
      <table class="facture-table"> 
         <tr>
              <th>Type de paiement</th>
              <th>Hauteur</th>
              <th>Largeur</th>
         </tr>
         <tr>
            <td>${colis.typeDePayment}</td>
            <td>${colis.hauteur}</td>
            <td>${colis.largeur}</td>
         </tr>
      </table>
        
      <div class="qr-code-container">
        <img src="${qrCodeImage}" style="padding: 20px; margin-top: 50px;" />
      </div>
      <div class="qr-code-id">
        <p>ID: ${colis.qrCode}</p>
      </div>
      </div>
    </body>
    </html>`;
  return template;
};



const Facture = ({ client, colis, qrCodeImage }) => {
  const handlePrintFacture = () => {
    const invoiceHTML = generateInvoiceHTML(client, colis, qrCodeImage);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div style={{ marginTop: 20, border: '2px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h5" gutterBottom>
        Facture
      </Typography>
      {/* Afficher les informations du client */}
      <Typography variant="subtitle1">Informations du client:</Typography>
      <Typography>Nom & prénom: {client.Nomprenom}</Typography>
      <Typography>Adresse: {client.adresse}</Typography>
      <Typography>Code postal: {client.codepostale}</Typography>
      <Typography>Gouvernorat: {client.Gouvernorate}</Typography>

      {/* Afficher les informations du colis */}
      <Typography variant="subtitle1" style={{ marginTop: 10 }}>
        Informations du colis:
      </Typography>
      <Typography>Prix: {colis.prix}</Typography>
      <Typography>Type de paiement: {colis.typeDePayment}</Typography>
      <Typography>Hauteur: {colis.hauteur}</Typography>
      <Typography>Largeur: {colis.largeur}</Typography>

      {/* Afficher le QR code */}
      <Typography variant="subtitle1" style={{ marginTop: 10 }}>
        QR Code:
      </Typography>
      <QRCode value={qrCodeImage} />

      <Button variant="contained" style={{ marginTop: 20 }} onClick={handlePrintFacture}>
        Imprimer la facture
      </Button>
    </div>
  );
};



const App = () => {

  const [qrCodeImage, setQRCodeImage] = useState('');
  const [profil, setProfil] = useState({
    date_creation: '2023-08-01',
    fournisseur: 'HA',
    livreur: 'Mohamed ben Amor',
    num_client: '20410775',
    adresse: 'Nassria',
    codepostale: '1200',
    Gouvernorate: 'Sfax',
  });
  const [client, setClient] = useState({
    Nomprenom: '',
    adresse: '',
    codepostale: '',
    Gouvernorate: '',
    num_client: '',
  });
  const [colis, setColis] = useState({
    prix: '',
    typeDePayment: '',
    largeur: '',
    hauteur: '',
    qrCode: '',
  });
  const [colisList, setColisList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showFacture, setShowFacture] = useState(false); // Ajout de l'état showFacture

  const handleNumericInput = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    setColis({ ...colis, prix: numericValue });
  };

  const handleAddColis = async () => {
    const colisId = uuidv4();
    const newColis = {
      ...colis,
      qrCode: colisId,
    };
    const qrCodeData = JSON.stringify({
      qrCode: colisId,
      prix: colis.prix,
      typeDePayment: colis.typeDePayment,
    });

  
    try {
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
      setQRCodeImage(qrCodeImage);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/colis/createcolis', colis);
      // Gérer la réponse du backend si nécessaire
        } catch (error) {
      console.error('Erreur lors de l\'enregistrement du colis:', error);
    }


    setColisList((prevColisList) => [...prevColisList, newColis]);
    setColis({
      prix: '',
      typeDePayment: '',
      qrCode: '',
      largeur: '',
      hauteur: '',
    });

    // Afficher la facture après avoir créé le colis
    setShowFacture(true);
  };

// ...

const handlePrintFacture = (colis, client) => {
  const invoiceHTML = generateInvoiceHTML(client, colis, qrCodeImage);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(invoiceHTML);
  printWindow.document.close();

  // Imprimer la facture une fois que l'image QRCode est chargée
  const qrCodeImageObj = new Image();
  qrCodeImageObj.onload = () => {
    printWindow.print();
  };
  qrCodeImageObj.src = qrCodeImage;
};

  const handleHistorique = () => {
    console.log("Afficher l'historique des colis");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (qrCode) => {
    // Add the logic to delete the colis with the given qrCode from the colisList
    // For example:
    const updatedColisList = colisList.filter((colis) => colis.qrCode !== qrCode);
    setColisList(updatedColisList);
  };
  

  return (
    <body>
      <div sx={{ padding: 1, left: 300, position: 'relative', width: 300 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: 1, left: 250, position: 'relative', width: 1400 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Profil
            </Typography>
            <TextField
          label="Date de création"
          type="date" // Set the input type to "date"
          value={profil.date_creation}
          onChange={(e) => setProfil({ ...profil, date_creation: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="Fournisseur"
          type="text" // Set the input type to "text"
          value={profil.fournisseur}
          onChange={(e) => setProfil({ ...profil, fournisseur: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="Livreur"
          type="text" // Set the input type to "text"
          value={profil.livreur}
          onChange={(e) => setProfil({ ...profil, livreur: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />

        
        <TextField
          label="Téléphone"
          type="tel" // Set the input type to "number"
          value={profil.num_client2}
          onChange={(e) => setProfil({ ...profil, num_client2: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />

        <TextField
          label="Adresse"
          value={profil.adresse}
          type="text"
          onChange={(e) => setProfil({ ...profil, adresse: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="Code Postale"
          type="number"
          value={profil.codepostale}
          onChange={(e) => setProfil({ ...profil, codepostale: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Gouvernorate"
          type="text"
          value={profil.Gouvernorate}
          onChange={(e) => setProfil({ ...profil, Gouvernorate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
         
        {/* Add other profile fields as needed */}
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Client
            </Typography>
            <TextField
          label="Nom & prénom"
          type="text"
          value={client.Nomprenom}
          onChange={(e) => setClient({ ...client, Nomprenom: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />    
            
        <TextField
          label="Adresse"
          type="text"
          value={client.adresse}
          onChange={(e) => setClient({ ...client, adresse: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="code postal"
          type="number"
          value={client.codepostale}
          onChange={(e) => setClient({ ...client, codepostale: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="Gouvernorate"
          type="text"
          value={client.Gouvernorate}
          onChange={(e) => setClient({ ...client, Gouvernorate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
        <TextField
          label="Téléphone"
          type="tel" // Set the input type to "number"
          value={client.num_client1}
          onChange={(e) => setClient({ ...client, num_client: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, // This will make the label shrink when the input has a value
          }}
        />
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Colis
            </Typography>
          {/* ... */}
        <TextField
          label="Type de paiement "
          type="text"
          value={colis.typeDePayment} 
          onChange={(e) => setColis({ ...colis, typeDePayment: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
          shrink: true,
         }}
         />
        <TextField
         label="Hauteur "
         type="number"
         value={colis.hauteur} 
         onChange={(e) => setColis({ ...colis, hauteur: e.target.value })}
         fullWidth
         margin="normal"
         InputLabelProps={{
         shrink: true,
          }}
        />
<TextField
  label="Largeur "
  type="number"
  value={colis.largeur} 
  onChange={(e) => setColis({ ...colis, largeur: e.target.value })}
  fullWidth
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
/>
{/* ... */}

        
            <TextField
              label="Prix"
              type="Number" // Use "text" type to allow custom input handling
              value={colis.prix}
              onChange={handleNumericInput} // Use the custom input handler
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Paper>
          <Button variant="contained" style={{ marginTop: 20 }} onClick={handleAddColis}>
              Créer la colis
            </Button>

      {/* Affichage de la facture */}
      {showFacture && colis.qrCode && qrCodeImage && (
        <div style={{ marginTop: 50 }}>
          <Facture client={client} colis={colis} qrCodeImage={qrCodeImage} />
        </div>
      )}
        </Box>
      </div>

     {/* Affichage de la facture */}
     {showFacture && colis.qrCode && qrCodeImage && (
        <div style={{ marginTop: 50 }}>
          <Facture client={client} colis={colis} qrCodeImage={qrCodeImage} />
        </div>
      )}

      {/* Table des colis */}
      {colisList.length > 0 && (
        <div style={{ marginTop: 50, padding: 1, left: 300, position: 'relative', width: 1200 }}>
          <Typography variant="h5" gutterBottom>
            Liste des colis créés
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {colisList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((colis) => (
                  <TableRow key={colis.qrCode}>
                    <TableCell align="center">{client.Nomprenom}</TableCell>
                    <TableCell align="center">{client.adresse}</TableCell>
                    <TableCell align="center">{client.codepostale}</TableCell>
                    <TableCell align="center">{client.Gouvernorate}</TableCell>
                    <TableCell align="center">{client.num_client}</TableCell>

                    <TableCell align="center">{colis.prix}</TableCell>
                    <TableCell align="center">{colis.typeDePayment}</TableCell>
                    <TableCell align="center" >{colis.hauteur}</TableCell>
                    <TableCell align="center">{colis.largeur}</TableCell>
                    <TableCell align="center" >
                    <QRCode value={colis.qrCode} size={80} />
                    </TableCell >
                    <TableCell align="center">
                       <IconButton onClick={() => handlePrintFacture(colis, client)}>
                       <PrintIcon style={{ color: 'orange' }} />
                      </IconButton>
                       <IconButton onClick={() => handleHistorique(colis, client)}>
                       <HistoryIcon style={{ color: 'blue' }} />
                      </IconButton>
                       <IconButton onClick={() => handleDelete(colis.qrCode)}>
                       <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={colisList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </body>
  );
};

export default App;
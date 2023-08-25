import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from 'antd';
import axios from 'axios';
import qrcode from 'qrcode'; 
import QRCode from 'react-qr-code'; 
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'; 
import PrintIcon from '@mui/icons-material/Print';
import HistoryIcon from '@mui/icons-material/History';
import { AppBar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Facture from './Facture';
import { TableFooter } from '@mui/material';
import '../App.css'

import ImportExcelButton from './ImportExcelButton';
import { FaAlignLeft } from 'react-icons/fa';
import { green } from '@mui/material/colors';
import QRCodeGenerator from '../components/QRCodeGenerator';
const columns = [
  { id: 'nomClient', label: 'Nom',minWidth:100 },
  { id: 'prenomClient', label: 'Prénom',minWidth:100 },
  { id: 'adresse', label: 'Adresse' , minWidth:100},
  { id: 'codepostale', label: 'Code postale', minWidth:100},
  { id: 'destination', label: 'Destination', minWidth:100},
  { id: 'num_client' , label: 'Téléphone', minWidth:100},
  { id: 'prix', label: 'Prix', minWidth: 100 },
  { id: 'typeDePayment', label: 'Type de Paiement', minWidth: 150 },
  { id: 'hauteur', label: 'Hauteur', minWidth: 100 },
  { id: 'largeur', label: 'Largeur', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 150 }, 
];

const generateInvoiceHTML = (client, colis, qrCodeImage) => {
  const fraisLivraison = 8; 
  const total = parseFloat(colis.prix) + fraisLivraison;

  
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
      <p>Nom: ${client.nomClient}</p>
      <p>Prenom: ${client.prenomClient}</p>
      <p>Adresse: ${client.adresse}</p>
      <p>Code postal: ${client.codepostale}</p>
      <p>Destination: ${client.destination}</p>
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


const tableCellStyle = {
  padding: '8px',
  textAlign: 'center',
  borderBottom: '1px solid #ccc',
};

const fragileCellStyle = {
  ...tableCellStyle,
  fontWeight: 'bold',
  color: 'red',
};



const App = () => {

  const [qrCodeImage, setQRCodeImage] = useState('');
  const [client, setClient] = useState({

    nomClient: '',
    prenomClient:'',
    adresse: '',
    codepostale: '',
    destination: '',
    num_client: '',
  });

  const [colis, setColis] = useState({
    prix: '',
    typeDePayment: '',
    largeur: '',
    hauteur: '',
    qrCode: '',
    fournisseur:'',
  });
  const [colisList, setColisList] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showFacture, setShowFacture] = useState(false); 
  const [svgQRCode, setSvgQRCode] = useState(null);
  

  const handleNumericInput = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    setColis({ ...colis, prix: numericValue });
  };


  const generateQRCodeSVG = async (qrCodeData) => {
    const qrCodeString = JSON.stringify(qrCodeData);
    try {
      const svgString = await qrcode.toString(qrCodeString, { type: 'svg' });
      return svgString;
    } catch (error) {
      throw new Error('Error generating QR code: ' + error.message);
    }
  };

  // Function to handle generating QR code for colis
  const handleGenerateQRCode = async (colisData) => {
    try {
      const svgQRCode = await generateQRCodeSVG(colisData);
      return svgQRCode;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return '';
    }
  };

  const handleAddColis = async () => {
    const colisId = uuidv4();
    const newColis = {
      ...colis,
      qrCode: colisId,
    };
     // Generate QR code for the newly created colis
    const qrCodeImage = await handleGenerateQRCode(newColis);
    const qrCodeData = JSON.stringify({
      id: colisId,
      prix: colis.prix,
      typeDePayment: colis.typeDePayment,
      hauteur: colis.hauteur,
      largeur: colis.largeur,
      fournisseur: colis.fournisseur,
    });

    try {
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
      setQRCodeImage(qrCodeImage);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }

    try {
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
      newColis.qrCodeImage = qrCodeImage;
      
      await axios.post('http://localhost:3000/colis/ajouterColis', newColis);
      
      setColis(newColis);
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
      fournisseur:'',
    });

    setShowFacture(true);
  };

  

  // const handleImportExcel = async (importedData) => {
  //   // Traitez les données importées comme vous le souhaitez
  //   console.log('Données importées :', importedData);
  //   setImportedData(importedData);
  // };

  const [importedData, setImportedData] = useState([]);
  
  const handleDataImport = (data) => {
    setImportedData(data);
  };

const handlePrintFacture = (colis, client) => {
  const invoiceHTML = generateInvoiceHTML(client, colis, qrCodeImage);
  const printWindow = window.open('', '_blank');
  printWindow.document.write(invoiceHTML);
  printWindow.document.close();

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
    
    const updatedColisList = colisList.filter((colis) => colis.qrCode !== qrCode);
    setColisList(updatedColisList);
  };
  
  const [fragile, setFragile] = useState(false);

  const handleFragileChange = (event) => {
    setFragile(event.target.checked);
  };


  useEffect(() => {
    fetchColisList();
  }, []);

  const fetchColisList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/colis/listerColis');
      setColisList(response.data.colisList);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste de colis:', error);
    }
  };


  // const handleGenererQRCode = async () => {
  //   const qrCodeData = {
  //     id: colis.qrCode,
  //     prix: colis.prix,
  //     hauteur: colis.hauteur,
  //     largeur: colis.largeur,
  //     fournisseur: colis.fournisseur,
  //   };

  //   try {
  //     const svgQRCode = await genererQRCodeColis(qrCodeData);
  //     setQRCodeImage(svgQRCode);
  //   } catch (error) {
  //     console.error('Erreur lors de la génération du code QR:', error);
  //   }
  // };
  return (
    <body>
      <div style={{padding: 1, left: 250, position: 'relative', width: 1600}}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: 1, left: 250, position: 'relative', width: 1600 }}>
          
          <Paper elevation={3} sx={{ padding: 2, marginRight:4 }}>
            <Typography variant="h5" gutterBottom>
              Paramètres du client
            </Typography>
            <TextField
        label="ID"
        type="text"
        value={colis.qrCode}
        onChange={(e) => setColis({ ...colis, qrCode: e.target.value })}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
            <TextField
          label="Nom"
          type="text"
          value={client.nomClient}
          onChange={(e) => setClient({ ...client, nomClient: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, 
          }}
        />   
        <TextField
          label="Prénom"
          type="text"
          value={client.prenomColis}
          onChange={(e) => setClient({ ...client, prenomColis: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, 
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
            shrink: true, 
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
            shrink: true, 
          }}
        />
        <TextField
          label="Destination"
          type="text"
          value={client.destination}
          onChange={(e) => setClient({ ...client, destination: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, 
          }}
        />
        <TextField
          label="Téléphone"
          type="tel" 
          value={client.num_client}
          onChange={(e) => setClient({ ...client, num_client: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true, 
          }}
        />
          </Paper>

          <Paper elevation={3} sx={{ padding: 2 , marginLeft:4}}>
            <Typography variant="h5" gutterBottom>
              Informations du Colis
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

<TextField
  label="Statut"
  select
  value={colis.status}
  onChange={(e) => setColis({ ...colis, status: e.target.value })}
  fullWidth
  margin="normal"
  InputLabelProps={{
    shrink: true,
  }}
>
  {['En attente', 'En stock', 'En cours', 'Retour en stock','Retour définitif', 'Livrés','Livrés payés','Pickup','annulé','Echange crée','Echange livré', 'payé', 'en pickup', 'annulé', 'retour au fournisseur'].map((option) => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</TextField>

            <TextField
              label="Prix"
              type="Number" 
              value={colis.prix}
              onChange={handleNumericInput} 
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={fragile} onChange={handleFragileChange} />}
          label="Fragile"
        />
      </FormGroup>
          </Paper>
          </Box>
          
          <Button className='rechercher-button' onClick={handleAddColis}>
              Enregistrer
            </Button>
            
           

      {/* {showFacture && colis.qrCode && qrCodeImage && (
        <div style={{ marginTop: 50 }}>
          <Facture client={client} colis={colis} qrCodeImage={qrCodeImage} />
        </div>
      )} */}
      
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
          {colisList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((colisItem) => (
            <TableRow key={colisItem.qrCode}>
            <TableCell align="center" style={tableCellStyle}>{colisItem.nomClient}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.prenomClient}</TableCell>

            <TableCell align="center" style={tableCellStyle}>{colisItem.adresse}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.codepostale}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.destination}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.num_client}</TableCell>
          
            <TableCell align="center" style={tableCellStyle}>{colisItem.prix}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.typeDePayment}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.hauteur}</TableCell>
            <TableCell align="center" style={tableCellStyle}>{colisItem.largeur}</TableCell>
            
            {/* <TableCell align="center" style={tableCellStyle}>
              {colisItem.qrCode && <QRCode value={colisItem.qrCode} size={80} />}
            </TableCell> */}
          
            <TableCell align="center" style={tableCellStyle}>
              <IconButton onClick={() => handlePrintFacture(colisItem, colisItem)}>
                <PrintIcon style={{ color: 'orange' }} />
              </IconButton>
              <IconButton onClick={() => handleHistorique(colisItem, colisItem)}>
                <HistoryIcon style={{ color: 'blue' }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(colisItem.qrCode)}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            </TableCell>
          </TableRow>
          
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} align="left" style={tableCellStyle}>
              {fragile ? <span style={fragileCellStyle}>FRAGILE</span> : ''}
            </TableCell>
            {/* ... */}
          </TableRow>
        </TableFooter>
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
    <div className="import-section">
  <h2 className="import-title">Import des Colis</h2>
  <div className="import-container">
    <div className="import-paper left-paper">
      <p>Modèle de fichier à télécharger</p>
      <button className="download-button">Télécharger</button>
    </div>
    <div className="import-paper right-paper">
      <p>Chargement du fichier Excel</p>
      <input type="file" accept=".xlsx, .xls" id="fileInput" />
      <label htmlFor="fileInput" className="file-label">
        Aucun fichier choisi
        <ImportExcelButton  onImport={handleDataImport} />

      </label>
    </div>
  </div>
</div>


{importedData.length > 0 && (
<div>
<Typography variant="h5" gutterBottom>
Données Importées
</Typography>
<TableContainer component={Paper}>
<Table>
<TableHead>
<TableRow>
{/*  */}
</TableRow>
</TableHead>
<TableBody>
{importedData.map((rowData, index) => (
<TableRow key={index}>
  <TableCell>{rowData[0]}</TableCell>
  <TableCell>{rowData[1]}</TableCell>
  <TableCell>{rowData[2]}</TableCell>
  <TableCell>{rowData[3]}</TableCell>
  <TableCell>{rowData[4]}</TableCell>
  {/* Add more cells here */}
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
</div>
)}
  </div>
)}
</body>
  );};

export default App;
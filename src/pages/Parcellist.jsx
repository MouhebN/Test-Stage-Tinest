import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const GestionColis = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [adresse, setAdresse] = useState('');
  const [num_client, setNumeroClient] = useState('');
  const [qr_code, setQrCode] = useState('');
  const [prix, setPrix] = useState('');
  const [fournisseur, setFournisseur] = useState('');
  const [livreur, setLivreur] = useState('');
  const [hauteur, setHauteur] = useState(''); // Added this line for 'hauteur'
  const [typeColis, setTypeColis] = useState(''); // Added this line for 'typeColis'
  const [largeur, setLargeur] = useState('');
  const [typeDePayment, setTypeDePaiement] = useState('');
  const [retourCount, setRetourCount] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');

  const [date_creation, setDateCreation] = useState('');
  const [colisList, setColisList] = useState([]);

  // Function to fetch colis data from the backend
  const fetchColisData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/colis/liste');
      setColisList(response.data); // Set the received colis data in the state
    } catch (error) {
      console.error('Error fetching colis data:', error);
    }
  };

  useEffect(() => {
    fetchColisData(); // Fetch colis data when the component mounts
  }, []);

  const handleDeleteColis = (id) => {
    axios
      .delete(`/colis/${id}/delete`)
      .then((response) => {
        console.log('Colis deleted successfully:', response.data);
        // Refresh the colis list after deletion
        fetchColisData();
      })
      .catch((error) => {
        console.error('Error deleting colis:', error);
      });
  };

  const isColisDeliverable = (status) => status !== 'Livré';

  const handleEditColis = (id) => {
    // Implement your logic to edit the colis with the given ID
    const editedColis = {
      destination,
      adresse,
      num_client,
      email,
      qr_code,
      livreur,
      retourCount,
      date_creation,
      prix,
      typeDePayment,
      largeur,
      hauteur,
      typeColis,
    };
    axios
      .put(`/colis/${id}/modifier`, editedColis)
      .then((response) => {
        console.log('Colis updated successfully:', response.data);
        // Refresh the colis list after update
        fetchColisData();
        // Close the edit popup after saving
        handleCloseEdit();
      })
      .catch((error) => {
        console.error('Error updating colis:', error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Livré':
        return 'green';
      case 'En attente':
        return 'red';
      case 'En cours de livraison':
        return 'blue';
      default:
        return 'black';
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShowEdit = () => {
    setEdit(true);
  };

  const handleCloseEdit = () => {
    setEdit(false);
  };

  const addColis = () => {
    // Implement your logic to add a new colis using the form input state variables
    const newColis = {
      destination,
      adresse,
      num_client,
      email,
      qr_code,
      livreur,
      retourCount,
      date_creation,
      prix,
      typeDePayment,
      largeur,
      hauteur,
      typeColis,
    };
    console.log('New colis:', newColis);
    // Close the add popup after saving
    setShow(false);
  };

  return (
    <Box sx={{ padding: 1, left: 250, position: 'fixed', width: 1400 }}>
      <Typography variant="h5" gutterBottom>
        Liste des colis
      </Typography>

      {colisList && colisList.length ? (
        <Table striped bordered hover size="sm">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Numero</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Livreur</TableCell>
              <TableCell>Retour Count</TableCell>
              <TableCell>Date Creation</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Type de Paiement</TableCell>
              <TableCell>Type de Colis</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colisList.map((colis, index) => (
              <TableRow key={index}>
                <TableCell>{colis.id}</TableCell>
                <TableCell>{colis.destination}</TableCell>
                <TableCell>{colis.adresse}</TableCell>
                <TableCell>{colis.num_client}</TableCell>
                <TableCell>{colis.email}</TableCell>
                <TableCell>{colis.livreur}</TableCell>
                <TableCell style={{ color: getStatusColor(colis.status) }}>
                  {colis.status}
                </TableCell>
                <TableCell>{colis.date_creation}</TableCell>
                <TableCell>{colis.prix}</TableCell>
                <TableCell>{colis.typeDePayment}</TableCell>
                <TableCell>{colis.typeColis}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEditColis(colis.id)}
                    aria-label="edit"
                    //disabled={!isColisDeliverable(colis.status)}
                    color="primary" // Use the primary color for the "Modifier" (Edit) button
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteColis(colis.id)}
                    aria-label="delete"
                    //disabled={!isColisDeliverable(colis.status)}
                    color="secondary" // Use the secondary color for the "Supprimer" (Delete) button
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Alert variant="info">Aucun colis ouvert...</Alert>
      )}

      {/* The rest of your code... */}
    </Box>
  );
};

export default GestionColis;

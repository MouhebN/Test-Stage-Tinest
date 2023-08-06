import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Exemple de données de colis (peut être remplacé par des données provenant de votre backend)
const mockColisData = [
  { id: 1, destination: 'kasserine', status: 'En attente' },
  { id: 2, destination: 'Sfax', status: 'En cours de livraison' },
  { id: 3, destination: 'Sousse', status: 'Livré' },
];

const GestionColis = () => {
  const [colisList, setColisList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedColis, setSelectedColis] = useState({ id: null, destination: '', status: '' });

  useEffect(() => {
    // Chargez les données de colis à partir de votre backend ici (à la place de mockColisData)
    setColisList(mockColisData);
  }, []);

  const handleAddColis = () => {
    // Implémentez votre logique pour ajouter un nouveau colis à la liste
    const newColis = {
      id: colisList.length + 1,
      destination: selectedColis.destination,
      status: selectedColis.status,
    };

    setColisList([...colisList, newColis]);
    handleCloseDialog();
  };

  const handleEditColis = () => {
    // Implémentez votre logique pour éditer le colis sélectionné dans la liste
    const updatedColisList = colisList.map((colis) =>
      colis.id === selectedColis.id ? selectedColis : colis
    );

    setColisList(updatedColisList);
    handleCloseDialog();
  };

  const handleDeleteColis = (id) => {
    // Implémentez votre logique pour supprimer le colis avec l'ID donné
    const updatedColisList = colisList.filter((colis) => colis.id !== id);
    setColisList(updatedColisList);
  };

  const handleOpenEditDialog = (colis) => {
    setSelectedColis(colis);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleOpenAddDialog = () => {
    setSelectedColis({ id: null, destination: '', status: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', padding: 1, left: 100, position: "relative", width: 1500 }}>
      <Box sx={{ padding: 1, left: 250, position: "relative", width: 1400 }}>
        <Typography variant="h5" gutterBottom>
          Gestion des colis
        </Typography>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colisList.map((colis) => (
              <TableRow key={colis.id}>
                <TableCell>{colis.id}</TableCell>
                <TableCell>{colis.destination}</TableCell>
                <TableCell>{colis.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Modifier"
                    onClick={() => handleOpenEditDialog(colis)}
                    disabled={colis.status === "Livré"}
                    sx={{
                      color: colis.status === "Livré" ? "grey" : "primary",
                      '&:hover': {
                        color: colis.status === "Livré" ? "grey" : "blue",
                      },
                    }}
                  >
                    <EditIcon sx={{ color: colis.status === "Livré" ? "grey" : "inherit" }} />
                  </IconButton>
                  <IconButton
                    aria-label="Supprimer"
                    onClick={() => handleDeleteColis(colis.id)}
                    disabled={colis.status === "Livré"}
                    sx={{
                      color: colis.status === "Livré" ? "grey" : "secondary",
                      '&:hover': {
                        color: colis.status === "Livré" ? "grey" : "red",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ color: colis.status === "Livré" ? "grey" : "inherit" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
        <Button variant="contained" onClick={handleOpenAddDialog}>
          Ajouter un colis
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          {/* ... Dialog content ... */}
        </Dialog>
      </Box>
    </div>
  );
};

export default GestionColis;
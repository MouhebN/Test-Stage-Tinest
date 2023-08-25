import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import ModifierColis from './ColisEdit';

const Parcellist = () => {
  const [colisList, setColisList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchColisList();
  }, []);

  const fetchColisList = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/colis/liste');
      setColisList(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des colis : ', error);
    }
  };

  const handleDelete = async (colisId) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/colis/${colisId}/delete`);
      fetchColisList();
    } catch (error) {
      console.error('Erreur lors de la suppression du colis : ', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentParcels = colisList.slice(startIndex, endIndex);

  return (
    <div style={{ padding: 1, left: 250, position: 'relative', width: 900 }}>
      <h1>Liste des colis</h1>
      <table className="colis-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Adresse</th>
            <th>Numéro de client</th>
            <th>Livreur</th>
            <th>Status</th>
            <th>Date de création</th>
            <th>Prix</th>
            <th>Type de paiement</th>
            <th>Largeur</th>
            <th>Hauteur</th>
            <th>Type de colis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentParcels.map((colis) => (
            <tr key={colis._id}>
              <td>{colis._id}</td>
              <td>{colis.destination}</td>
              <td>{colis.adresse}</td>
              <td>{colis.num_client}</td>
              <td>{colis.livreur ? colis.livreur : 'Non spécifié'}</td>
              <td>{colis.status}</td>
              <td>{colis.date_creation}</td>
              <td>{colis.prix}</td>
              <td>{colis.typeDePayment ? colis.typeDePayment : 'Non spécifié'}</td>
              <td>{colis.largeur ? colis.largeur : 'Non spécifié'}</td>
              <td>{colis.hauteur ? colis.hauteur : 'Non spécifié'}</td>
              <td>{colis.typeColis ? colis.typeColis : 'Non spécifié'}</td>
              <td>
                <Link to={`/colis/${colis._id}/edit`} className="action-icon">
                  <FiEdit />
                </Link>
                <span className="action-icon" onClick={() => handleDelete(colis._id)}>
                  <FiTrash2 />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default Parcellist;

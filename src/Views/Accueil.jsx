import { FaCheck,
         FaTruckMoving, 
         FaFileAlt, 
         FaUndo, 
         FaBoxOpen, 
         FaBox, 
         FaReply, 
         FaClock, 
         FaExchangeAlt, 
         FaBan,  
         FaChartBar,
         FaShoppingCart,
         FaRedoAlt,
         FaArchive,
         FaTruckLoading,
         FaCheckDouble, FaVolumeUp,  } from "react-icons/fa";
         
// ... (autres importations)
import { useState, useEffect } from 'react';
import { Typography, DatePicker, Button, Space, Table, Input, Select } from "antd";
import axios from 'axios';

import '../App.css';

const { Search } = Input;
const { Title } = Typography;
const { Option } = Select;

function Homepage() {
  const [dateRange, setDateRange] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/colis/listerColis');
        setData(response.data.colisList); // Assuming the array is under the property colisList
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  

  useEffect(() => {
    updateStatusCounts();
  }, [data]);
  
  const updateStatusCounts = () => {
    const counts = {};
    data.forEach(item => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };
  

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };
  const columns = [
    
    
    // Add more columns for the new attributes here
    {
      title: "Fournisseur",
      dataIndex: "fournisseur",
      key: "fournisseur",
    },
    
    {
      title: "Nom",
      dataIndex: "nomClient",
      key: "nomClient",
    },
    {
      title: "Prenom",
      dataIndex: "prenomClient",
      key: "prenomClient",
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Numéro ",
      dataIndex: "num_client",
      key: "num_client",
    },
    
    {
      title: "Livreur",
      dataIndex: "livreur",
      key: "livreur",
    },
    {
      title: "Date de Création",
      dataIndex: "date_creation",
      key: "date_creation",
    },
    {
      title: "Prix",
      dataIndex: "prix",
      key: "prix",
    },
    {
      title: "Type de Paiement",
      dataIndex: "typeDePayment",
      key: "typeDePayment",
    },
    
    {
      title: "Type de Colis",
      dataIndex: "typeColis",
      key: "typeColis",
    },
    {
      title: "Nom article",
      dataIndex: "nomArticle",
      key: "nomArticle",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"

    }
  ];


  const filteredDataByStatus = data.filter((item) => {
    if (selectedStatus === "All") {
      return true;
    } else {
      return item.status === selectedStatus;
    }
  });

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filteredData = data.filter((item) =>
      Object.values(item).some((val) => val.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredData);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setSearchQuery("");
  };

  function getStatusIcon(status) {
    switch (status) {
      case 'En stock':
        return <FaCheck className="status-icon" />;
      case 'En cours':
        return <FaTruckLoading className="status-icon" />;
      case 'Livrés':
        return <FaArchive className="status-icon" />;
      case 'En attente':
        return <FaRedoAlt className="status-icon" />;
      case 'Retour en stock':
        return <FaUndo className="status-icon" />;
      case 'Retour définitif':
        return <FaReply className="status-icon" />;
      case 'Livrés payés':
        return <FaArchive className="status-icon" />;
      case 'Pickup':
        return <FaShoppingCart className="status-icon" />; // Shopping cart icon for Pickup status
      case 'annulé':
        return <FaBan className="status-icon" />;
      case 'Echange crée':
        return <FaExchangeAlt className="status-icon" />;
      case 'Echange livré':
        return <FaExchangeAlt className="status-icon" />;
      default:
        return null;
    }
  }


  const getStatusColor = (status) => {
    switch (status) {
      case 'En stock':
        return '#4caf50'; // Vert
      case 'En cours':
        return '#ffc107'; // Jaune
      case 'Livrés':
        return '#f44336'; // Rouge
      case 'En attente':
        return '#fff236'; // Jaune pâle
      case 'Retour en stock':
        return '#7f00ff'; // Violet
      case 'Retour définitif':
        return '#b71c1c'; // Rouge foncé
      case 'Livrés payés':
        return '#4caf50'; // Vert (même que En stock)
      case 'Pickup':
        return '#ff9800'; // Orange
      case 'annulé':
        return '#f44336'; // Rouge (même que Livrés)
      case 'Echange crée':
        return '#2196f3'; // Bleu
      case 'Echange livré':
        return '#2196f3'; // Bleu (même que Echange crée)
      default:
        return 'transparent';
    }
  };

  return (

    <div className="homepage-container" style={{ marginTop: 50, padding: 1, left: 300, position: 'relative', width: 1300 }}>
      <Title level={2} className="centered">
        Welcome to Delivery
      </Title>

      <div className="filter-container">
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["From Date", "To Date"]}
          onChange={handleDateChange}
        />
        <Button
          type="primary"
          style={{ marginLeft: "10px" }}
          onClick={() => console.log("Apply clicked!")}
        >
          Appliqué
        </Button>
      </div>

      <div className="button-section">
        <Button
          size="large"
          type="primary"
          className="status-button"
          onClick={() => handleStatusChange("created")}
        >
          <FaCheck className="button-icon" />
          Créé
        </Button>
        <div className="status-button-group" >
          {['En attente', 'En stock', 'En cours', 'Retour en stock', 'Retour définitif', 'Livrés', 'Livrés payés', 'Pickup',
            'annulé', 'Echange crée', 'Echange livré'].map((status) => (
              <Button
              key={status}
              size="large"
              type="primary"
              className={`status-button ${selectedStatus === status ? 'selected' : ''}`}
              style={{ background: getStatusColor(status), borderColor: getStatusColor(status) }}
              onClick={() => handleStatusChange(status)}
            >
              <span className="status-icon">{getStatusIcon(status)}</span>
              {status}
              <span className="status-badge">{statusCounts[status]}</span>
            </Button>
            
          ))}
        </div>
        
      </div>

      <div className="table-container">
        <div className="table-header">
          <Title level={4} className="table-title">
            {selectedStatus === "All" ? "Tous les Colis" : `Colis ${selectedStatus}`}
          </Title>
          <Search
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "200px" }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={searchQuery ? filteredData : filteredDataByStatus}
          rowKey="id" // Assuming your data has an attribute named "id"
          bordered
          size="middle"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
          style={{ marginTop: "20px" }}
        />
      </div>
    </div>
  );
}

export default Homepage;



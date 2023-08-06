import { FaCheck, FaTruckMoving, FaFileAlt, FaUndo, FaBoxOpen, FaBox, FaReply } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { Typography, DatePicker, Button, Space, Row, Col, Card, Table, Input } from "antd";
import axios from 'axios';


const { Search } = Input;
const { Title } = Typography;

function Homepage() {
  const [dateRange, setDateRange] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]); // Change to empty array

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://127.0.0.1/colis'); // Replace the URL with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     // Call the function to fetch data when the component mounts
     fetchData();
    }, []);

  // Function to handle date range selection
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  
  const columns = [
    
    
    // Add more columns for the new attributes here
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
      title: "QR Code",
      dataIndex: "qr_code",
      key: "qr_code",
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
      title: "Gouvernorat",
      dataIndex: "Gouvernorate",
      key: "Gouvernorate",
    },
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filteredData = data.filter((item) =>
      Object.values(item).some((val) => val.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filteredData);
  };

  

  return (
    <body>
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Welcome to Delivery
      </Title>

      {/* Date Range Picker */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          placeholder={["From Date", "To Date"]}
          onChange={handleDateChange}
        />
        <Button type="primary" style={{ marginLeft: "10px" }} onClick={() => console.log("Apply clicked!")}>
          Appliqué
        </Button>
      </div>

      {/* Colored Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", padding: 1, left : 200 , position : "fixed" , width :1400  }}>
        <Space>
          <Button size="large" type="primary" style={{ background: "#4caf50", borderColor: "#4caf50",  }}>
            <FaCheck style={{ marginRight: 8 }} />
            Créé
          </Button>
          <Button size="large" type="default" style={{ background: "#ffc107", borderColor: "#ffc107" }}>
            <FaFileAlt style={{ marginRight: 8 }} />
            En Cours
          </Button>
          <Button size="large" type="danger" style={{ background: "#f44336", borderColor: "#f44336" }}>
            <FaTruckMoving style={{ marginRight: 8 }} />
            Livré
          </Button>
          <Button size="large" type="success" style={{ background: "#2196f3", borderColor: "#2196f3" }}>
            <FaUndo style={{ marginRight: 8 }} />
            Colis Payé
          </Button>
          <Button size="large" type="default" style={{ background: "#FF9800", borderColor: "#FF9800" }}>
            <FaBoxOpen style={{ marginRight: 8 }} />
            Préparation Retour
          </Button>
          <Button size="large" type="warning" style={{ background: "#9C27B0", borderColor: "#9C27B0" }}>
            <FaBox style={{ marginRight: 8 }} />
            Retourné Expéditeur
          </Button>
          <Button size="large" type="primary" style={{ background: "#2196f3", borderColor: "#2196f3" }}>
            Total
          </Button>
        </Space>
      </div>

      {/* Table for Colis Créé */}
      <div style={{ marginTop: "250px" , padding: 1, left : 250 , position : "fixed" , width :1400 }}>
        <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
          <Title level={4} style={{ flex: 1 , alignItems: "center" }}>
            Colis Créé
          </Title>
          <Search
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "200px" }}
          />
        </div>
        <Table columns={columns} dataSource={searchQuery ? filteredData : data} />
      </div>
    </div>
    </body>
  );
}

export default Homepage;

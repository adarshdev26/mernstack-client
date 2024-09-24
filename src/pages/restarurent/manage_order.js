import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material/';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const Manage_order = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantId = sessionStorage.getItem('id');
        if (!restaurantId) {
          throw new Error('Restaurant ID is missing.');
        }
        const response = await axios.get(`http://localhost:5000/api/orders/${restaurantId}`);
        console.log('Fetched orders:', response.data);

        // Transform the fetched data
        const transformedRows = response.data.map(order => ({
          id: order._id, 
          items: order.items.map(item => `${item.itemTitle} (Qty: ${item.quantity}, Price: ${item.price})`).join(', '),
          totalAmount: order.totalAmount,
        }));

        setRows(transformedRows);
      } catch (error) {
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleAccept = (id) => {
    console.log('Accepted order:', id);
  };

  const handleDecline = (id) => {
    console.log('Declined order:', id);
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'items', headerName: 'Items', width: 500 },
    { field: 'totalAmount', headerName: 'Total Amount', type: 'number', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" color="success" onClick={() => handleAccept(params.row.id)}>
            Accept
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDecline(params.row.id)}>
            Decline
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Sidebar />
      <Paper sx={{ height: 400, width: '65%', margin:'auto', marginTop:'30px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Manage_order;

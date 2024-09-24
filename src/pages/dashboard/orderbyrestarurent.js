import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Typography
} from '@mui/material';

// Helper function to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderbyRestaurant = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = useQuery();
  const restaurantId = query.get('id'); // Get the 'id' from URL query params

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [restaurantId]); // Re-fetch data when restaurantId changes

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <div>
      <Sidebar />
      <Typography variant="h4" gutterBottom style={{display:'flex',justifyContent:'center'}}>
        Orders for Restaurant
      </Typography>

     
      {rows.length === 0 ? (
        <Typography variant="body1">No orders found for this restaurant.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{width:'60%', margin:'auto', marginLeft:'auto'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.items}</TableCell>
                  <TableCell>${row.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderbyRestaurant;

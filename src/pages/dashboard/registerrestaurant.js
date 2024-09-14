import React, { useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  Box,
  Button
} from '@mui/material';
import { RestaurantContext } from '../../context/restaurentContext';
import Sidebar from './sidebar';
import { useNavigate } from 'react-router-dom';

const RestaurantTable = () => {
  const { restaurants } = useContext(RestaurantContext);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };






  /*fetched all registered users data*/
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.restaurantName.toLowerCase().includes(search.toLowerCase())
  );



  const paginatedRestaurants = filteredRestaurants.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



 
  const handleRegisterform = () => {
    navigate('/restrarurentform');
  };

  const handleEdit = (id) => {
    console.log('Edit restaurant with ID:', id);
    navigate(`/editregisterform?${id}`);
  };

  const handleDelete = (id)=> {
    setMessage('Are you sure want to delete')
    setOpen(true)
    console.log(id)
  }
 

  const handleClose = ()=> {
    setOpen(false)
  }

  const handleManage = (id)=> {
    console.log(id)
    navigate(`/menuitems?id=${id}`);
  }

  return (
    <div>
      <Sidebar />
     

      <TableContainer
        component={Paper}
        style={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: '0', 
          padding: '16px'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Button variant='contained' onClick={handleRegisterform}>Add Restaurant</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            placeholder='Search'
            margin="normal"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: 300 }}  // Adjust width as needed
          />
        </Box>
        <Table sx={{ minWidth: 600 }} aria-label="simple table"> {/* Increase minWidth to ensure the table has enough width */}
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Restaurant</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Owner</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRestaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell component="th" scope="row">
                  {restaurant._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {restaurant.restaurantName}
                </TableCell>
                <TableCell align="right">
                  {restaurant.status}
                </TableCell>
                <TableCell align="right">
                  {restaurant.ownerName}
                </TableCell>
                <TableCell align="right">
                  {restaurant.email}
                </TableCell>
                <TableCell align="right">
                  <Button
                  color='primary'
                    variant='contained'
                    onClick={() => handleEdit(restaurant._id)}  
                  >
                    Edit
                  </Button>
                   <Button
                    variant="contained"
                  color="success"
                  onClick={() => handleManage(restaurant._id)} 
                >Manage
                 </Button>
                 <Button
                    variant="contained"
                  color="error"
                  onClick={() => handleDelete(restaurant._id)} 
                >Delete
                 </Button>
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRestaurants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default RestaurantTable;

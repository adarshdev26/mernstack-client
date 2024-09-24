import React, { useState, useEffect } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Menuitemsadd = () => {
  const [selectedItemId, setSelectedItemId] = useState(null); // Store selected item id
    const [menuDialogOpen, setMenuDialogOpen] = useState(false);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [itemsDialogOpen, setItemsDialogOpen] = useState(false);  // Dialog for adding items
    const [modifiresDialogOpen, setModifiresDialogOpen] = useState(false);  // Dialog for adding items
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedMenuId, setSelectedMenuId] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [price, setPrice] = useState([]);
const [itemTitle, setItemTitle] = useState('');
const [itemDescription, setItemDescription] = useState('');
const [itemPrice, setItemPrice] = useState('');
const [status, setStatus] = useState('');
const [availableTimes, setAvailableTimes] = useState({
    Monday: { start: '', end: '' },
    Tuesday: { start: '', end: '' },
    Wednesday: { start: '', end: '' },
    Thursday: { start: '', end: '' },
    Friday: { start: '', end: '' },
    Saturday: { start: '', end: '' },
    Sunday: { start: '', end: '' },
});
//const [modifiers, setModifiers] = useState([{ name: '', price: 0 }]);
const [modifiers, setModifiers] = useState([]);
const [menuTitle, setMenuTitle] = useState('');
const [menuDescription, setMenuDescription] = useState('');
const [categoryTitle, setCategoryTitle] = useState('');
const [categoryDescription, setCategoryDescription] = useState('');
const [categoryStatus, setCategoryStatus] = useState('')
const [modifirename, setModifirename] = useState('');
const [modifirePrice, setModifirePrice] = useState('');
const [itemId, setItemId] = useState(null);
const [ItemIds, setItemIds] = useState([]);
const addModifier = () => {
    setModifiers([...modifiers, { name: '', price: 0 }]);
};

const updateModifier = (index, field, value) => {
    const newModifiers = [...modifiers];
    newModifiers[index][field] = value;
    setModifiers(newModifiers);
};

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    const handleMenuDialogOpen = () => setMenuDialogOpen(true);
    const handleMenuDialogClose = () => setMenuDialogOpen(false);
    const handleCategoryDialogOpen = () => setCategoryDialogOpen(true);
    const handleCategoryDialogClose = () => setCategoryDialogOpen(false);
    const handleItemsDialogOpen = () => setItemsDialogOpen(true);
    const handleItemsDialogClose = () => setItemsDialogOpen(false);  
    //const handleModifireDialogOpen = () => setModifiresDialogOpen(true);
    const handleModifireDialogClose = () => setModifiresDialogOpen(false);
    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/menu/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                const result = data.map((item) => ({
                    menuId: item._id,
                    menuTitle: item.menuTitle
                }));
                setMenus(result);
            } catch (error) {
                console.error('Error while fetching data:', error);
            }
        };

        fetchMenuItem();
    }, [id]);

    const handleMenuChange = async (event) => {
        const newValue = event.target.value;
        setSelectedMenuId(newValue);

        try {
            const response = await fetch(`http://localhost:5000/api/getcategory/${newValue}`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error while fetching categories:', error);
        }
    };


    const handleCategoryChange = async (categoryId) => {
        setSelectedCategoryId(categoryId);
        try {
            const response = await fetch(`http://localhost:5000/api/item/${categoryId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            const result = data.map((item) => item.itemTitle);
            const itemprice = data.map((item) => item.itemPrice);
            const itemId = data.map((item) => item._id);
            setItemIds(itemId)
            console.log(itemId, 'fgfk');
            setPrice(itemprice);
            setItems(result);
        } catch (error) {
            console.error('Error while fetching items:', error);
        }
    };





    const handleModifireClick = async (itemId) => {
      setSelectedItemId(itemId); 
      try {
        const response = await fetch(`http://localhost:5000/api/getmodifire/${itemId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch modifiers');
        }
        const data = await response.json();
        console.log(data, 'kkmfgkf')
        // Set the fetched modifiers to state
        setModifiers(data);
        console.log('Fetched Modifiers:', data);
      } catch (error) {
        console.error('Error while fetching modifiers:', error);
      }
    };


    const handleCategoryDelete = () => {
      alert('clicked')
    }



    const handleMenuSubmit = async (event) => {
      event.preventDefault();
      const newMenu = {
          restaurantId: id,
          menuTitle,
          menuDescription,
          status,
      };

      try {
          const response = await fetch('http://localhost:5000/api/addmenu', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newMenu),
          });

          if (response.ok) {
              setMenuTitle('');
              setMenuDescription('');
              setMessage('Menu successfully added');
              setOpenAlert(true);
              handleMenuDialogClose();
              setTimeout(() => {
                window.location.reload();
              },1000)

          } else {
              setMessage('Failed to add item');
              setOpenAlert(true);
              console.error('Failed to create the item:', response.statusText);
          }
      } catch (error) {
          console.error('Error while creating the item:', error);
      }
  };



  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const newIcategory = {
        menuId: selectedMenuId,
        categoryTitle,
        categoryDescription,
        status,
    };

    try {
        const response = await fetch('http://localhost:5000/api/addcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newIcategory),
        });

        if (response.ok) {
            setCategoryTitle('');
            setCategoryDescription('');
            setCategoryStatus('');
            setMessage('Category successfully added');
            setOpenAlert(true);
            handleCategoryDialogClose()
        } else {
            setMessage('Failed to add item');
            setOpenAlert(true);
            console.error('Failed to create the item:', response.statusText);
        }
    } catch (error) {
        console.error('Error while creating the item:', error);
    }
};




    const handleItemSubmit = async (event) => {
        event.preventDefault();
        const newItem = {
            categoryId: selectedCategoryId,
            itemTitle,
            itemDescription,
            itemPrice: parseFloat(itemPrice),
            status,
            availableTimes,
        };

        try {
            const response = await fetch('http://localhost:5000/api/additem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
              var itemId = await response.json(); 
              setItemId(itemId);
                setItemTitle('');
                setItemPrice('');
                setMessage('Item successfully added');
                setOpenAlert(true);
                handleItemsDialogClose();

                // Fetch items again to include the new one
                handleCategoryChange(selectedCategoryId);
            } else {
                setMessage('Failed to add item');
                setOpenAlert(true);
                console.error('Failed to create the item:', response.statusText);
            }
        } catch (error) {
            console.error('Error while creating the item:', error);
        }
    };




    const handleModifireDialogOpen = (itemId) => {
      setSelectedItemId(itemId); // Set the itemId when opening the modifire dialog
      setModifiresDialogOpen(true); // Open the dialog
    };

    

    const handleModifireSubmit = async (event) => {
      event.preventDefault();
      const newModifire = {
          itemId: itemId,
          name:modifirename,
          price:modifirePrice,
          status,
          availableTimes,
      };

      try {
          const response = await fetch('http://localhost:5000/api/addmodifire', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newModifire),
          });

          if (response.ok) {
            setModifirename('');
              setModifirePrice('');
              setMessage('Modifire successfully added');
              setOpenAlert(true);
              handleModifireDialogClose();

          } else {
              setMessage('Failed to add item');
              setOpenAlert(true);
              console.error('Failed to create the item:', response.statusText);
          }
      } catch (error) {
          console.error('Error while creating the item:', error);
      }
  };

console.log('this is ids', modifiers)




    const handleClose = () => setOpenAlert(false);

    return (
      <div>
        <Sidebar />
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={message.includes("successfully") ? "success" : "error"}
          >
            {message}
          </Alert>
        </Snackbar>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            mb: 2,
          }}
        >
          <Button variant="outlined" onClick={handleMenuDialogOpen}>
            Add Menu
          </Button>
        </Box>

        <Dialog open={menuDialogOpen} onClose={handleMenuDialogClose}>
          <form onSubmit={handleMenuSubmit}>
            <DialogTitle>Add Menu</DialogTitle>
            <DialogContent>
              {/* Item Title */}
              <TextField
                required
                margin="dense"
                id="menu-title"
                name="menuTitle"
                value={menuTitle}
                onChange={(e) => setMenuTitle(e.target.value)}
                label="Menu Title"
                type="text"
                fullWidth
                variant="standard"
              />
              {/* Item Description */}
              <TextField
                required
                margin="dense"
                id="menu-description"
                name="menuDescription"
                value={menuDescription}
                onChange={(e) => setMenuDescription(e.target.value)}
                label="Menu Description"
                type="text"
                fullWidth
                variant="standard"
              />
          
              {/* Item Status */}
              <TextField
                required
                margin="dense"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleMenuDialogClose}>Cancel</Button>
              <Button type="submit">Add Menu</Button>
            </DialogActions>
          </form>
        </Dialog>


        <Dialog open={categoryDialogOpen} onClose={handleMenuDialogClose}>
          <form onSubmit={handleCategorySubmit}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent>
              {/* Item Title */}
              <TextField
                required
                margin="dense"
                id="-categoryTitle"
                name="categoryTitle"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                label="Category Title"
                type="text"
                fullWidth
                variant="standard"
              />
              {/* Item Description */}
              <TextField
                required
                margin="dense"
                id="cate-description"
                name="categoryDescription"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                label="Category Description"
                type="text"
                fullWidth
                variant="standard"
              />
          
              {/* Item Status */}
              <TextField
                required
                margin="dense"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCategoryDialogClose}>Cancel</Button>
              <Button type="submit">Add Category</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Item Dialog */}
        <Dialog open={itemsDialogOpen} onClose={handleItemsDialogClose}>
          <form onSubmit={handleItemSubmit}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
              {/* Item Title */}
              <TextField
                required
                margin="dense"
                id="item-title"
                name="itemTitle"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                label="Item Title"
                type="text"
                fullWidth
                variant="standard"
              />
              {/* Item Description */}
              <TextField
                required
                margin="dense"
                id="item-description"
                name="itemDescription"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                label="Item Description"
                type="text"
                fullWidth
                variant="standard"
              />
              {/* Item Price */}
              <TextField
                required
                margin="dense"
                id="item-price"
                name="itemPrice"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                label="Item Price"
                type="number"
                fullWidth
                variant="standard"
              />
              {/* Item Status */}
              <TextField
                required
                margin="dense"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                type="text"
                fullWidth
                variant="standard"
              />

              {/* Available Times for Each Day */}
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day}>
                  <DialogTitle>{day}</DialogTitle>
                  {/* <TextField
                        margin="dense"
                        label={`${day} Start Time`}
                        type="text"
                        value={availableTimes[day]?.start || ''}
                        onChange={(e) => setAvailableTimes({
                            ...availableTimes,
                            [day]: { ...availableTimes[day], start: e.target.value }
                        })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label={`${day} End Time`}
                        type="text"
                        value={availableTimes[day]?.end || ''}
                        onChange={(e) => setAvailableTimes({
                            ...availableTimes,
                            [day]: { ...availableTimes[day], end: e.target.value }
                        })}
                        fullWidth
                        variant="standard"
                    /> */}
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Opening Time"
                          value={availableTimes[day]?.start ? dayjs(availableTimes[day]?.start) : null}
                          onChange={(e) =>setAvailableTimes({
                              ...availableTimes,
                              [day]: {
                                ...availableTimes[day],
                                start:e ? e.format('HH:mm') : '',
                              },
                            })}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Closing Time"
                          value={availableTimes[day]?.end ? dayjs(availableTimes[day]?.end) : null}
                          onChange={(e) =>
                            setAvailableTimes({
                              ...availableTimes,
                              [day]: {
                                ...availableTimes[day],
                                end: e ? e.format('HH:mm') : '',
                              },
                            })
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleItemsDialogClose}>Cancel</Button>
              <Button type="submit">Add Item</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Box sx={{ width: "50%", margin: "auto", mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="menu-select-label">Select Menu</InputLabel>
            <Select
              labelId="menu-select-label"
              id="menu-select"
              value={selectedMenuId}
              label="Select Menu"
              onChange={handleMenuChange}
            >
              {menus.map((menu) => (
                <MenuItem key={menu.menuId} value={menu.menuId}>
                  {menu.menuTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 2, width: "50%", margin: "auto" }}>
          <Button
            sx={{ marginTop: "20px" }}
            variant="outlined"
            onClick={handleCategoryDialogOpen}
          >
            Add Category
          </Button>
        </Box>

        <Box sx={{ width: "50%", margin: "auto", mt: 2 }}>
          {categories.map((category) => (
            <Accordion key={category._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                onClick={() => handleCategoryChange(category._id)}
              >
                <Typography>{category.categoryTitle}</Typography>
               <Box sx={{display:'flex', justifyContent:'flex-end'}} >
               <Button color='error' variant='contained' onClick={handleCategoryDelete}>Delete</Button>
               </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{category.categoryDescription}</Typography>
                <Box sx={{ marginTop: "10px" }}>
                  <Button variant="contained" onClick={handleItemsDialogOpen}>
                    Add Item
                  </Button>
                
                  <Typography
                    sx={{
                      marginTop: "20px",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                    }}
                  >
                    Items:
                  </Typography>
                  {items.map((item, index) => (
                    <Typography
                      key={index}
                      sx={{ color: "black", fontWeight: "bold" }}
                    >
                      {item} - ${price[index]}
                      <Button 
                        variant="contained" 
                        onClick={() => handleModifireDialogOpen(item.id)}>
                        Add modifiers
                      </Button>
                    </Typography>
                    
                  ))}
                  <Box sx={{ marginTop: "10px" }}>
                  {ItemIds.length > 0 ? (
             ItemIds.map((itemId, index) => (
          <Button variant='contained' key={index} onClick={() => handleModifireClick(itemId)}>
            Modifiers {itemId}
          </Button>
          
        ))
      ) : (
        <p>No items found</p> 
      )}
      
                  <Dialog open={modifiresDialogOpen} onClose={handleModifireDialogClose}>
          <form onSubmit={handleModifireSubmit}>
            <DialogTitle>Add Modifire</DialogTitle>
            <DialogContent>
              {/* Item Title */}
              <TextField
                required
                margin="dense"
                id="modifire-title"
                name="modifirename"
                value={modifirename}
                onChange={(e) => setModifirename(e.target.value)}
                label="Modifire Title"
                type="text"
                fullWidth
                variant="standard"
              />
            
              {/* Item Price */}
              <TextField
                required
                margin="dense"
                id="modifire-price"
                name="modifirePrice"
                value={modifirePrice}
                onChange={(e) => setModifirePrice(e.target.value)}
                label="Modifire Price"
                type="number"
                fullWidth
                variant="standard"
              />
              {/* Item Status */}
              <TextField
                required
                margin="dense"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
                type="text"
                fullWidth
                variant="standard"
              />

              {/* Available Times for Each Day */}
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day}>
                  <DialogTitle>{day}</DialogTitle>
                  {/* <TextField
                        margin="dense"
                        label={`${day} Start Time`}
                        type="text"
                        value={availableTimes[day]?.start || ''}
                        onChange={(e) => setAvailableTimes({
                            ...availableTimes,
                            [day]: { ...availableTimes[day], start: e.target.value }
                        })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label={`${day} End Time`}
                        type="text"
                        value={availableTimes[day]?.end || ''}
                        onChange={(e) => setAvailableTimes({
                            ...availableTimes,
                            [day]: { ...availableTimes[day], end: e.target.value }
                        })}
                        fullWidth
                        variant="standard"
                    /> */}
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Start Time"
                          value={availableTimes[day]?.start ? dayjs(availableTimes[day]?.start) : null}
                          onChange={(e) =>setAvailableTimes({
                              ...availableTimes,
                              [day]: {
                                ...availableTimes[day],
                                start:e ? e.format('HH:mm') : '',
                              },
                            })}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          label="Closing Time"
                          value={availableTimes[day]?.end ? dayjs(availableTimes[day]?.end) : null}
                          onChange={(e) =>
                            setAvailableTimes({
                              ...availableTimes,
                              [day]: {
                                ...availableTimes[day],
                                end: e ? e.format('HH:mm') : '',
                              },
                            })
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </DialogContent>
            <Button type='submit' variant='contained'>Add Modifire</Button>
          
          </form>
        </Dialog>

                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        {modifiers.length > 0 && (
        <div>
          <h3>Modifiers for Selected Item:</h3>
          <ul>
            {modifiers.map((modifier, index) => (
              <li key={index}>{modifier.name}</li> 
            ))}
          </ul>
        </div>
      )}
      </div>
    );
};

export default Menuitemsadd;

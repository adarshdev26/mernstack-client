import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sidebar from './sidebar';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
const Menuitemsadd = () => {
    const [menuDialogOpen, setMenuDialogOpen] = useState(false);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [itemDialogOpen, setItemDialogOpen] = useState(false);

    const [menus, setMenus] = useState([]);
    const [menuTitle, setMenuTitle] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [menuStatus, setMenuStatus] = useState('false');

    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('false');
    const [currentMenuIndex, setCurrentMenuIndex] = useState(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
    const [message, setMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [itemTitle, setItemTitle] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemStatus, setItemStatus] = useState('false');
    const [itemPrice, setItemPrice] = useState('');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
     const [selectedMenu, setSelectedMenu] = useState('')
    const handleMenuDialogOpen = () => setMenuDialogOpen(true);
    const handleMenuDialogClose = () => setMenuDialogOpen(false);

    const handleCategoryDialogOpen = (menuIndex) => {
        setCurrentMenuIndex(menuIndex);
        setCategoryDialogOpen(true);
    };

    const handleCategoryDialogClose = () => setCategoryDialogOpen(false);

    const handleItemDialogOpen = (menuIndex, categoryIndex) => {
        setCurrentMenuIndex(menuIndex);
        setCurrentCategoryIndex(categoryIndex);
        setItemDialogOpen(true);
    };

    const handleItemDialogClose = () => setItemDialogOpen(false);

    const handleMenuChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'menuTitle':
                setMenuTitle(value);
                break;
            case 'menuDescription':
                setMenuDescription(value);
                break;
            case 'menuStatus':
                setMenuStatus(value);
                break;
            default:
                break;
        }
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'categoryTitle':
                setCategoryTitle(value);
                break;
            case 'categoryDescription':
                setCategoryDescription(value);
                break;
            case 'categoryStatus':
                setCategoryStatus(value);
                break;
            default:
                break;
        }
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'itemTitle':
                setItemTitle(value);
                break;
            case 'itemDescription':
                setItemDescription(value);
                break;
            case 'itemPrice':
                setItemPrice(value);
                break;
            case 'itemStatus':
                setItemStatus(value);
                break;
            default:
                break;
        }
    };

    const handleMenuSubmit = async (event) => {
        event.preventDefault();
        const newMenu = {
            restaurantId: id,
            menuTitle,
            menuDescription,
            status: menuStatus === 'true',
            categories: []
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
                const createdMenu = await response.json();
                setMenus([...menus, createdMenu]);
                setMenuTitle('');
                setMenuDescription('');
                setMenuStatus('false');
                setMessage('Menu successfully added');
                setOpenAlert(true);
                handleMenuDialogClose();
            } else {
                setMessage('Failed to add menu');
                setOpenAlert(true);
                console.error('Failed to create the menu:', response.statusText);
            }
        } catch (error) {
            console.error('Error while creating the menu:', error);
        }
    };

    const handleCategorySubmit = async (event) => {
        event.preventDefault();
        const categoryData = {
            menuId: menus[currentMenuIndex]._id,
            categoryTitle,
            categoryDescription,
            status: categoryStatus === 'true',
        };

        try {
            const response = await fetch('http://localhost:5000/api/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData),
            });

            if (response.ok) {
                const createdCategory = await response.json();
                const updatedMenus = [...menus];
                if (!updatedMenus[currentMenuIndex].categories) {
                    updatedMenus[currentMenuIndex].categories = [];
                }
                updatedMenus[currentMenuIndex].categories.push(createdCategory);
                setMenus(updatedMenus);
                setCategoryTitle('');
                setCategoryDescription('');
                setCategoryStatus('false');
                handleCategoryDialogClose();
            } else {
                console.error('Failed to create the category:', response.statusText);
            }
        } catch (error) {
            console.error('Error while creating the category:', error);
        }
    };

    const handleItemSubmit = async (event) => {
        event.preventDefault();
        const itemData = {
            menuId: menus[currentMenuIndex]._id,
            categoryId: menus[currentMenuIndex].categories[currentCategoryIndex]._id,
            itemTitle,
            itemDescription,
            itemPrice,
            status: itemStatus === 'true',
        };

        try {
            const response = await fetch('http://localhost:5000/api/additem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
            });

            if (response.ok) {
                const createdItem = await response.json();
                const updatedMenus = [...menus];
                if (!updatedMenus[currentMenuIndex].categories[currentCategoryIndex].items) {
                    updatedMenus[currentMenuIndex].categories[currentCategoryIndex].items = [];
                }
                updatedMenus[currentMenuIndex].categories[currentCategoryIndex].items.push(createdItem);
                setMenus(updatedMenus);
                setItemTitle('');
                setItemDescription('');
                setItemPrice('');
                setItemStatus('false');
                handleItemDialogClose();
            } else {
                console.error('Failed to create the item:', response.statusText);
            }
        } catch (error) {
            console.error('Error while creating the item:', error);
        }
    };

    const handleClose = () => setOpenAlert(false);

    return (
        <div>
            <Sidebar />
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={message.includes('successfully') ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 2 }}>
                <Button variant="outlined" onClick={handleMenuDialogOpen}>Add Menu</Button>
            </Box>

            <Dialog open={menuDialogOpen} onClose={handleMenuDialogClose}>
                <form onSubmit={handleMenuSubmit}>
                    <DialogTitle>Add Menu</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="menu-title"
                            name="menuTitle"
                            value={menuTitle}
                            onChange={handleMenuChange}
                            label="Menu Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="menu-description"
                            name="menuDescription"
                            value={menuDescription}
                            onChange={handleMenuChange}
                            label="Menu Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="menu-status-label">Status</InputLabel>
                            <Select
                                labelId="menu-status-label"
                                id="menu-status"
                                name="menuStatus"
                                value={menuStatus}
                                onChange={handleMenuChange}
                                label="Status"
                            >
                                <MenuItem value="true">Open</MenuItem>
                                <MenuItem value="false">Close</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleMenuDialogClose}>Cancel</Button>
                        <Button type="submit">Add Menu</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Box sx={{ maxWidth: '600px', width: '100%' }}>
            {menus.map((menu, menuIndex) => (
                <Accordion key={menu._id} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ flexGrow: 1,  }}>{menu.menuTitle}</Box>
                        <Button variant="outlined" onClick={() => handleCategoryDialogOpen(menuIndex)}>
                            Add Category
                        </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        {menu.categories && menu.categories.map((category, categoryIndex) => (
                            <Accordion key={category._id}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ flexGrow: 1 }}>{category.categoryTitle}</Box>
                                    <Button variant="outlined" onClick={() => handleItemDialogOpen(menuIndex, categoryIndex)}>
                                        Add Item
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {category.items && category.items.map((item) => (
                                        <Box key={item._id}>
                                            <h4>{item.itemTitle}</h4>
                                            <p>{item.itemDescription}</p>
                                            <p>${item.ItemPrice}</p>
                                        </Box>
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
            </Box>
            </Box>

            <Dialog open={categoryDialogOpen} onClose={handleCategoryDialogClose}>
                <form onSubmit={handleCategorySubmit}>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="category-title"
                            name="categoryTitle"
                            value={categoryTitle}
                            onChange={handleCategoryChange}
                            label="Category Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="category-description"
                            name="categoryDescription"
                            value={categoryDescription}
                            onChange={handleCategoryChange}
                            label="Category Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="category-status-label">Status</InputLabel>
                            <Select
                                labelId="category-status-label"
                                id="category-status"
                                name="categoryStatus"
                                value={categoryStatus}
                                onChange={handleCategoryChange}
                                label="Status"
                            >
                                <MenuItem value="true">Open</MenuItem>
                                <MenuItem value="false">Close</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCategoryDialogClose}>Cancel</Button>
                        <Button type="submit">Add Category</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={itemDialogOpen} onClose={handleItemDialogClose}>
                <form onSubmit={handleItemSubmit}>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="item-title"
                            name="itemTitle"
                            value={itemTitle}
                            onChange={handleItemChange}
                            label="Item Title"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="item-description"
                            name="itemDescription"
                            value={itemDescription}
                            onChange={handleItemChange}
                            label="Item Description"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            required
                            margin="dense"
                            id="item-price"
                            name="itemPrice"
                            value={itemPrice}
                            onChange={handleItemChange}
                            label="Item Price"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel id="item-status-label">Status</InputLabel>
                            <Select
                                labelId="item-status-label"
                                id="item-status"
                                name="itemStatus"
                                value={itemStatus}
                                onChange={handleItemChange}
                                label="Status"
                            >
                                <MenuItem value="true">Open</MenuItem>
                                <MenuItem value="false">Close</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleItemDialogClose}>Cancel</Button>
                        <Button type="submit">Add Item</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Box sx={{ width: '60%', margin: 'auto', mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Select Menu
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="menu-select-label">Menu</InputLabel>
                <Select
                    labelId="menu-select-label"
                    value={selectedMenu}
                    onChange={handleMenuChange}
                    label="Menu"
                >
                    {menus.map((menu) => (
                        <MenuItem key={menu._id} value={menu._id}>
                            {menu.menuTitle}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
        </div>
    );
};

export default Menuitemsadd;

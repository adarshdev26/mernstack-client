import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Drawer, Typography } from '@mui/material';
import { CartContext } from '../../context/cartContext';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import './shop.css';
import TextField from '@mui/material/TextField';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Closedimg from './assets/images/close.png'
import pickup from "./assets/images/pickup.png"
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import Sidebaraddtocart from '../../components/sidebaraddtocart';
const Shop = (props) => {


  
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [selectedExtra, setselectedExtra] = useState([]);
  const [message, setMessage] = useState('');
  const [openalert, setOpenalert] = useState(false);
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [menuId, setmenuId] = useState([]);
  const [categories, setCategories] = useState([]);
  const [restarurentName, setRestarurentName] = useState('')
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStaus] = useState('');
  const [deliveryTimes, setDeliveryTimes] = useState({});
  const [categoryId, setCategoryId] = useState([]);
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
 const [categoriesByMenu,setCategoriesByMenu] = useState([])
 const [itemsByCategory, setItemsByCategory] = useState([]);
 const [openDialog, setDialog] = useState(false);
 const [filteredItems, setFilteredItems] = useState([]);




 useEffect(() => {
  axios.get(`http://localhost:5000/api/menu/${id}`)
    .then((response) => {
      const menuItems = response.data.map(item => item.menuTitle);
      const menuIds = response.data.map(item => item._id);
      setmenuId(menuIds);
      setMenu(menuItems);
    })
    .catch((error) => {
      console.error("Error fetching menu:", error);
    });
}, [id]);


 
useEffect(() => {
  axios.get(`http://localhost:5000/api/restaurants/${id}`)
    .then((response) => {
      const deliveryTimes = response.data.deliveryTimes;
      
      const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };
      
      setDeliveryTimes(Object.fromEntries(
        Object.entries(deliveryTimes).map(([day, times]) => [
          day,
          { start: formatTime(times.start), end: formatTime(times.end) }
        ])
      ));
      
      setRestarurentName(response.data.restaurantName);
      setAddress(response.data.address);
      setPhone(response.data.phoneNumber);
      setStaus(response.data.status);
    })
    .catch((error) => {
      console.log(error);
    });
}, [id]);


useEffect(() => {
  const fetchCategories = async () => {
    try {
      const categoryPromises = menuId.map(id =>
        axios.get(`http://localhost:5000/api/getcategory/${id}`)
      );

      const responses = await Promise.all(categoryPromises);
      const fetchedCategories = responses.flatMap(response => response.data);

      // Organize categories by menu ID
      const categoriesByMenu = menuId.map(id => 
        fetchedCategories.filter(category => category.menuId === id)
      );

      setCategoriesByMenu(categoriesByMenu);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (menuId.length > 0) {
    fetchCategories();
  }
}, [menuId]);


  useEffect(() => {
    // Fetch categories for each menu ID
    const fetchCategories = async () => {
      try {
        const categoryPromises = menuId.map(id =>
          axios.get(`http://localhost:5000/api/getcategory/${id}`)
        );
  
        const responses = await Promise.all(categoryPromises);
        const fetchedCategories = responses.flatMap(response => {
          const data = response.data;
          return Array.isArray(data) ? data : [];
        });
  
        // Organize categories by menu ID
        const categoriesByMenu = menuId.map(id => 
          fetchedCategories.filter(category => category.menuId === id)
        );
  
        
        setCategoryName(categoriesByMenu.map(catList => catList.map(cat => cat.categoryTitle)));
        setCategoryId(categoriesByMenu.map(catList => catList.map(cat => cat._id)));
  
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, [menuId]);
  

  useEffect(() => {
    const fetchItemsForCategories = async () => {
      try {
        const allCategoryIds = categoriesByMenu.flat().map(category => category._id);
        const itemPromises = allCategoryIds.map(id =>
          axios.get(`http://localhost:5000/api/item/${id}`)
        );
  
        const responses = await Promise.all(itemPromises);
        const fetchedItems = responses.flatMap(response => response.data);
  
        // Organize items by category ID
        const itemsByCategory = categoriesByMenu.map(categories =>
          categories.map(category => 
            fetchedItems.filter(item => item.categoryId === category._id)
          )
        );
        console.log(itemsByCategory, "this is items")
        setItemsByCategory(itemsByCategory);
  
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
  
    if (categoriesByMenu.length > 0) {
      fetchItemsForCategories();
    }
  }, [categoriesByMenu]);
  
  
  

 
  
  const handleClickOpen = (item) => {
    setSelectedProduct((prevCart) => [...prevCart, item]);

    setOpen(true);
  };

console.log(selectedProduct, "this is selected produts")

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setOpenalert(false)
  };














  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  
  
  const getTodayDay = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date().getDay(); 
    return daysOfWeek[today === 0 ? 6 : today - 1]; 
  };

  const todayDay = getTodayDay();
  const todayHours = deliveryTimes[todayDay];
  

  useEffect(() => {
    const result = menu.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMenu(result);
  }, [searchTerm, menu]);

  
  useEffect(() => {
    // Flatten the nested arrays and filter based on search term
    const result = itemsByCategory.flatMap(categoryArray =>
      categoryArray.flatMap(itemArray =>
        itemArray.filter(item =>
          item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
    setFilteredItems(result);
  }, [searchTerm, itemsByCategory]);
  



  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle snackbar close
  const handleClosedfilter = () => {
    setOpenalert(false);
  };

  // Function to check if any item in the category matches the search term
  const categoryMatchesSearch = (menuIndex) => {
    if (!itemsByCategory[menuIndex]) return false;

    return itemsByCategory[menuIndex].some(category =>
      category.some(item =>
        item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };


  
  useEffect(() => {
    // Open the dialog on component mount
    setOpen(true);
  }, []);

  const handleClosedialog = () => {
    setOpen(false);
  };

  console.log(selectedProduct, 'this is selected product')
  return (
    <>
  
    
      

     <Box sx={{ 
  backgroundColor: '#000', 
  color: '#fff', 
  padding: '20px', 
  textAlign: 'center' 
}}>
  <Typography 
    variant="h4" 
    sx={{ 
      fontWeight: 'bold', 
      fontSize: '2.5rem', 
      textAlign: 'center',
      marginBottom: '10px' 
    }}
  >
    {restarurentName}
  </Typography>

  <Grid container justifyContent="center" alignItems="center" spacing={2}>
    <Grid item>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '1.2rem', 
          fontWeight: 'medium', 
          marginRight: '10px' 
        }}
      >
        {address}
      </Typography>
    </Grid>

    <Grid item>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '1.2rem', 
          fontWeight: 'medium', 
          marginLeft: '10px', 
          marginRight: '10px'
        }}
      >
        |
      </Typography>
    </Grid>

    <Grid item>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '1.2rem', 
          fontWeight: 'medium', 
          marginLeft: '10px' 
        }}
      >
        {phone}
      </Typography>
    </Grid>

    <Grid item>
      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: '1.2rem', 
          fontWeight: 'medium', 
          marginLeft: '10px', 
          marginRight: '10px' 
        }}
      >
        |
      </Typography>
    </Grid>

    <Grid item>
  <Typography 
    variant="body1" 
    sx={{ 
      fontSize: '1.2rem', 
      fontWeight: 'medium', 
      marginLeft: '10px',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    {todayHours 
      ? ` ${todayDay} ${todayHours.start} to ${todayHours.end}` 
      : (
        <>       
          <img 
            src={Closedimg}
            alt="Closed" 
            style={{ width: '44px', height: '44px', marginRight: '8px',  }}
          />
        </>
      )}
  </Typography>
</Grid>
  </Grid>
</Box>
      <Sidebaraddtocart  cart={selectedProduct} />
<Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', marginLeft: '10px' }}>
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          placeholder="Search for menu item"
          sx={{
            width: '50%',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            }
          }}
        />
      </Box>
      {/* <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item.itemTitle}</li>
        ))}
      </ul> */}
      <Snackbar
        sx={{ marginTop: '50px' }}
        open={openalert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={message.includes('successful') ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>

      {/* Accordion Display */}
      <div className="shop-container">
    <div className="shop">
    {menu.map((menuTitle, menuIndex) => (
          <div key={menuIndex}>
            {categoryMatchesSearch(menuIndex) && (
              <>
                <Typography variant="h5" className="menu-title">{menuTitle}</Typography>
                {categoriesByMenu[menuIndex].map((category, categoryIndex) => (
                  <Accordion key={category._id}>
                    <AccordionSummary expandIcon={<AddIcon />}>
                      <Typography>{category.categoryTitle}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {itemsByCategory[menuIndex][categoryIndex].map((item) => (
                        <div key={item._id} className="menu-item">
                          <Typography variant="body1">{item.itemTitle}</Typography>
                          <Typography variant="body2">${item.itemPrice}</Typography>
                          <Button onClick={() => handleClickOpen(item)}>Add to Cart</Button>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </>
            )}
          </div>
        ))}
    
</div>

    </div>


    <Box 
      sx={{ 
        backgroundColor: '#4a4a4a',  // Dark gray background
        color: '#fff',  // White text
        padding: '20px', 
        textAlign: 'center'
      }}
    >
      {/* Restaurant Name */}
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 'bold', 
          marginBottom: '10px' 
        }}
      >
       {restarurentName}
      </Typography>
      
      {/* Address */}
      <Typography 
        variant="body1" 
        sx={{ 
          marginBottom: '10px',
          fontSize: '1rem',
        }}
      >
        {address}
      </Typography>
      
      {/* ADA Compliance Message */}
      <Typography 
        variant="body2" 
        sx={{ 
          marginBottom: '10px',
          fontSize: '0.9rem'
        }}
      >
        ADA Compliance
      </Typography>
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: '0.9rem',
          marginBottom: '20px'
        }}
      >
        Accessibility Compliance and Support Options: If you have a hard time viewing items on this webpage, we provide instant support to read menu items AND accept orders over the phone, call us at...
      </Typography>
      
      {/* Divider Line */}
      <Divider sx={{ backgroundColor: '#fff', margin: '10px 0' }} />
      
      {/* Copyright Text */}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: '0.8rem',
        }}
      >
        © 2024 {restarurentName}.com
      </Typography>
    </Box>
    </>
  );
};

export default Shop;

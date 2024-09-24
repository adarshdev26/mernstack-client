import React, { useState, useContext, useEffect } from 'react';
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
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Grid from "@mui/material/Grid";
import { useParams } from 'react-router-dom';
import './shop.css';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Sidebaraddtocart from '../../components/sidebaraddtocart';
import { useCart } from '../../context/CartContext';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
const Shop = () => {

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  //const [quantity, setQuantity] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
 const [productDetails, setProductDetails] = useState(null);
 const [expanded, setExpanded] = useState([]);
 const [selectedModifier, setSelectedModifier] = useState([]);

 const { addToCart, cartTotal } = useCart(); // Get the addToCart function from context
 const [quantity, setQuantity] = useState(1);








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
       console.log(itemsByCategory, "this is items");
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
    setProductDetails(item); 
    setOpen(true);    
    setQuantity(1);      
  };


console.log('this is product', productDetails)


  const handleClose = () => {
    setOpen(false);
  };




  const handleAddToCart = () => {
    addToCart(productDetails, quantity);
    setOpen(false);
  };
  
  //const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  

  
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








  const handleExpand = (menuIndex) => {
    setExpanded(prevExpanded => {
      if (prevExpanded.includes(menuIndex)) {
        return prevExpanded;
      } else {
        return [...prevExpanded, menuIndex];
      }
    });
  };
  


  useEffect(() => {
    const updatedExpanded = menu
      .map((_, menuIndex) => {
        if (categoryMatchesSearch(menuIndex)) {
          return menuIndex;
        }
        return null;
      })
      .filter(menuIndex => menuIndex !== null);
  
    setExpanded(updatedExpanded);
  }, [searchTerm, itemsByCategory, menu]);
  

  
  useEffect(() => {
  sessionStorage.setItem('id',id)
    setOpen(true);
  }, []);



const getFilteredItemsByCategory = () => {
  return itemsByCategory.map((categories, menuIndex) => {
    return categories.map((items, categoryIndex) => {
      return items.filter(item =>
        item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  });
};


const filteredItemsByCategory = getFilteredItemsByCategory();




const categoryMatchesSearch = (menuIndex) => {
  if (!filteredItemsByCategory[menuIndex]) return false;

  return filteredItemsByCategory[menuIndex].some(items =>
    items.length > 0
  );
};



const isItemAvailable = (availableTimes) => {
  if (!availableTimes) {
    return false;  
  }



  
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const now = new Date();
  const currentDay = daysOfWeek[now.getDay()];
  const currentTime = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");

  if (availableTimes[currentDay]) {
    const { start, end } = availableTimes[currentDay];
    return currentTime >= start && currentTime <= end;
  }
  return false; 
};




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
     <HomeIcon/>
        {address}
       
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
      <PhoneIcon/>
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
      display: 'flex',
      alignItems: 'center'
    }}
  >
  <AccessTimeFilledIcon/>
   <select>
        {Object.entries(deliveryTimes).map(([day, times]) => (
          <option key={day} value={day} selected={day === todayDay}>
            {day}: {times.start} - {times.end}
          </option>
        ))}
      </select>
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
    {menu
    .map((menuTitle, menuIndex) => (
      <div key={menuIndex}>
        {categoryMatchesSearch(menuIndex) && (
          <>
            <Typography variant="h5" className="menu-title">{menuTitle}</Typography>
            {categoriesByMenu[menuIndex]
            //.filter(category => category.status === "true")
            .map((category, categoryIndex) => (
              <Accordion
                key={category._id}
                expanded={expanded.includes(menuIndex)}
                onChange={() => handleExpand(menuIndex)}
              >
                <AccordionSummary expandIcon={<AddIcon />}>
                  <Typography>{category.categoryTitle}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {filteredItemsByCategory[menuIndex][categoryIndex]
                     // .filter(item => item.status === "true")
                      .filter(item => isItemAvailable(item.availableTimes))
                      .map(item => (
                        <div key={item._id} className="menu-item hand-cursor">
                          <Typography variant="body1">{item.itemTitle}</Typography>
                          <Typography variant="body2">${item.itemPrice}</Typography>
                          <div onClick={() => handleClickOpen(item)}>
                            <Typography variant="body1" style={{ cursor: "pointer" }}>
                              Select
                            </Typography>
                          </div>
                        </div>
                      ))}
                  </AccordionDetails>

              </Accordion>
            ))}
          {productDetails && (
        <Dialog open={open} onClose={handleClose} sx={{height:'400px'}}>
          <DialogTitle sx={{ background: 'black', color: 'whitesmoke', textAlign: 'center' }}>
            {productDetails.itemTitle}
          </DialogTitle>
          <DialogTitle>Optionals:</DialogTitle>
          <DialogContent>
            {productDetails.modifiers.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Checkbox />
                <Typography sx={{ marginLeft: '8px' }}>{item.name}</Typography>
                <Typography sx={{ marginLeft: '8px' }}>${item.price}</Typography>
              </Box>
            ))}
            <Box>
            <Typography sx={{ display:'flex', justifyContent:'center', marginTop:'20px', color:'red' }}>${cartTotal}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose} color="error">
              Close
            </Button>
            <Button variant="contained" onClick={handleAddToCart} color="success">
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}

          </>
        )}
      </div>
    ))}
  </div>
</div>

    </>
  );
};

export default Shop;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "../src/pages/shop/shop";
import Cart from "./pages/cart/cart";
import { RegistrationForm } from "./pages/register/register";
import { LoginForm } from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Registerrestaurant from "./pages/dashboard/registerrestaurant";
import Restarurentform from "./pages/dashboard/restarurentform";
import Registerusers from "./pages/dashboard/registerusers";
import Userdashboard from "./pages/users/dashboard/dasboard";
import Editregisterform from "./pages/dashboard/editrestaruentpage";
import Menuitemsadd from "./pages/dashboard/menuitemsadd";
function App() {
  return (

    
    <Router>
      
      <Routes>
        <Route path="/:id" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registerrestaurant" element={<Registerrestaurant />} />
        <Route path="/restrarurentform" element={<Restarurentform />} />
        <Route path="/registerusers" element={<Registerusers />} />
        <Route path="/account" element={<Userdashboard />} />
        <Route path="/editregisterform" element={<Editregisterform />} />
        <Route path="/menuitems" element={<Menuitemsadd />} />
  
        
      </Routes>
    </Router>
 
  );
}

export default App;

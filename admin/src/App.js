import "./App.css";
import {
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./Pages/UserList/UserList";
import User from "./Pages/User/User";
import ProductList from "./Pages/ProductList/ProductList";
import Product from "./Pages/Product/Product";
import NewProduct from "./Pages/NewProduct/NewProduct";
import { useSelector } from "react-redux";
import Topbar from "./Components/topbar/topbar"
import Sidebar from "./Components/sidebar/sidebar"
import Home from './Pages/Home/home'
import Tabs from "./Components/tabs/Tabs"
import WelcomePage from "./Pages/WelcomePage";
import Manage from "./Pages/Manage/manage";
import NewOrder from "./Pages/NewOrders/NewOrder";
import OrderList from "./Pages/OrderList/OrderList";

function App() {
 const user = useSelector((state) => state.user.currentUser);
  return (
       <> 
        <Routes>
          <Route exact path="/"  element={ <Tabs /> } />
        <Route path="/auth/:confirmationCode" element={<WelcomePage/>} exact/>
</Routes>
               {user && (<>
               <Topbar /> 
               <div className="container"> 
                <Sidebar />
                <Routes>
                <Route path="/home" element= {<Home/>} />
                <Route path="/users" element={<UserList />} />
                <Route path="/user/:userId" element={<User />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/neworder" element={<NewOrder />} />
                <Route path="/manage" element={<Manage />} />
                <Route path="/orders" element={<OrderList />} />
                </Routes>
                </div>
                </>)}
                </>
  );
}
export default App;
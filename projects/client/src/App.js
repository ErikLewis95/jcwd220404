import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/user/LandingPage";
import { AccountPage } from "./pages/user/AccountPage";
import { NotificationPage } from "./pages/user/NotificationPage";
import { TransactionPage } from "./pages/user/TransactionPage";
import { CategoryPage } from "./pages/user/CategoryPage";
import { CartPage } from "./pages/user/CartPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/notification" element={<NotificationPage/>}></Route>
        <Route path="/account" element={<AccountPage/>}></Route>
        <Route path="/transaction" element={<TransactionPage/>}></Route>
        <Route path="/category" element={<CategoryPage/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom"
import { LandingPage } from "./pages/user/LandingPage";
import { AccountPage } from "./pages/user/AccountPage";
import { NotificationPage } from "./pages/user/NotificationPage";
import { TransactionPage } from "./pages/user/TransactionPage";
import { CategoryPage } from "./pages/user/CategoryPage";
import { CartPage } from "./pages/user/CartPage";
import { RegisterPage } from "./pages/user/RegisterPage";
import { VerificationPage } from "./pages/user/VerificationPage";
import { ProfilePage } from "./pages/user/ProfilePage";
import { AddressPage } from "./pages/user/AddressPage";
import { ForgotPasswordPage } from "./pages/user/ForgotPassPage";
import { ResetPassPage } from "./pages/user/ResetPassPage";
import { ChangePassword } from "./pages/user/ChangePassword";
import { ChangeEmail } from "./pages/user/ChangeEmail";
import { ListAddressPage } from "./pages/user/ListAddressPage";
import { RestrictedPage } from "./pages/403ResultPage";
import { LoginAdminPage } from "./pages/admin/LoginAdminPage";
import { AdminPage } from "./pages/admin/AdminPage";
import { UpdateAddressPage } from "./pages/user/UpdateAddressPage";
import { NotFoundPage } from "./pages/user/404ResultPage";
import { WindowComp } from "./components/user/WindowComp";
import { EnterComp } from "./components/user/EnterComp";
import { Checkout } from "./pages/user/Checkout";
import { ListCheckoutAddress } from "./pages/user/ListCheckoutAddress";
import { PaymentMethod } from "./pages/user/PaymentMethod";
import { OrderSuccess } from "./pages/user/OrderSuccess";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/notification" element={<NotificationPage />}></Route>
        <Route path="/transaction" element={<TransactionPage />}></Route>
        <Route path="/category" element={<CategoryPage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route
          path="/checkout/address"
          element={<ListCheckoutAddress />}
        ></Route>
        <Route path="/checkout/payment" element={<PaymentMethod />}></Route>
        <Route
          path="/checkout/payment/success"
          element={<OrderSuccess />}
        ></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/verification/:token"
          element={<VerificationPage />}
        ></Route>
        <Route path="/login-user" element={<EnterComp />}></Route>
        <Route path="/account" element={<AccountPage />}></Route>
        <Route path="/account/profile/:id" element={<ProfilePage />}></Route>
        <Route
          path="/account/profile/password"
          element={<ChangePassword />}
        ></Route>
        <Route path="/account/profile/email" element={<ChangeEmail />}></Route>
        <Route
          path="/account/address/:id"
          element={<ListAddressPage />}
        ></Route>
        <Route path="/account/address" element={<ListAddressPage />}></Route>
        <Route
          path="/account/address/add/:id"
          element={<AddressPage />}
        ></Route>
        <Route
          path="/account/address/update/:id"
          element={<UpdateAddressPage />}
        ></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route
          path="/reset-password/:token"
          element={<ResetPassPage />}
        ></Route>
        <Route path="/restricted" element={<RestrictedPage />}></Route>
        <Route path="/login-admin" element={<LoginAdminPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;

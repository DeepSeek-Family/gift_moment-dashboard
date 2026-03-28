import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home";
import PrivacyPolicy from "../Pages/Dashboard/PrivacyPolicy";
import ChangePassword from "../Pages/Auth/ChangePassword";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";
import Notifications from "../Pages/Dashboard/Notifications";
import User from "../Pages/Dashboard/User";
import UserProfile from "../Pages/Dashboard/AdminProfile/UserProfile";
import TermsAndCondition from "../Pages/Dashboard/TermsAndCondition";
import Vendors from "../Pages/Dashboard/Vendors";
import Faq from "../Pages/Dashboard/Faq";
import AboutUs from "../components/ui/Settings/AboutUs";
import OfferList from "../components/ui/Settings/OfferList";
import Orders from "../Pages/Dashboard/Orders";
import Vendor from "../Pages/Dashboard/Vendor";
import QuoteUpdate from "../Pages/Dashboard/QuoteUpdate";
import SingleQuoteUpdate from "../Pages/Dashboard/SingleQuoteUpdate";
import SingleQuoteHistory from "../Pages/Dashboard/SingleQuoteHistory";
import OccasionManagement from "../Pages/Dashboard/OccationManagement";
import Transactions from "@/Pages/Dashboard/Transactions";
import Banner from "@/Pages/Dashboard/Banner";
import CheckoutSuccess from "@/Pages/Dashboard/CheckoutSuccess";
import CheckoutCancel from "@/Pages/Dashboard/CheckoutCancel";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute><Main /></ProtectedRoute> ,
    element: (
      // <PrivateRoute>
      <Main />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/occasion-management",
        element: <OccasionManagement />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },
      {
        path: "/client/profile/:id",
        element: <User />,
      },
      {
        path: "/staff-list",
        element: <Vendors />,
      },
      {
        path: "/staff/profile/:id",
        element: <Vendor />,
      },

      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/quote-history/:id",
        element: <SingleQuoteHistory />,
      },
      {
        path: "/quote-details/:id",
        element: <SingleQuoteUpdate />,
      },
      {
        path: "/quote-update",
        element: <QuoteUpdate />,
      },

      {
        path: "/personal-information",
        element: <UserProfile />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "f-a-q",
        element: <Faq />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "offer-list",
        element: <OfferList />,
      },
      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndCondition />,
      },

      // {
      //   path: "/edit-terms-and-conditions",
      //   element: <TermsAndCondition />,
      // },
      // {
      //   path: "/press",
      //   element: <Press />,
      // },

      {
        path: "/change-password",
        element: <ChangePassword />,
      },

      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/checkout-success",
    element: <CheckoutSuccess />,
  },
  {
    path: "/checkout-cancel",
    element: <CheckoutCancel />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

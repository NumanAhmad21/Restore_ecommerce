import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import Home from "../../features/home/Home";
import About from "../../features/about/About";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
          {element: <RequireAuth /> , children: [
              {path: '/checkout', element: <CheckoutPage />},
          ] },
          {path: '', element: <Home />},
          {path: '/catalog', element: <Catalog />},
          {path: '/catalog/:id', element: <ProductDetail />},
          {path: '/about', element: <About />},
          {path: '/contact', element: <ContactPage />},
          {path: '/basket', element: <BasketPage />},
        
          {path: '/server-error', element: <ServerError />},
          {path: '/login', element: <LoginForm />},
          {path: '/register', element: <RegisterForm />},
          {path:'/not-found', element: <NotFound />},
          {path: '*', element: <Navigate replace to='/not-found' />}

        ]
    }
])
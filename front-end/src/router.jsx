import {createBrowserRouter} from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import App from "./App.jsx"
import AccountPage from "./pages/AccountPage.jsx"
import { RegisterPage } from "./pages/RegisterPage.jsx"
import ChangeUserPassword from "./pages/SettingsPage.jsx"
import DemoPage from "./pages/DemoPage.jsx"
import CollectionPage from "./pages/CollectionPage.jsx"
import PremiumShop from "./pages/PremiumShop.jsx"

const router = createBrowserRouter([

  {
    path: '/',
    element: <App/>,
    children:[

      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "account/",
        element: <AccountPage/>
      },
      {
        path:"register/",
        element: <RegisterPage/>
      },
      {
        path:"settings/",
        element: <ChangeUserPassword/>
      },
      {
        path:"demo/",
        element: <DemoPage/>
      },
      {
        path:"collection/",
        element:<CollectionPage/>
      },
      {
        path:"premium_shop/",
        element:<PremiumShop/>
      }

    ]
  }


])

export default router;
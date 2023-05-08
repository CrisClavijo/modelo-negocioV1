import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

//import Dashboard from './Dashboard.jsx'
//import './index.css'
import { RouterProvider } from "react-router-dom";
import router from "./componentes/router.jsx";
import { ContextProvider } from './componentes/context/contextProvider'
import { Provider } from 'react-redux';
import store from './redux/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ContextProvider>
  </React.StrictMode>
);


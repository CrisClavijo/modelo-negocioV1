import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { RouterProvider } from "react-router-dom";
import router from "./componentes/router.jsx";
import { ContextProvider } from './componentes/context/contextProvider'
import { Provider } from 'react-redux';
import store from './redux/store'

/*
 *
 * Derechos de autor (c) 2023 Cristian Antonio Clavijo Morales y Angel Mauricio Bautista Gonzalez
 *
 * Todos los derechos reservados. Este código es propiedad de Cristian Antonio Clavijo Morales y Angel Mauricio Bautista Gonzalez
 * y no se permite su reproducción, distribución o modificación sin permiso explícito.
 * 
 * Uso: Este código fue creado para cubrir una necesidad administrativa del Aeropuerto Internacional Felipe Angeles.
 * 
*/

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


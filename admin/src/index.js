import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom';
import ActiveTabProvider from './Context/ActiveTabProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading="null" persistor={persistor}>
                <ActiveTabProvider>
                    <App />
                </ActiveTabProvider>
            </PersistGate>
        </Provider>
</BrowserRouter>
);
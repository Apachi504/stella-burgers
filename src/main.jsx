import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from '../src/components/app/app.jsx'
import './reset.module.scss'
import {Provider} from "react-redux";
import {store} from "./services/store.js";
import {BrowserRouter as Router} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </StrictMode>,
)

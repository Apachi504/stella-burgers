import React, {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './components/app/app'
import './reset.module.scss'
import './index.css'
import {Provider} from "react-redux";
import {store} from "./services/store";
import {HashRouter as Router} from "react-router-dom";

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Router>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </StrictMode>,
)

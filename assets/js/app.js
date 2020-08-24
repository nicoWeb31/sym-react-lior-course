import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomerPagePagApi from './pages/CustomerPagePagApi';
import InvoicePage from './pages/InvoicePage';
import apiService from "./services/authApi"

import '../css/app.css';
import LoginPage from './pages/LoginPage';
import authApi from './services/authApi';


authApi.setUp();

const App = () => {


    const [isAuth, setIsAuth] = useState(false);

    return (

        <HashRouter>

            <Navbar isAuthenticated={isAuth} onLogout={setIsAuth} />

            <main className="container pt-5">
                <Switch>

                    <Route path='/customers' component={CustomersPage} />
                    <Route path='/factures' component={InvoicePage} />
                    <Route path='/login'
                        render={()=> <LoginPage 
                        
                        onLogin={setIsAuth} />} 

                        />
                    <Route path='/' component={Homepage} />



                </Switch>
            </main>

        </HashRouter>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

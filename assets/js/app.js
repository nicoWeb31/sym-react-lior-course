import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import '../css/app.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from "./context/AuthContext";
import CustomerPage from './pages/CustomerPage';
import CustomersPage from './pages/CustomersPage';
import Homepage from './pages/Homepage';
import Invoice from './pages/Invoice';
import InvoicePage from './pages/InvoicePage';
import LoginPage from './pages/LoginPage';
import ResisterPage from './pages/ResisterPage';
import authApi from './services/authApi';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';




authApi.setUp();

const App = () => {


    // retourne un composant doter des prporiete du router dom
    const NavBarWithRouter = withRouter(Navbar);

    const [isAuth, setIsAuth] = useState(authApi.isAuthenticated());

    //context value
    const contextValue = {
        isAuth,
        setIsAuth
    }



    return (

        <AuthContext.Provider value={contextValue}>


            <HashRouter>

                <NavBarWithRouter isAuthenticated={isAuth} onLogout={setIsAuth} />

                <main className="container pt-5">
                    <Switch>

                        <PrivateRoute
                            path='/customers'
                            component={CustomersPage}
                        />

                        <PrivateRoute
                            path='/factures'
                            component={InvoicePage}
                        />

                        <PrivateRoute
                            path='/facture/:id'
                            component={Invoice}
                        />

                        <PrivateRoute
                            path='/customer/:id'
                            component={CustomerPage}
                        />

                        <Route path='/login'
                            component={LoginPage}
                        />

                        <Route path="/register" component={ResisterPage}/>


                        <Route path='/' component={Homepage} />



                    </Switch>
                </main>

            </HashRouter>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />

        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

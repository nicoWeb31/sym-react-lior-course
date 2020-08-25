import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import { HashRouter, Switch, Route, withRouter, Redirect } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomerPagePagApi from './pages/CustomerPagePagApi';
import InvoicePage from './pages/InvoicePage';
import apiService from "./services/authApi"

import '../css/app.css';
import LoginPage from './pages/LoginPage';
import authApi from './services/authApi';


authApi.setUp();

const PrivateRoute = ({ path, isAuth, component }) => isAuth ? <Route path={path} component={component} /> : <Redirect to="/login" />;



const App = () => {


    // retourne un composant doter des prporiete du router dom
    const NavBarWithRouter = withRouter(Navbar);

    const [isAuth, setIsAuth] = useState(authApi.isAuthenticated());



    return (

        <HashRouter>

            <NavBarWithRouter isAuthenticated={isAuth} onLogout={setIsAuth} />

            <main className="container pt-5">
                <Switch>

                    <PrivateRoute
                        path='/customers'
                        isAuth={isAuth}
                        component={CustomersPage}
                    />

                    <PrivateRoute
                        path='/factures'
                        isAuth={isAuth}
                        component={InvoicePage}
                    />

                    <Route path='/login'
                        render={(props) => <LoginPage

                            onLogin={setIsAuth} {...props} />}

                    />
                    <Route path='/' component={Homepage} />



                </Switch>
            </main>

        </HashRouter>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

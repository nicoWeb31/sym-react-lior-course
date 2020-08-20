import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';
import { HashRouter, Switch, Route } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomerPagePagApi from './pages/CustomerPagePagApi';


import '../css/app.css';


const App = () => {
    return (

        <HashRouter>

            <Navbar />

            <main className="container pt-5">
                <Switch>

                    <Route path='/customers' component={CustomersPage} />
                    <Route path='/' component={Homepage} />


                </Switch>
            </main>

        </HashRouter>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);

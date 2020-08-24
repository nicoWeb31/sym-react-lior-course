import React from 'react';
import AuthService from "../services/authApi";
import { NavLink } from 'react-router-dom'

const Navbar = ({ isAuthenticated, onLogout }) => {


    const handleLogout = () => {
        AuthService.logout();
        //<Redirect to={{pathname: "/login"}} />
        onLogout(false);

    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Sym React</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">

                    <li className="nav-item">
                        <NavLink className="nav-link" to='/customers'>Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to='/factures'>Factures</NavLink>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {
                        !isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className="btn btn-success"> Connexion ! </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">Inscription</NavLink>
                                </li>

                            </>
                        )
                            :
                            (

                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>

                                </li>

                            )


                    }
                </ul>
            </div>
        </nav>
    )

}



export default Navbar;
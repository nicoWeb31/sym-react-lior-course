import React, { useState } from 'react';
import authService from "../services/authApi";
import {Redirect} from "react-router-dom"


//histori props de router dom utiliser pour redirection avec la propriétés replace
const LoginPage = ({onLogin,history}) => {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, seterror] = useState("");


    //changement du formulaire
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setCredentials({ ...credentials, [name]: value })
    }

    //soumission du formulaire

    const handleSubmit = async e => {
        e.preventDefault();
        //console.log(credentials)
        try {

            await authService.authenticathe(credentials);
            seterror("");
            onLogin(true);
            history.replace("/customers")

        }
        catch (err) {
            console.log(err.response)
            seterror("les indentifiant ne corresponde pas");
            onLogin(false);

        }

    }

    return (
        <>
            <h1>login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email"
                        className={"form-control" + (error && " is-invalid")}
                        placeholder="adresse email de connection"
                        name="username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}

                    />

                    {error &&
                        <p className="invalid-feedback">{error}</p>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        placeholder="password..."
                        name="password"
                        id="password"
                        value={credentials.password}
                        onChange={handleChange}

                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        je me connect
                    </button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;
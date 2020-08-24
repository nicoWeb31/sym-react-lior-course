import React, { useState } from 'react';
import axios from "axios";

const LoginPage = () => {

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
            const token = await axios.post('https://127.0.0.1:8000/api/login_check', credentials)
                .then(resp => resp.data.token);
            seterror("");

            //je stock le token dans le storage
            window.localStorage.setItem("authToken",token);
                
            //on demande a axios d'utiliser le token ds les prochaines requetes dans son header
            axios.defaults.headers["authorization"] = `Bearer ${token}` 

        }
        catch (err) {
            console.log(err.response)
            seterror("les indentifiant ne corresponde pas")

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
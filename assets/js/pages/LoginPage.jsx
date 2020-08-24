import React, { useState } from 'react';

const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        username : "",
        password : ""
    })


    //changement du formulaire
    const handleChange = (e) =>{
        const value = e.currentTarget.value;
        const name = e.currentTarget.name; 
        setCredentials({...credentials,[name]:value})
    }

    //soumission du formulaire

    const handleSubmit = e =>{
        e.preventDefault();

        console.log(credentials)
    }

    return (
        <>
            <h1>login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input type="email"
                        className="form-control"
                        placeholder="adresse email de connection"
                        name="username"
                        id="username"
                        value={credentials.username}
                        onChange={handleChange}

                    />
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
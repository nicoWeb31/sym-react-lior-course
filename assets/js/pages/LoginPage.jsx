import React, { useContext, useState } from 'react';
import AuthContext from "../context/AuthContext";
import authService from "../services/authApi";
import Field from "../components/forms/Field"
import { toast } from 'react-toastify';



//histori props de router dom utiliser pour redirection avec la propriétés replace
const LoginPage = ({history}) => {

    const {setIsAuth} =useContext(AuthContext)

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
            setIsAuth(true);
            toast.success("Vous ếtes connecté")
            history.replace("/customers")

        }
        catch (err) {
            console.log(err.response)
            seterror("les indentifiant ne corresponde pas");
            setIsAuth(false);
            toast.error("Une erreur est survenue !")

        }

    }

    return (
        <>
            <h1>login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <Field 
                        value={credentials.username} 
                        placeholder="adresse email de connection"
                        onChanges={handleChange}
                        name="username"
                        error={error}
                        label="Adresse email"
                        type="email"
                        />


                </div>
                <div className="form-group">

                    <Field 
                        value={credentials.password} 
                        //placeholder="password..."
                        onChanges={handleChange}
                        name="password"
                        error={error}
                        label="Mot de passe"
                        type="password"
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
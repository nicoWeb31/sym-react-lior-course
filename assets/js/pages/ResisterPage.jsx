import userService from "../services/userApi";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import { toast } from "react-toastify";



const ResisterPage = ({history}) => {

    const [user, SetUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        SetUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiErr = {};
        if(user.passwordConfirm !== user.password){
            apiErr.passwordConfirm = "votre confirmation de mdp ne correspond pas !";
            setErrors(apiErr);
            toast.error("Une erreur est survenue dans votre formulaire !")
            return;
        }

        console.log(user);

        try {
            const response = await userService.create(user);
            console.log(response);
            toast.success("vous $etes desormais inscrit, vous pouvez vous connecter !")
            setErrors({});
            history.replace('/login');
        }catch(err){
            console.log(err.response)
            if (err.response.data.violations) {
                const apiErr = {}
                err.response.data.violations.map(({ propertyPath, message }) => {
                    apiErr[propertyPath] = message;
                })
                console.log(apiErr);

                toast.error("Une erreur est survenue dans votre formulaire !")
                setErrors(apiErr);
            }
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <Field
                    name="firstName"
                    label="prénom"
                    placeholder="Votre jolie prénom"
                    onChanges={handleChange}
                    error={errors.firstName}
                    value={user.firstName}
                />

                <Field
                    name="lastName"
                    label="Nom de famille "
                    placeholder="Votre jolie nom de famille"
                    onChanges={handleChange}
                    error={errors.lastName}
                    value={user.lastName}
                />

                <Field
                    name="email"
                    label="adresse email"
                    placeholder="Votre adresse mail"
                    type='email'
                    onChanges={handleChange}
                    error={errors.email}
                    value={user.email}
                />

                <Field
                    name="password"
                    label="Mot de passe"
                    placeholder="Votre mot de passe"
                    type="password"
                    onChanges={handleChange}
                    error={errors.password}
                    value={user.password}
                />

                <Field
                    name="passwordConfirm"
                    label="Confiration du Mot de passe"
                    placeholder="Confirmez Votre mot de passe"
                    type="password"
                    onChanges={handleChange}
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    
                />

                <div className="form-group">

                    <button type="submit" className="btn btn-primary">Confirmer</button>
                    <Link type="submit" className="btn btn-link" to="/login"> J'ai deja un compte</Link>

                </div>

            </form>
        </>
    );
}

export default ResisterPage;
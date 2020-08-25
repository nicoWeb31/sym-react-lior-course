import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import axios from "axios";
import customerService from "../services/custumerApi"


const CustomerPage = ({match,history}) => {

    const { id = "new" } = match.params;


    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const fetchCustomer = async id => {
        try {

            const data = await customerService.find(id)
            const { firstName, lastName, email, company } = data;
            setCustomer({ firstName, lastName, email, company })

        } catch (err) {
            console.log(err.response)
            history.replace("/customers")
        }
    }



    const [editing, setEditing] = useState(false);
    useEffect(() => {

        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setCustomer({ ...customer, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(customer)
        try {
            //si edition
            if (editing) {
                await customerService.update(id,customer);
                //Todo notif de success
            }else{
                //si creation
                await customerService.put(customer);
                setErrors({})
                //Todo notif de success
                history.replace("/customers");

            }
        } catch (err) {

            if (err.response.data.violations) {
                const apiErr = {}
                err.response.data.violations.map(({propertyPath,message}) => {
                    apiErr[propertyPath] = message;
                })
                console.log(apiErr);

                //todo notif err 
                setErrors(apiErr);
            }
        }

    }

    return (
        <>
            {!editing ? <h1>Creation d'un client</h1> : <h1>Modification d'un client</h1>}


            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChanges={handleChange}
                    error={errors.lastName}
                />

                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="prénom du client"
                    value={customer.firstName}
                    onChanges={handleChange}
                    error={errors.firstName}

                />

                <Field
                    name="email"
                    label="Email"
                    placeholder="Email du client"
                    type="email"
                    value={customer.email}
                    onChanges={handleChange}
                    error={errors.email}
                />

                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    error={errors.company}
                    value={customer.company}
                    onChanges={handleChange}

                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregister</button>
                    <Link to="/customers" className="btn btn-link">retour a la liste</Link>
                </div>
            </form>
        </>
    );
}

export default CustomerPage;
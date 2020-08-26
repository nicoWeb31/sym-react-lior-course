import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Select from "../components/forms/Select";
import customersServive from "../services/custumerApi";
import InvoicesService from "../services/invoices";




const Invoice = ({ history, match }) => {

    const { id = "new" } = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [errors, setErros] = useState({
        amount: "",
        customer: "",
        status: ""
    })

    const [editing, setEditing] = useState(false)

    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const data = await customersServive.findAll();
            setCustomers(data);
            if (!invoice.customer && id === "new") setInvoice({ ...invoice, customer: data[0].id });

        } catch (err) {
            console.log(err)
               toast.error("Une erreur est survenu !")
            history.replace("/factures")
        }
    }

    const fetchInvoice = async (id) => {
        try {
            const data = await InvoicesService.find(id)
            const { amount, status, customer } = data;
            setInvoice({ amount, status, customer: customer.id });

        } catch (err) {
            console.log(err.response)
            toast.error("Impossible de chager la facture demandé !")
            history.replace("/factures")
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id])


    useEffect(() => {
        fetchCustomers();

    }, [])

    const handlChange = e => {
        const { name, value } = e.currentTarget;
        setInvoice({ ...invoice, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editing) {
                await InvoicesService.update(id, invoice)
                toast.success("Facture modifiés avec succès !")
                history.replace("/factures")


            } else {

                await InvoicesService.create(invoice)
                toast.success("Facture crée avec succès !")
                history.replace("/factures")
            }


        } catch (err) {
            console.log(err.response)

            if (err.response.data.violations) {
                const apiErr = {}
                err.response.data.violations.map(({ propertyPath, message }) => {
                    apiErr[propertyPath] = message;
                })
                console.log(apiErr);

                toast.error("Une erreur est survenue dans votre formulaire !") 
                setErros(apiErr);
            }
        }

    }


    return (
        <>
            {
                !editing ? <h1>Création d'une facture</h1> : <h1>Modification d'une facture</h1>
            }


            <form onSubmit={handleSubmit}>

                <Field
                    name="amount"
                    type="number"
                    placeholder="montant de la facture"
                    label="montant"
                    value={invoice.amount}
                    onChanges={handlChange}
                    error={errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChang={handlChange}
                >
                    {customers.map(customer =>
                        <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>
                    )
                    }

                </Select>

                <Select
                    name="status"
                    label="Status"
                    value={invoice.status}
                    error={errors.status}
                    onChang={handlChange}
                >

                    <option value="SENT">Envoyé</option>
                    <option value="PAID">Payé</option>
                    <option value="CANCELLED">Annulé</option>
                </Select>





                <div className="form-group">
                    <button type="submit" className="btn btn-success" >Enregistrer</button>
                    <Link to="/factures" className="btn btn-link"> Retour au facture </Link>
                </div>



            </form>
        </>

    );
}

export default Invoice;
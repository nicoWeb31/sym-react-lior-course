import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Field from '../components/forms/Field';
import Select from "../components/forms/Select";
import customersServive from "../services/custumerApi";
import axios from "axios";




const Invoice = ({history}) => {

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

    const [customers,setCustomers] = useState([]);

    const fetchCustomers = async () =>{
        try{
            const data =  await customersServive.findAll();
            setCustomers(data);
            if(!invoice.customer) setInvoice({...invoice, customer:data[0].id});
            
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchCustomers();
        
    },[])

    const handlChange = e => {
        const { name, value } = e.currentTarget;
        setInvoice({ ...invoice, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("https://127.0.0.1:8000/api/invoices",{...invoice,customer:`/api/client/${invoice.customer}`})
            //flash sucess
            history.replace("/factures")
        }catch(err){
            console.log(err.response)
            
            if (err.response.data.violations) {
                const apiErr = {}
                err.response.data.violations.map(({propertyPath,message}) => {
                    apiErr[propertyPath] = message;
                })
                console.log(apiErr);

                //todo notif err 
                setErros(apiErr);
            }
        }

    }


    return (
        <>
            <h1>Création d'une facture</h1>

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
                    <option value="CANCELED">Annulé</option>
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
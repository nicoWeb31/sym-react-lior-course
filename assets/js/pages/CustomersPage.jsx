import React, {useEffect,useState} from 'react';
import axios from "axios";

const CustomersPage = props => {
    
    const[customers, SetCustomer] = useState([]);

    useEffect(()=>{
        axios.get('https://127.0.0.1:8000/api/clients')
            .then(rep =>rep.data['hydra:member'])
            .then(data => SetCustomer(data))
    },[]);

    

    return (
        <>

            <h1>Liste des customers</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client </th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                {customers.map(customer => 
                
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td><a href="">{customer.firstName} {customer.lastName}</a></td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-light">

                                {customer.invoices.length}
                </span>
                        </td>
                        <td className="text-center">{customer.totalAmount} €</td>
                        <td>
                            <button className="btn btn-warning">modifier</button>
                        </td>
                    </tr>
                )}
                </tbody>


            </table>

        </>
    );
}

export default CustomersPage;
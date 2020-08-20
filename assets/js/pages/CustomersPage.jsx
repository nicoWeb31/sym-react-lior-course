import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from "../components/Pagination"

const CustomersPage = props => {

    const [customers, SetCustomers] = useState([]);
    const [curentPage, SetCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/clients')
            .then(rep => rep.data['hydra:member'])
            .then(data => SetCustomers(data))
            .catch(err => console.log(err.reponse));
    }, []);


    //delete customer
    const deleteCustomer = (customerId) => {
        //je cree une copie du tab
        const originalCustomers = [...customers];

        //l'aproche optimiste on fait confiance a l'api et on retourne dessuite le nouveau tableau avant la eponse du server
        //je met dessuite a jour mon tab
        SetCustomers(customers.filter(cust => cust.id !== customerId))


        //aproche pessimiste on controle la reponse de l'api si ok on trie le tableau


        axios.delete(`https://127.0.0.1:8000/api/client/${customerId}`)
            .then()
            .catch(err => {
                //si err je remet mon tab comme il etait au debut
                SetCustomers(originalCustomers);
                console.log(err.response)
            });

    }


    //---------pagination----------//
    const itemsPerPage = 10;
    const paginationCustomer = Pagination.getData(customers,curentPage,itemsPerPage);
    const handleChangePage = (page) =>{
        SetCurrentPage(page)
    }
    


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
                    {paginationCustomer.map(customer =>

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
                            <td className="text-center">{customer.amoutTotal.toLocaleString()} €</td>
                            <td>
                                <button className="btn btn-danger"
                                    onClick={() => deleteCustomer(customer.id)}
                                    disabled={customer.invoices.length > 0}
                                >Suprimer</button>
                            </td>
                        </tr>
                    )}
                </tbody>


            </table>

            <Pagination curentPage={curentPage} itemsPerPage={itemsPerPage} length={customers.length} handleChangePage={handleChangePage} />

        </>
    );

    
}


export default CustomersPage;
import React, { useEffect, useState } from 'react';
import Pagination from "../components/Pagination";
import custumerApi from "../services/custumerApi";
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import LoaderTable from '../components/loaders/LoaderTable';

const CustomersPage = props => {

    const [customers, SetCustomers] = useState([]);
    const [curentPage, SetCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading,setLoading] = useState(true)


    //recup des customers
    const fetchCustomers = async () =>{
        try{
            const data = await custumerApi.findAll()
            SetCustomers(data) 
            setLoading(false)
        }catch(err){
            toast.error("Une erreur est survenue, impossible de charger les clients !")
        }
    }

    //au chargement du composant
    useEffect(() => {fetchCustomers()},[]);


    //delete customer
    const deleteCustomer = async (customerId) => {
        //je cree une copie du tab
        const originalCustomers = [...customers];
        //l'aproche optimiste on fait confiance a l'api et on retourne dessuite le nouveau tableau avant la eponse du server
        //je met dessuite a jour mon tab
        SetCustomers(customers.filter(cust => cust.id !== customerId))
        //aproche pessimiste on controle la reponse de l'api si ok on trie le tableau

        try{
            await custumerApi.delete(customerId);
            toast.success("Le client a bien été modifier ! ")
            

        }catch(err){

            SetCustomers(originalCustomers);
            toast.error("Impossible de supprimer le client !")
        }
    }





    //---------pagination----------//
    const itemsPerPage = 10;


    //filtrage des customers
    const fiteredCustomers = customers.filter(c=>c.firstName.toLowerCase().includes(search.toLowerCase())
    || c.lastName.toLowerCase().includes(search.toLowerCase())
    || c.email.toLowerCase().includes(search.toLowerCase())
    || (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    )


    //--------------pagination des datas -------------------//
    const paginationCustomer = Pagination.getData(fiteredCustomers,curentPage,itemsPerPage);
    const handleChangePage = (page) =>{
        SetCurrentPage(page)
    }



    //---search-----//
    const handleSearch =(e)=>{
        const value = e.currentTarget.value;
        setSearch(value);
        SetCurrentPage(1);
    }
    


    return (
        <>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Liste des customers</h1>
                <Link to="/customer/new" className="btn btn-primary">Crée un client</Link>

            </div>

            <div className="form-group">
                <input type="text" 
                className="form-control" 
                placeholder="Rechercher ...." 
                onChange={handleSearch}
                value={search}

                />
            </div>
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
                            <td><Link to={`/customer/${customer.id}`}href="">{customer.firstName} {customer.lastName}</Link></td>
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
            {
                loading && <LoaderTable/>
            }
            

            {
                fiteredCustomers.length > itemsPerPage && 
                <Pagination curentPage={curentPage} itemsPerPage={itemsPerPage} length={fiteredCustomers.length} handleChangePage={handleChangePage} />
            }
        </>
    );

    
}


export default CustomersPage;
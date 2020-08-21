import React, { useEffect, useState } from 'react';
import Pagination from "../components/Pagination";
import axios from "axios";
import moment from "moment";


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {

    PAID: "payé",
    SENT: "envoyé",
    CANCELLED: "annulé"
}




const InvoicePage = () => {


    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try {
            const data = await axios.get('https://127.0.0.1:8000/api/invoices')
                .then(resp => resp.data['hydra:member'])
            setInvoices(data);
        } catch (err) {
            console.log(err.response)
        }
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');



    useEffect(() => {
        fetchInvoices();
    }, [])


    //---------pagination----------//
    const itemsPerPage = 10;


    //--------------pagination des datas -------------------//
    const paginationInvoices = Pagination.getData(invoices, currentPage, itemsPerPage);

    const handleChangePageFact = (page) =>{
        setCurrentPage(page)
    }


    //---search-----//
    const handleSearch = (e) => {
        const value = e.currentTarget.value;
        setSearch(value);
        SetCurrentPage(1);
    }

    return (

        <>
            <h1>listes des factures</h1>

            <div className="form-group">
                <input type="text"
                    className="form-control"
                    placeholder="Rechercher ...."
                    onChange={handleSearch}
                    value={search}

                />
            </div>

            <table className=" table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoie</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paginationInvoices.map(invoice =>
                            <tr key={invoice.id}>
                                <td>{invoice.chrono}</td>
                                <td>
                                    <a href="#">{invoice.customer && invoice.customer.firstName} {invoice.customer && invoice.customer.lastName}
                                    </a>
                                </td>
                                <td className="text-center">{formatDate(invoice.sentAt)}</td>
                                <td className="text-center">
                                    <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                                </td>
                                <td className="text-center">{invoice.amount} €</td>
                                <td>
                                    <button className="btn btn-sm btn-info">Editer</button>
                                    <button className="btn btn-sm btn-danger">Suprimer</button>
                                </td>
                            </tr>

                        )
                    }
                </tbody>
            </table>

            <Pagination curentPage={currentPage} itemsPerPage={itemsPerPage} handleChangePage={handleChangePageFact} length={invoices.length}/>

        </>
    );
}

export default InvoicePage;
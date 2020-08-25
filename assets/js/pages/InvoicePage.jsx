import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import invoicesApi from "../services/invoices";


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

//---------pagination----------//
const itemsPerPage = 25;




const InvoicePage = () => {


    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const fetchInvoices = async () => {
        try {
            const data = await invoicesApi.findAll()
            setInvoices(data);
        } catch (err) {
            console.log(err.response)
        }
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');



    useEffect(() => {
        fetchInvoices();
    }, [])


    //filtrage des customers
    const fiteredInvoices = invoices.filter(i =>

        i.customer && i.customer.firstName.toLowerCase().includes(search.toLowerCase())
        || i.customer && i.customer.lastName.toLowerCase().includes(search.toLowerCase())
        || i.amount.toString().startsWith(search.toLowerCase())
        || STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())

    )


    //--------------pagination des datas -------------------//
    const paginationInvoices = Pagination.getData(fiteredInvoices, currentPage, itemsPerPage);

    const handleChangePageFact = (page) => {
        setCurrentPage(page)
    }


    //---search-----//
    const handleSearch = (e) => {
        const value = e.currentTarget.value;
        setSearch(value);
        SetCurrentPage(1);
    }

    //delete invoices
    const deleteInoices = async (invoicesId) => {
        //je cree une copie du tab
        const originalInvoices = [...invoices];
        //l'aproche optimiste on fait confiance a l'api et on retourne dessuite le nouveau tableau avant la eponse du server
        //je met dessuite a jour mon tab
        setInvoices(invoices.filter(inv => inv.id !== invoicesId))
        //aproche pessimiste on controle la reponse de l'api si ok on trie le tableau

        try {
            //await custumerApi.deleteI(customerId)
            await invoicesApi.delete(invoicesId);

        } catch (err) {

            setInvoices(originalInvoices);
            console.log(err.response)
        }
    }

    return (

        <>
        <div className="d-flex justify-content-between align-items-center">

            <h1>listes des factures</h1>
            <Link className ='btn btn-primary' to="/facture/new">Creer une facture</Link>

        </div>

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
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteInoices(invoice.id)}>Suprimer</button>
                                </td>
                            </tr>

                        )
                    }
                </tbody>
            </table>

            <Pagination curentPage={currentPage} itemsPerPage={itemsPerPage} handleChangePage={handleChangePageFact} length={fiteredInvoices.length} />

        </>
    );
}

export default InvoicePage;
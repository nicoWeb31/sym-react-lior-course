import React from 'react';

const CustomersPage = () => {
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
                    <tr>
                        <td>1</td>
                        <td><a href="">Lior toto</a></td>
                        <td> nico@free.fr</td>
                        <td>nico </td>
                        <td className="text-center">
                            <span className="badge badge-light">

                                4
                </span>
                        </td>
                        <td className="text-center">4564675 €</td>
                        <td>
                            <button className="btn btn-warning">modifier</button>
                        </td>
                    </tr>
                </tbody>


            </table>

        </>
    );
}

export default CustomersPage;
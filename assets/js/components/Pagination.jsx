import React from 'react';

//<Pagination curentPage={currentPage} itemsPerPage={itemsPerPage} handleChangePage={handleChangePage} length={invoices.length}/>

const Pagination = ({curentPage,itemsPerPage,length,handleChangePage}) => {


    const pageCount = Math.ceil(length / itemsPerPage);    //math.ceil arondi a l'entier superieur
    const pages = [];
    for (let i = 1 ; i<= pageCount; i++){
        pages.push(i)
    }

    return (
        <div>
        <ul className="pagination pagination-lg">
            <li className={"page-item " + (curentPage === 1 && "disabled")}>
                <button className="page-link"
                onClick={()=>handleChangePage(curentPage -1)}
                >&laquo;</button>
            </li>
            {
                pages.map(page => (
                <li className={"page-item " + (curentPage === page && "active")} key={page}>
                    <button className="page-link"
                    onClick={()=>handleChangePage(page)}
                    >{page}</button>
                </li>
                
                ))
            }
            <li className={"page-item " + (curentPage === pageCount && "disabled")}>
                <button className="page-link"
                onClick={()=>handleChangePage(curentPage + 1)}
                >&raquo;</button>
            </li>
        </ul>
    </div>
    );
}


Pagination.getData =(items,curentPage,itemsPerPage) => {
    //start  et pendant combien
    const start = curentPage * itemsPerPage - itemsPerPage;
    //    10 =  2         * 10 - 10
    return items.slice(start, start + itemsPerPage); //slice decoupe un morceau de tableau
}

export default Pagination;
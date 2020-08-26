import axios from "axios";
import {INVOICES_API} from "./../config";


async function findAll() {
    return axios.get(INVOICES_API)
    .then(rep => rep.data['hydra:member'])
    
}



function deleteCust(id) {
    return axios.delete(`${INVOICES_API}/${id}`);
}


function find(id){
    return axios.get(`${INVOICES_API}/${id}`).then(response=>response.data);
}

function update(id,invoice){
    return axios.put(`${INVOICES_API}/${id}`,{...invoice,customer:`/api/client/${invoice.customer}`})
}

function create(invoice){
    return axios.post(INVOICES_API,{...invoice,customer:`/api/client/${invoice.customer}`})
}

export default{
    findAll,
    delete: deleteCust,
    find,
    update,
    create
}

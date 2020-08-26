import axios from "axios";


async function findAll() {
    return axios.get('https://127.0.0.1:8000/api/invoices')
    .then(rep => rep.data['hydra:member'])
    
}



function deleteCust(id) {
    return axios.delete(`https://127.0.0.1:8000/api/invoices/${id}`);
}


function find(id){
    return axios.get(`https://127.0.0.1:8000/api/invoices/${id}`).then(response=>response.data);
}

function update(id,invoice){
    return axios.put(`https://127.0.0.1:8000/api/invoices/${id}`,{...invoice,customer:`/api/client/${invoice.customer}`})
}

function create(invoice){
    return axios.post("https://127.0.0.1:8000/api/invoices",{...invoice,customer:`/api/client/${invoice.customer}`})
}

export default{
    findAll,
    delete: deleteCust,
    find,
    update,
    create
}

import axios from "axios";


async function findAll() {
    return axios.get('https://127.0.0.1:8000/api/invoices')
    .then(rep => rep.data['hydra:member'])
    
}



function deleteCust(id) {
    return axios.delete(`https://127.0.0.1:8000/api/invoices/${id}`);
}


export default{
    findAll,
    delete: deleteCust
}

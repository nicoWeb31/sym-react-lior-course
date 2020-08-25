import axios from "axios";


async function findAll() {
    return axios.get('https://127.0.0.1:8000/api/clients')
    .then(rep => rep.data['hydra:member'])
    
}



function deleteCust(id) {
    return axios.delete(`https://127.0.0.1:8000/api/client/${id}`);
}


function find(id){
    return axios.get(`https://127.0.0.1:8000/api/client/${id}`)
            .then(
                response => response.data);
}

function update(id,customer){
    return axios.put(`https://127.0.0.1:8000/api/client/${id}`, customer);
}

function create(customer){
    return axios.post('https://127.0.0.1:8000/api/clients', customer)
}


export default{
    findAll,
    delete: deleteCust,
    find,
    update,
    create
}

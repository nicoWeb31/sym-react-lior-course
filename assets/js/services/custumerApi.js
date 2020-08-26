import axios from "axios";
import Cache from "./cache";
import { CUSTOMERS_API,CUSTOMER_API} from "../config";


async function findAll() {

    // j'essaie de recuperer les customers du cache
    const cachedCusomers = await Cache.get("customers");

    if (cachedCusomers) return cachedCusomers;

    return axios.get(CUSTOMERS_API)
        .then(rep => {

            const customers = rep.data['hydra:member'];
            //et on envoi au cache la key value
            Cache.set("customers", customers)
            return customers
        })

}


function deleteCust(id) {



    return axios.delete(`${CUSTOMER_API}/${id}`).then(async response => {

        // j'essaie de recuperer les customers du cache
        const cachedCusomers = await Cache.get("customers");
        // si j'ai des customers dans le cache je doit mettre a jour et supprimer la personne qui vient d'etre suprimmer

        if (cachedCusomers) {
            Cache.set("customers", cachedCusomers.filter(c => c.id !== +id))
        }
        return response;

    })
}



async function find(id) {

    // j'essaie de recuperer les customers du cache
    const cachedCusomer = await Cache.get(`customers.${id}`);

    if (cachedCusomer) return cachedCusomer;




    return axios.get(`${CUSTOMER_API}/${id}`)
        .then(
            response => {
                const customer = response.data;
                Cache.set(`customers.${id}`, customer)

                return customer;
            });
}





function update(id, customer) {
    return axios.put(`${CUSTOMER_API}/${id}`, customer).then(async response => {

        // j'essaie de recuperer les customers du cache
        const cachedCusomers = await Cache.get("customers");
        const cachedCusomer = await Cache.get(`customers.${id}`);

        if(cachedCusomer){
            Cache.set(`customers.${id}`,response.data)
        }


        if (cachedCusomers) {
            // si j'ai des customers dans le cache je doit mettre a jour et modifier la personne qui vient d'etre modifier

            const index = cachedCusomers.findIndex(c => c.id === +id);
            const newCachedCustomer = response.data
            cachedCusomers[index] = newCachedCustomer;

            //Cache.set("customers",cachedCusomers)
        }
        return response;
    })
}

function create(customer) {

    return axios.post(CUSTOMERS_API, customer).then(async response => {
        // j'essaie de recuperer les customers du cache
        const cachedCusomers = await Cache.get("customers");
        // si j'ai des customers dans le cache je doit mettre a jour et ajouter la personne qui vient d'etre add

        if (cachedCusomers) {
            Cache.set("customers", [...cachedCusomers, response.data])
        }
        return response;
    })
}




export default {
    findAll,
    delete: deleteCust,
    find,
    update,
    create
}

import axios from "axios";



function authenticathe(credentials){
    return axios.post('https://127.0.0.1:8000/api/login_check', credentials)
    .then(resp => resp.data.token)
    .then(token => {
        
        
            //je stock le token dans le storage
            window.localStorage.setItem("authToken",token);
        
            //on demande a axios d'utiliser le token ds les prochaines requetes dans son header
            axios.defaults.headers["authorization"] = `Bearer ${token}`;
            //return true;
    })

}

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

export default {
    authenticathe,
    logout
}
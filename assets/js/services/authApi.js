import axios from "axios";
import jwt from "jwt-decode";



function authenticathe(credentials) {
    return axios.post('https://127.0.0.1:8000/api/login_check', credentials)
        .then(resp => resp.data.token)
        .then(token => {


            //je stock le token dans le storage
            window.localStorage.setItem("authToken", token);

            //on demande a axios d'utiliser le token ds les prochaines requetes dans son header
            setAxiosToken(token)
            //return true;
        })

}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}


function setAxiosToken(token){
    axios.defaults.headers["authorization"] = `Bearer ${token}`;
}

// function removeheader(){
//     delete axios.defaults.headers["Authorization"];
// }


function setUp() {
    // voir si on a un token
    const token = window.localStorage.getItem('authToken');

    //voir voir si il est valide
    if (token) {
        const {exp : expiration} = jwt(token);
        //console.log(expiration);
        if (expiration * 1000 > new Date().getTime) {
            setAxiosToken(token);
        } 
    }





}


export default {
    authenticathe,
    logout,
    setUp
}
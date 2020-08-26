import axios from "axios";
import jwt from "jwt-decode";
import {LOGIN_API} from "./../config"



function authenticathe(credentials) {
    return axios.post(LOGIN_API, credentials)
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

function isAuthenticated(){
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const {exp : expiration} = jwt(token);
        //console.log(expiration);
        if (expiration * 1000 > new Date().getTime) {
            return true
        }else{
            return false
        } 
    }else{
        return false
    }
}







export default {
    authenticathe,
    logout,
    setUp,
    isAuthenticated
}
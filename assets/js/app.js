import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage';

import '../css/app.css';


const App = () =>{
    return (

    <>
        <Navbar/>
        <div className="container pt-5">
            <Homepage/>
        </div>
    </>

    )
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>,rootElement);

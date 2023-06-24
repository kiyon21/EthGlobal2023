import React from "react";
import './FormPage.css';
import Form from '../components/Form.js';
import Header from '../components/Header.js';


function FormPage() {
    return(
        <div>
        <div><Header></Header></div>
        <div className="FormPage">
            
            <Form></Form>
        </div>
        </div>
    );
    
}


export default FormPage;
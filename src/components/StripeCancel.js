import React from "react";
import { Navigate } from 'react-router-dom'; 
import { WarningTwoTone } from '@ant-design/icons';
import {
    Button, Container
  } from 'react-bootstrap'; 


const StripeCancel = ({isLoggedIn}) => {

    if (!isLoggedIn  ) {
        return <Navigate to='/' />;
    }


    return (
        <Container className="d-flex  justify-content-center fw-bold" style={{height: "90vh"}}>
            <div  className="d-flex align-items-center">
                <WarningTwoTone  style={{fontSize: "100px"}} />
            </div>
        </Container>
    )
}

export default StripeCancel
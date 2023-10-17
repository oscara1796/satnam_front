import React from "react";
import { Link } from 'react-router-dom'; 
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
            <div  className="d-flex align-items-center justify-content-center flex-column">
                <WarningTwoTone  style={{fontSize: "100px"}} />
                <p style={{ fontSize: "24px", marginTop: "20px" }}>Pago fallido</p>
                <p style={{ fontSize: "18px", textAlign: "center" }}>Lo sentimos, pero su pago no se realizó. Inténtalo de nuevo o elige otro método de pago.</p>
                <Link to="/sub-form">  {/* Use Link to navigate to the payment form */}
                    <Button variant="primary" style={{ marginTop: "20px" }}>Prueba con otro pago</Button>
                </Link>
            </div>
        </Container>
    )
}

export default StripeCancel
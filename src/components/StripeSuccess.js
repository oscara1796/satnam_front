import React, {useState, useEffect} from "react";
import { Navigate } from 'react-router-dom'; 
import axios from 'axios';
import { SyncOutlined } from '@ant-design/icons';
import { getUser, getAccessToken } from '../services/AuthService'; 



const StripeSuccess = ({isLoggedIn}) => {

    useEffect(()=>{
        const getSubscriptionStatus = async () => {
            const user = getUser();
            const url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`
            const token = getAccessToken();
            const headers = { Authorization: `Bearer ${token}` };
            const {data} =   await axios.get(url, {
                headers: headers,
            });
            console.log("DATA => ",data);
        }
        getSubscriptionStatus();
    }, [])

    if (!isLoggedIn  ) {
        return <Navigate to='/' />;
    }

    return (
        <div className="d-flex  justify-content-center fw-bold" style={{height: "90vh"}}>
            <div className="d-flex align-items-center" >
                <SyncOutlined spin style={{fontSize: "50px"}} />
            </div>
        </div>
    )
}

export default StripeSuccess
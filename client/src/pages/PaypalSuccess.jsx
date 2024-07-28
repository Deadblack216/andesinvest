// pages/PaypalSuccess.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { capturePaypalOrderRequest } from "../api/serviceBill";

const PaypalSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const PayerID = params.get('PayerID');
  const paymentId = params.get('paymentId');
  const billId = params.get('billId');

  useEffect(() => {
    const capturePayment = async () => {
      try {
        await capturePaypalOrderRequest({ PayerID, paymentId, billId });
        navigate('/service-bills');
      } catch (error) {
        console.error('Error capturing PayPal order:', error);
      }
    };

    if (PayerID && paymentId && billId) {
      capturePayment();
    }
  }, [PayerID, paymentId, billId, navigate]);

  return <div>Procesando pago...</div>;
};

export default PaypalSuccess;

import axios from 'axios';
import React, { useState } from 'react';
import cookie from 'js-cookie';
import Alert from 'react-popup-alert';
import useRazorpay from 'react-razorpay';

const SUCCESS_STATUS_CODES = [200, 201];
const PAYMENT_MODE = 'razorpay';
const SOURCE_DEFAULT = 'NA';

const CheckoutBtn = ({ user, cartItems, total, disc, gst, payable, coupon ,  }) => {
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [alert, setAlert] = useState({ type: '', text: '', show: false });
  const Razorpay = useRazorpay();
  const [loyalpoints] = useState(typeof window != 'undefined' && localStorage.getItem('loyalPoints'))

  const onCloseAlert = () => {
    setAlert({ type: '', text: '', show: false });
  };

  const showSuccessAlert = () => {
    setAlert({
      type: 'success',
      text: 'Your order has been created. Please click continue to checkout.',
      show: true
    });
  };

  const showErrorAlert = () => {
    setAlert({
      type: 'error',
      text: 'Order has not been created properly. Please refresh the page and proceed again.',
      show: true
    });
  };

  const getUserInfo = () => ({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    country: user?.country2 || '',
    state: user?.state || '',
    address: user?.address || '',
    userid: user?.id || '',
  });

  const createFormData = () => {
    const formData = new FormData();
    cartItems.forEach(item => {
      formData.append('course_id', item.course_id);
    });
    const userInfo = getUserInfo();
    formData.append('name', userInfo.name);
    formData.append('email', userInfo.email);
    formData.append('mobile', userInfo.mobile);
    formData.append('country', userInfo.country);
    formData.append('state', userInfo.state);
    formData.append('address', userInfo.address);
    formData.append('source', SOURCE_DEFAULT);
    formData.append('totalval', total);
    formData.append('totaldisc', disc);
    formData.append('gst', gst);
    formData.append('totalpayable', payable);
    formData.append('paymentmode', PAYMENT_MODE);
    formData.append('userid', userInfo.userid);
    formData.append('utm_source', cookie.get('utm_source') || '');
    formData.append('utm_source_current', cookie.get('utm_source_current') || '');
    if (coupon) {
      formData.append('coupon', coupon);
    }
    return formData;
  };

  const handleRazorpayPayment = async (orderIds) => {
    const userInfo = getUserInfo();
    const priceround = Math.round(Number(payable) * 100); // in paise
    const options = {
      key: 'rzp_test_7FXz72DZ19vR28', // Replace with live key in production
      amount: priceround,
      currency: 'INR',
      name: 'win upskill',
      description: 'win-Order',
      image: '/images/whitelogo.png',
      handler: async (res) => {
        if (!res.error_code) {
          await handlePaymentApi(orderIds, res.razorpay_payment_id);
        } else {
          setAlert({
            type: 'error',
            text: 'Error in payment! Please contact support if amount was debited.',
            show: true,
          });
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.mobile,
      },
      notes: {
        address: userInfo.address,
        order_ids: orderIds.join(','), // send all order IDs
      },
      theme: {
        color: '#3399cc',
      },
    };

    try {
      const rzp1 = new Razorpay(options);
      rzp1.on('payment.failed', function () {
        setAlert({
          type: 'error',
          text: 'Payment failed! Please try again.',
          show: true,
        });
      });
      rzp1.open();
    } catch (err) {
      setAlert({
        type: 'error',
        text: 'Could not initiate payment. Please try again.',
        show: true,
      });
    }
  };

  const handlePaymentApi = async (orderIds, paymentId) => {
    const userInfo = getUserInfo();
    const payload = {
      orderid: orderIds.map((id, index) => ({
        id,
        payid: paymentId,
        userid: userInfo.userid,
        course_id: cartItems[index]?.course_id,
        crstype: cartItems[index]?.crstype || 'default',
      })),
    };
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/ordersv2/payments`, payload);
      if (response.data && response.data.success) {
        setAlert({
          type: 'success',
          text: 'Payment confirmed and all courses assigned successfully!',
          show: true,
        });
        // localStorage.removeItem('orderid'); // optional
      } else {
        setAlert({
          type: 'error',
          text: response.data?.message || 'Failed to assign course.',
          show: true,
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        text: 'Failed to assign course. Please try again.',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const formData = createFormData();
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/ordersv2`, formData);
      if (SUCCESS_STATUS_CODES.includes(response.status)) {
        const data = response.data?.data;
        let orderIds = [];
        if (Array.isArray(data) && data.length > 0) {
          orderIds = data.map(order => order.id);
          localStorage.setItem('orderid', JSON.stringify(orderIds));
        }
        setOrderCreated(true);
        showSuccessAlert();
      } else {
        showErrorAlert();
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      setAlert({
        type: 'error',
        text: 'Order failed. Please try again.',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    const orderIdsStr = localStorage.getItem('orderid');
    let orderIds = [];
    try {
      orderIds = orderIdsStr ? JSON.parse(orderIdsStr) : [];
    } catch {
      orderIds = [];
    }
    if (!orderCreated || !orderIds.length) {
      showErrorAlert();
      return;
    }
    await handleRazorpayPayment(orderIds);
  };

  return (
    <div>
      <Alert
        header="Order Status"
        btnText="OK"
        text={alert.text}
        type={alert.type}
        show={alert.show}
        onClosePress={onCloseAlert}
        pressCloseOnOutsideClick={true}
        showBorderBottom={true}
      />

      {!orderCreated ? (
        <button onClick={handleCreateOrder} className="default-btn" disabled={loading}>
          {loading ? 'Creating Order...' : 'Create Order'}
        </button>
      ) : (
        <button className="default-btn" onClick={handleCheckout}>
          {payable > 0 ? 'Make Payment' : 'Enroll Course'}
        </button>
      )}
    </div>
  );
};

export default CheckoutBtn;

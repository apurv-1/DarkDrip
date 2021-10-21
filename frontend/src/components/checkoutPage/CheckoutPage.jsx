import React, { useState } from 'react';
import CartTableItem from './CartTableItem';

import Navbar from '../reusable/Navbar';
import EditProductPanel from '../editProduct/EditProductPanel';
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../redux/reduxActions';
import axiosApp from '../../utils/axiosConfig';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

function CheckoutPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);
  const publicStripeToken =
    'pk_test_51Jk65XSA4wNlY934DYEar23NTDEDqdJwF2nEXUnZ6plGKnDKKdk3CM4T9eBEHeEM9bTZgU33U5s7LDbDRGmbaQ7Y00eWRZtlWG';

  function convertToReadablePrice(price) {
    return Math.round(price) / 100;
  }

  let total =
    cart !== 'loading' &&
    convertToReadablePrice(
      cart.reduce((total, item) => total + item.amount * item.product.price, 0)
    );
  // console.log(typeof total);
  //ToDo: add GST & Delivery charges
  async function purchase(token) {
    setIsLoading(true);
    try {
      const cartForBackend = cart.map((item) => {
        return {
          product: item.product._id,
          amount: item.amount,
        };
      });

      await axios.all([
        axiosApp.post('/products/purchase', {
          products: cartForBackend,
          token,
        }),
        axiosApp.post('/products/cart', { products: [] }),
      ]);
      dispatch(setCart([]));
      // console.log(result)
      alert('Purchase successful.');
    } catch (err) {
      alert('Oops! Something went wrong.');
      console.log(err);
    }
    setIsLoading(false);
  }

  return cart === 'loading' ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar />
      <EditProductPanel />
      <div className="checkout-page-container">
        {cart.length === 0 ? (
          <h1 className="absolute-center">Your cart is empty.</h1>
        ) : (
          <>
            <h1>My Cart</h1>
            <div className="cart-table-container">
              <table cellSpacing="0" cellPadding="0">
                <thead>
                  <tr>
                    <th></th>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((cartItem) => (
                    <CartTableItem
                      product={cartItem.product}
                      amount={cartItem.amount}
                      key={cartItem.product._id}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="checkout-container">
              <div className="checkout-prices">
                <p>
                  <span>Subtotal: </span>
                  <span className="rupee">₹{total}</span>
                </p>
                <p>
                  <span>GST Charges(18%): </span>
                  <span className="rupee">₹ {parseInt(total * 0.18)}</span>
                </p>
                <hr />
                <p>
                  <span>Total: </span>{' '}
                  <span className="rupee">₹{total + parseInt(total * 0.18)}</span>
                </p>
              </div>

              <StripeCheckout stripeKey={publicStripeToken} token={purchase} name="Dark Drip">
                <p>
                  Use <span style={{ fontWeight: 700 }}>4956 21...</span> for Card number
                </p>
                <button
                  className={
                    'paypal-button btn-primary' + (isLoading ? ' btn-primary-loading' : '')
                  }>
                  {isLoading ? 'PLEASE WAIT' : 'PURCHASE NOW'}
                </button>
              </StripeCheckout>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CheckoutPage;

import React from 'react';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';


const PaymentCancelPage = () => {
  return (
    <>
      <Header />
      <Cart />

      <section class=" p-t-104 p-b-116">
        <div class="container">
          <div class="flex-w flex-c-m">
            <div class="size-210 bor2 p-lr-70 p-t-55 p-b-70 flex-c-m bg1" style={{ "backgroundColor": "#efefef" }}>
              <img src="poto/cancel.png" class="img-fluid" width="100" />
              <h4 class="p-l-15 mtext-103">Your Payment <span class="text-danger">Cancel!</span></h4>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* <!-- Back to top --> */}
      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default PaymentCancelPage;
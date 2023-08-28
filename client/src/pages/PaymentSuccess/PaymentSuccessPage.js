import React from 'react';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';


const PaymentSuccessPage = () => {
  return (
    <>
      <Header />
      <Cart />

      <section class="bg0 p-t-104 p-b-116">
		<div class="container">
			<div class="flex-w flex-c-m">
				<div class="size-210 bor2 p-lr-70 p-t-55 p-b-70 flex-c-m bg11">
					<img src="poto/success.png" class="img-fluid" width="100"/>
					<h4 class="p-l-15 mtext-103">Your Payment <span class="text-success">Successful!</span> </h4>
				</div>
			</div>
		</div>
	</section>	

      <Footer />


    </>
  )
}

export default PaymentSuccessPage;
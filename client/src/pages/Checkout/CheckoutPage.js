import React from 'react';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <Cart />

      {/* <!-- breadcrumb --> */}
      <div class="container">
        <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" class="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </a>
          <span class="stext-109 cl4">
            Proceed To Checkout
          </span>
        </div>
      </div>

      {/* <!-- Shoping Cart --> */}
      <form class="bg0 p-t-75 p-b-40">
		<div class="container">
			<div class="row">
				<div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 m-lr-auto m-b-50">
					<div class="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl p-lr-15-sm">
						<div class="flex-c-m flex-w p-b-18 bor12">
							<a href="#" class="m-all-1">
								<img src="images/icons/icon-pay-01.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px"/>
							</a>
							<a href="#" class="m-all-1">
								<img src="images/icons/icon-pay-02.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px"/>
							</a>
		
							<a href="#" class="m-all-1">
								<img src="images/icons/icon-pay-03.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px"/>
							</a>
		
							<a href="#" class="m-all-1">
								<img src="images/icons/icon-pay-04.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px"/>
							</a>
		
							<a href="#" class="m-all-1">
								<img src="images/icons/icon-pay-05.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px"/>
							</a>
						</div>
						
						<div class="flex-w flex-t p-t-15 p-b-30">
							<h4 class="mtext-109 cl2 p-t-5">
								Contact
							</h4>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="Name" placeholder="Email"/>
								</div>
							</div>
							<div class="w-full">
								<h4 class="mtext-109 cl2 p-b-5">
									Shipping Address
								</h4>
								
								<div class="rs1-select2 rs2-select2 bor13 bg0 m-b-12 m-t-9">
									<select class="js-select2" name="time">
										<option>Select a country...</option>
										<option>Myanmar</option>
										<option>Singapore</option>
									</select>
									<div class="dropDownSelect2"></div>
								</div>
								<div class="row">
									<div class="col-lg-6 col-xl-6">
										<input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="firstname" placeholder="First Name"/>
									</div>
									<div class="col-lg-6 col-xl-6">
										<input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="lastname" placeholder="Last Name"/>
									</div>
								</div>
							</div>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="companyoption" placeholder="Company Option"/>
								</div>
							</div>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="Address" placeholder="Address"/>
								</div>
							</div>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="City" placeholder="City"/>
								</div>
							</div>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="number" name="postalcode" placeholder="Postal Code"/>
								</div>
							</div>
							<div class="w-full p-t-5">
								<div class=" bg0 m-b-12">
									<input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"/>
								</div>
							</div>
						</div>
						<button class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
							Proceed to Checkout
						</button>
					</div>
				</div>

				<div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 m-lr-auto m-b-50">
					<div class="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl p-lr-15-sm bg10">
						<div class="flex-w flex-t p-b-30">
							<a href="product-detail.html" target="_blank" class="wrao-pic-w size-214 m-r-20">
								<img src="poto/a1.jpg" alt="PRODUCT" class="img-fluid img-thumbnail"/>
							</a>
							<div class="size-215 flex-col-t p-t-8">
								<a href="product-detail.html" target="_blank" class="stext-116 cl8 hov-cl1 trans-04">
									Art One
								</a>
								<span class="stext-116 cl6 p-t-20">
									Total : $36.00
								</span>
							</div>
							
						</div>
						<div class="flex-w flex-t p-b-30">
							<a href="product-detail.html" target="_blank" class="wrao-pic-w size-214 m-r-20">
								<img src="poto/a2.jpg" alt="PRODUCT" class="img-fluid img-thumbnail"/>
							</a>
							<div class="size-215 flex-col-t p-t-8">
								<a href="product-detail.html" target="_blank" class="stext-116 cl8 hov-cl1 trans-04">
									Art Two
								</a>
								<span class="stext-116 cl6 p-t-20">
									Total : $16.00
								</span>
							</div>
						</div>
						<div class="flex-w flex-t p-b-30">
							<a href="product-detail.html" target="_blank" class="wrao-pic-w size-214 m-r-20">
								<img src="poto/a3.jpg" alt="PRODUCT" class="img-fluid img-thumbnail"/>
							</a>
							<div class="size-215 flex-col-t p-t-8">
								<a href="product-detail.html" target="_blank" class="stext-116 cl8 hov-cl1 trans-04">
									Art Three
								</a>
								<span class="stext-116 cl6 p-t-20">
									Total : $16.00
								</span>
							</div>
						</div>
						<div class="flex-w flex-m m-r-20 m-tb-5 bor12 p-b-10">
							<input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="coupon" placeholder="Discount Code"/>
							<a href="#" class="flex-c-m stext-101 cl5 size-104 bg1 bor1 hov-btn1 p-lr-15 trans-04">
								Apply
							</a>
						</div>
						<div class="flex-w flex-m m-r-20 m-tb-5">
							<div class="flex-l-m mtext-101 cl2 size-119 p-lr-15 trans-04 ">
								Total
							</div>
							<div class="flex-r-m mtext-101 cl2 size-115 p-lr-15 trans-04">
								$78.00
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>

      <Footer />

      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default CheckoutPage;
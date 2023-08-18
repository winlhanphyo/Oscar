import React from 'react';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const CreateAccountPage = () => {
  return (
    <>
      <Header />
      <Cart />

      {/* <!-- Title page --> */}
      <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: "url('poto/a3.jpg')"}}>
        <h2 class="ltext-105 cl0 txt-center">
          Create Account
        </h2>
      </section>

      {/* <!-- Content page --> */}
      <section class="bg0 p-t-104 p-b-116">
        <div class="container">
          <div class="flex-w flex-tr flex-c-m">
            <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="firstname" placeholder="First Name" />
                  <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                </div>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="lastname" placeholder="Last Name" />
                  <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                </div>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="email" name="email" placeholder="Email" />
                  <i class="zmdi zmdi-email how-pos4 pointer-none"></i>
                </div>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" name="password" placeholder="Password" />
                  <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                </div>
                <button class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Create
                </button>
                <a href="login.html" class="flex-l-m stext-101 size-121 p-lr-15 trans-04 pointer text-dark p-t-30">cancel</a>
              </form>
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

export default CreateAccountPage;
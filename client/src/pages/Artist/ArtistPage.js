import React from 'react';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const ArtistPage = () => {
  return (
    <>
      <Header />
      <Cart />
      {/* --- Section 1 -----*/}
      <section class="p-t-50 respon2">
        <div class="container">
          <div class="row">
            <img class="over-image" src="poto/j5.png" />
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                <div class="layer-slick1 animated" data-appear="fadeInDown" data-delay="0">
                  <h2 class="mtext-111 cl2 p-t-19 p-b-20  text-dark">
                    about
                  </h2>
                </div>
                <div class="layer-slick1 animated p-b-40" data-appear="fadeInUp" data-delay="800">
                  <span class="stext-115 cl2">
                    quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip
                    ex ea commodo consequat. Duis
                    autem vel eum iriure dolor in hendrerit
                    in vulputate velit esse molestie
                    consequat<br /><br />
                    Lorem ipsum dolor sit amet, cons
                    ectetuer adipiscing elit, sed diam
                    nonummy nibh ...<br /><br />
                    quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip
                    ex ea commodo consequat.
                    Duis autem vel eum iriure dolor in
                    hendrerit in vulputate velit esse molestie
                    consequatLorem ipsum dolor
                    sit amet, cons ectetuer adipiscing
                    elit, sed diam nonummy nibh ...
                    magna aliquam erat
                  </span>
                  <div class="flex-r-m flex-w w-full p-t-45">
                    <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a4.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center">
                <a href="#" class="ltext-108 cl2 hov-cl1 trans-04">
                  "quis nostrud exerci tation ullamcorper suscipit<br />
                  lobortis nisl ut aliquip ex ea commodo conse-"
                </a>
              </h4>
              <div class="flex-c-m flex-w w-full p-t-45">
                <a href="#" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  CTA
                </a>
              </div>
            </div>
          </div>
          <div class="row p-t-50">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <span class="stext-115 cl6">
                quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat<br />
                Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tinciduntlaoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequis
              </span>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <span class="stext-115 cl6">
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat<br />
                nibh euismod tinciduntlaoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo conse-
              </span>
            </div>
          </div>
          <div class="row p-t-50">
            <div class="p-b-50 col-sm-12 col-md-12 col-lg-12">
              <h3 class="ltext-105 cl5">
                Selected<br /> Work
              </h3>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="flex-r-m flex-w w-full p-t-100 respon2" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  TITOLONE GRANDE<br />SU DUE RIGHE
                </h2>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-110 cl2  text-end">
                  quis nostrud exerci<br />
                  tation ullamcorper<br />
                  suscipit lobortis nisl<br />
                  ut aliquip ex ea com-
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-103 cl2  text-end">
                  Muputo<br />2023
                </h5>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50 p-b-50">
                <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </a>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a5.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 2 -----*/}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="block2">
                <div class="block2-pic hov-img0">
                  <img src="poto/a6.jpg" class="img-fluid rounded p-t-100 img-size" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  TITOLONE GRANDE<br />SU DUE RIGHE
                </h2>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-110 cl2  text-end">
                  quis nostrud exerci<br />
                  tation ullamcorper<br />
                  suscipit lobortis nisl<br />
                  ut aliquip ex ea com-
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-103 cl2  text-end">
                  Muputo<br />2023
                </h5>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50 p-b-50">
                <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </a>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a1.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section3 -----*/}
      <section class="p-t-100 p-b-50">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-7 col-lg-7">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a3.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-5 col-lg-5">
              <div class="flex-l-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  TITOLONE GRANDE
                </h2>
              </div>
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  SU DUE RIGHE
                </h2>
              </div>
              <div class="flex-l-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-103 cl2  text-end">
                  Muputo
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-103 cl2  text-end">
                  2023
                </h5>
              </div>

              <div class="flex-l-m flex-w w-full p-t-50">
                <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </a>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="flex-c-m flex-w w-full p-t-50">
                <a href="product.html" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  View All
                </a>
              </div>
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

export default ArtistPage;
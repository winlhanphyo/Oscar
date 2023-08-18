import React from 'react';
import styles from './HomePage.module.scss';
import axios from '../../axios/index';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {

  return (
    <>
    <Header />
    <Cart />
    <section>
        <div class="container">
          <div class="row p-t-50">
            <div class="col-lg-4">
              <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                <div class="layer-slick1 animated" data-appear="fadeInDown" data-delay="0">
                  <h2 class="mtext-111 cl2 p-t-19 p-b-43 respon1 text-dark">
                    Artista
                  </h2>
                </div>
                <div class="layer-slick1 animated p-b-40" data-appear="fadeInUp" data-delay="800">
                  <span class=".stext-108 cl2 respon2">
                    quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip
                    ex ea commodo consequat. Duis
                    autem vel eum iriure dolor in hendrerit
                    in vulputate velit esse molestie
                    consequat<br />
                    Lorem ipsum dolor sit amet, cons
                    ectetuer adipiscing elit, sed diam
                    nonummy nibh ...
                  </span>
                </div>
                <div class="flex-c-m flex-w w-full p-t-45">
                  <a href="#" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    READ MORE
                  </a>
                </div>
                <div class="layer-slick1 animated p-t-200" data-appear="fadeInDown" data-delay="0">
                  <h2 class="ltext-109 cl2 p-t-19 p-b-43 respon1 " style={{testAlight: "end"}}>
                    TITOLONE GRANDE<br />SU DUE RIGHE
                  </h2>
                  <h5 class="text-115 cl2 p-t-19 respon1 p-t-40" style={{testAlight: "end"}}>
                    Muputo<br />2023
                  </h5>
                </div>
                <div class="flex-r-m flex-w w-full p-t-45">
                  <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a1.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
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
        </div>
      </section>

      {/* <!--Section 2--> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 text-center p-t-20">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="rounded img-fluid" style={{width: "250px"}} />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
              <div class="layer-slick1 animated p-t-50" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2 p-t-19 p-b-43 respon1 " style={{testAlight: "end"}}>
                  TITOLONE GRANDE<br />SU DUE RIGHE
                </h2>
                <h5 class="text-115 cl2 p-t-19 respon1 p-t-40" style={{testAlight: "end"}} >
                  Muputo<br />2023
                </h5>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a2.jpg" alt="IMG-PRODUCT" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 p-t-50">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a6.jpg" alt="IMG-PRODUCT" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--- Section 3 --> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a5.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>
              <div class="carousel-caption p-b-100">
                <h1 class="text-center">parallax image of a painting</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center">
                <a href="#" class="ltext-108 cl2 hov-cl1 trans-04">
                  "quis nostrud exerci tation ullamcorper suscipit lobortis<br />
                  nisl ut aliquip ex ea commodo consequat. Duis"
                </a>
              </h4>
            </div>
          </div>
        </div>
      </section>


      <section class="p-t-100">
        <div class="container">
          <div class="row">

            <div class="col-lg-4">
              <div class="layer-slick1 animated " data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2 p-b-43 respon1 p-t-100" style={{testAlight: "end"}}>
                  TITOLONE GRANDE<br />SU DUE RIGHE
                </h2>
                <h5 class="text-115 cl2 p-t-19 respon1 p-t-40" style={{testAlight: "end"}} >
                  quis nostrud exerci<br />
                  tation ullamcorper<br />
                  suscipit lobortis nisl<br />
                  ut aliquip ex ea com-
                </h5>
                <h5 class="text-115 cl2 p-t-19 respon1 p-t-40" style={{testAlight: "end"}} >
                  Muputo<br />2023
                </h5>
                <div class="flex-r-m flex-w w-full p-t-45">
                  <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-8 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a3.jpg" alt="IMG-BLOG" />
                  </a>
                </div>
              </div>

              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a6.jpg" class="img-fluid p-t-50 rounded" style={{width: "300px"}} />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <!-- Section 5 --> */}
      <section class="p-t-100 p-b-50">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src="poto/a4.jpg" alt="IMG-BLOG" class="img-fluid " />
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="layer-slick1 animated p-t-50" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2 p-t-300 p-b-43 respon1 " style={{textAlign: "start"}}>
                  TITOLONE GRANDE<br />SU DUE RIGHE
                </h2>
                <h5 class="text-115 cl2 respon1 p-t-40" style={{textAlign: "start"}} >
                  Muputo<br />2023
                </h5>
                <div class="flex-l-m flex-w w-full p-t-45">
                  <a href="product-detail.html" target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="flex-c-m flex-w w-full p-t-45">
                <a href="product.html" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Visit To Gallery
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 6 --> */}
      <section class="p-b-50 " >
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/watch?v=XxIRxuBtJpg" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="p-b-50 " >
        <div class="container bg3 bor2">
          <div class="row">

            <div class="col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center ltext-108 text-white">
                "quis nostrud exerci tation ullamcorper suscipit<br />
                lobortis nisl ut aliquip ex ea commodo conse-"
              </h4>
              <div class="flex-c-m flex-w w-full p-t-45 p-b-50">
                <a href="#" class="flex-c-m stext-101 cl5 size-102 bg0 bor1 hov-btn1 p-lr-15 trans-04">
                  CTA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default HomePage;
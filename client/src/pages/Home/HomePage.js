import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import styles from './HomePage.module.scss';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { imageURL } from '../../utils/constants/constant';


const HomePage = () => {
  const [windowSize, setWindowSize] = React.useState([
    {
      width: window.innerWidth,
      height: window.innerHeight
    }
  ]);
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get("/product/top").then((dist) => {
      // $(".odd").empty();
      setProductList(dist?.data?.data);
      setLoading(false);
    }).catch((err) => {
      swal("Oops!", "Product List Page API Error", "error");
      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <Cart />
      {loading && <LoadingSpinner />}
      {/* <!-- Section 1 --> */}
      <section>
        <div class="container">
          <div class="p-t-50">
            <p>INTRO AL SITO DI OSCAR</p>
            <p>
              Lorem ipsum dolor sit amet, cons ectetuer adipiscing ut<br />
              laoreet dolore magna aliquam erat volutpat. Ut wisi<br />
              enim ad minim veniam, quis nostrud exerci tation ullam<br />
              corper suscipit lobortis nisl ut aliquip ex ea commodo<br />
              consedolore eu feugiat nulla facilisis at vero eros et ac<br />cumsan et iusto odio dignissim
            </p>
            <div class="flex-w w-full p-t-45">
              <Link to="/about" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                READ MORE
              </Link>
            </div>
            <div class="row p-t-50">
              <div class="p-b-50 col-sm-12 col-md-12 col-lg-12">
                <h3 class="ltext-105 cl5">
                  highlights
                </h3>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                  <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                    <h2 class="ltext-109 cl2  text-end">
                      {/* TITOLO<br />OPERA */}
                      {productList[0]?.name}
                    </h2>
                  </div>
                  <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                    <h5 class="mtext-103 cl2  text-end">
                      Muputo<br />2023
                    </h5>
                  </div>
                  <div class="flex-r-m flex-w w-full p-t-100">
                    <Link to={`/product/${productList[0]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-sm-12 col-md-8 col-lg-8">
                <div class="blog-item">
                  <div class="hov-img0 bor2">
                    <Link to={`/product/${productList[0]?._id}`}>
                      <img src={imageURL + productList[0]?.image} alt="IMG-BLOG" />
                    </Link>
                  </div>
                </div>
                <h4 class="p-b-15 p-t-100 text-center">
                  <a href="#" class="ltext-108 cl2 hov-cl1 trans-04">
                    "{productList[0]?.quote}"
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--Section 2--> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-100">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a2.jpg" alt="IMG-PRODUCT" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-50">
                <div class="block2-pic hov-img0 bor2">
                  <img src="poto/a6.jpg" alt="IMG-PRODUCT" />
                  <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="flex-c-m flex-w w-full p-t-100">
                <a href="product.html" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Visit To Gallery
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--- Section 3 --> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="p-b-50 col-sm-12 col-md-12 col-lg-12">
              <h3 class="ltext-105 cl5">
                social<br />
                updates
              </h3>
            </div>
            <div class="dis-flex flex-w p-l-30 p-r-30">
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-30">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-30">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 col-md-6 col-lg-4 p-t-30">
                <div class="block2">
                  <div class="block2-pic hov-img0 bor2">
                    <img src="poto/a5.jpg" alt="IMG-PRODUCT" class="img-fluid" />
                    <a href="product-detail.html" target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--- Section 4 --> */}
      <section class="p-t-740">
        <div class="bg3">
          <div class="container">
            <div class="row video-iframe">
              <div class="col-sm-12 col-md-12 col-lg-12 text-center m-t--470">
                <iframe width="100%" height="600" src="https://www.youtube.com/embed/TcqAu8VyjZA" class="embed-responsive-item" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-12">
                <h4 class="p-b-15 p-t-100 text-center">
                  <a href="#" class="ltext-108 cl0 hov-cl1 trans-04">
                    "quis nostrud exerci tation ullamcorper suscipit lobortis<br />
                    nisl ut aliquip ex ea commodo consequat. Duis"
                  </a>
                </h4>
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
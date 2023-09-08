import React from 'react';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { imageURL } from '../../utils/constants/constant';

const ArtistPage = () => {
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
      {/* --- Section 1 -----*/}
      <section class="p-t-50 respon2">
        <div class="container">
          <div class="row">
            <img class="over-image respon8" src="poto/j5.png" />
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
                  <div class="flex-r-m flex-w w-full p-t-45" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                    <Link to={`/product/${productList[2]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                      Art Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a href="product-detail.html">
                    <img src={imageURL + productList[2]?.image} alt="IMG-BLOG" style={windowSize?.width <= 575 ? { width: "390px", objectFit: "cover" } : {}} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center">
                <Link to={`/product/${productList[1]?._id}`} class="ltext-108 cl2 hov-cl1 trans-04">
                  {/* "quis nostrud exerci tation ullamcorper suscipit<br />
                  lobortis nisl ut aliquip ex ea commodo conse-" */}
                  {productList[1]?.description}
                </Link>
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
                <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {/* TITOLONE GRANDE<br />SU DUE RIGHE */}
                  {productList[1]?.name}
                </h2>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-110 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {/* quis nostrud exerci<br />
                  tation ullamcorper<br />
                  suscipit lobortis nisl<br />
                  ut aliquip ex ea com- */}
                  {productList[1]?.description}
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  Muputo<br />2023
                </h5>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50 p-b-50" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[1]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[1]?._id}`}>
                    <img src={imageURL + productList[1]?.image} alt="IMG-BLOG" style={windowSize?.width <= 575 ? { width: "390px", objectFit: "cover" } : {}} />
                  </Link>
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
                  <img src={imageURL + productList[3]?.image} class="img-fluid rounded p-t-100 img-size" style={windowSize?.width <= 575 ? { justifyContent: "center", width: "390px", objectFit: "cover" } : {}} />
                  <Link to={`/product/${productList[3]?._id}`} target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {/* TITOLONE GRANDE<br />SU DUE RIGHE */}
                  {productList[0]?.name}
                </h2>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0">
                <h5 class="mtext-110 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {/* quis nostrud exerci<br />
                  tation ullamcorper<br />
                  suscipit lobortis nisl<br />
                  ut aliquip ex ea com- */}
                  {productList[0]?.description}
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  Muputo<br />2023
                </h5>
              </div>

              <div class="flex-r-m flex-w w-full p-t-50 p-b-50" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[0]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[0]?._id}`}>
                    <img src={imageURL + productList[0]?.image} style={windowSize?.width <= 575 ? { width: "390px", objectFit: "cover" } : {}} alt="IMG-BLOG" />
                  </Link>
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
                  <Link to={`/product/${productList[5]?._id}`}>
                    <img src={imageURL + productList[5]?.image} alt="IMG-BLOG" style={{ width: "350px" }} />
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-5 col-lg-5">
              <div class="flex-l-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {productList[5]?.name}
                </h2>
              </div>
              {/* <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  SU DUE RIGHE
                </h2>
              </div> */}
              <div class="flex-l-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  Muputo
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  2023
                </h5>
              </div>

              <div class="flex-l-m flex-w w-full p-t-50" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[5]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="flex-c-m flex-w w-full p-t-50">
                <Link to="/shop" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  View All
                </Link>
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
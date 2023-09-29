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
      {/* <!--Section 1--> */}
      <section>
        <div class="container">
          <div class="row p-t-50">
            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                <div class="layer-slick1 animated" data-appear="fadeInDown" data-delay="0">
                  <h2 class="mtext-111 cl2 p-t-19 p-b-43  text-dark">
                    Artista
                  </h2>
                </div>
                <div class="layer-slick1 animated p-b-40" data-appear="fadeInUp" data-delay="800">
                  <span class="stext-116 cl2 respon2">
                    quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip
                    ex ea commodo consequat. Duis
                    autem vel eum iriure dolor in hendrerit
                    in vulputate velit esse molestie<br />
                    consequat
                    Lorem ipsum dolor sit amet, cons
                    ectetuer adipiscing elit, sed diam
                    nonummy nibh ...
                  </span>
                </div>
                <div class="flex-c-m flex-w w-full p-t-15">
                  <Link to="/about" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    READ MORE
                  </Link>
                </div>
                <div class="flex-r-m flex-w w-full p-t-100" style={windowSize?.width < 400 ? { paddingTop: "100px" } : {}} data-appear="fadeInDown" data-delay="0">
                  <h2 class="ltext-109 cl2  text-end oscar-center" style={windowSize?.width < 400 ? { textAlign: "center" } : {}}>
                    {/* TITOLONE GRANDE<br/>SU DUE RIGHE */}
                    {productList[0]?.name}
                  </h2>
                </div>
                <div class="flex-r-m flex-w w-full p-t-50 oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center", paddingTop: "50px" } : {}} data-appear="fadeInDown" data-delay="0">
                  <h5 className={windowSize?.width < 400 ? `mtext-103 cl2  text-end ${styles.productLabel}` : "mtext-103 cl2  text-end oscar-center"}>
                    Muputo<br />2023
                  </h5>
                </div>
                <div class="flex-r-m flex-w w-full p-t-50 oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center" } : {}}>
                  <Link to={`/product/${productList[0]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04 oscar-center">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[0]?._id}`}>
                    <img className={styles.img} src={imageURL + productList[0]?.image} alt="IMG-BLOG" />
                  </Link>
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
        </div>
      </section>

      {/* <!--Section 2--> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="p-b-50 col-sm-12 col-md-12 col-lg-12">
              <h3 class="ltext-105 cl5">
                Selected<br /> Work
              </h3>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img className={styles.img} src={imageURL + productList[1]?.image} alt="IMG-PRODUCT" class="img-fluid" />
                  <Link to={`/product/${productList[1]?._id}`} class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
              <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0" style={windowSize?.width < 400 ? { paddingTop: "100px" } : {}}>
                <h2 class="ltext-109 cl2  text-end oscar-center" style={windowSize?.width < 400 ? { textAlign: "center" } : {}}>
                  {/* TITOLONE GRANDE<br/>SU DUE RIGHE */}
                  {productList[1]?.name}
                </h2>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50 oscar-center" data-appear="fadeInDown" data-delay="0" style={windowSize?.width < 400 ? { justifyContent: "center", paddingTop: "50px" } : {}}>
                <h5 className={windowSize?.width < 400 ? `mtext-103 cl2  text-end ${styles.productLabel}` : "mtext-103 cl2  text-end oscar-center"}>
                  Muputo<br />2023
                </h5>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-100">
                <div class="block2-pic hov-img0 bor2">
                  <img className={styles.img} src={imageURL + productList[2]?.image} alt="IMG-PRODUCT" />
                  <Link to={`/product/${productList[2]?._id}`} target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-50">
                <div class="block2-pic hov-img0 bor2">
                  <img className={styles.img} src={imageURL + productList[3]?.image} alt="IMG-PRODUCT" />
                  <Link to={`/product/${productList[3]?._id}`} target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
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
            <div class="col-sm-12 col-md-12 col-lg-12 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[4]?._id}`}>
                    <img className={styles.img} src={imageURL + productList[4]?.image} alt="IMG-BLOG" />
                  </Link>
                </div>
              </div>
              <div class="carousel-caption p-b-100">
                <h1 class="text-center ltext-101">parallax image of a painting</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center">
                <Link to={`/product/${productList[4]?._id}`} class="ltext-108 cl2 hov-cl1 trans-04">
                  {/* "quis nostrud exerci tation ullamcorper suscipit lobortis<br/>
							nisl ut aliquip ex ea commodo consequat. Duis" */}
                  "{productList[4]?.description}"
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* <!--Section 4--> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="flex-r-m flex-w w-full p-t-100 respon2" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end oscar-center" style={windowSize?.width < 400 ? { textAlign: "center" } : {}}>
                  {/* TITOLONE GRANDE<br/>SU DUE RIGHE */}
                  {productList[5]?.name}
                </h2>
              </div>
              <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="mtext-110 cl2  text-end oscar-center" style={windowSize?.width < 400 ? { textAlign: "center" } : {}}>
                  {/* quis nostrud exerci<br/>
							tation ullamcorper<br/>
							suscipit lobortis nisl<br/>
							ut aliquip ex ea com- */}
                  {productList[5]?.description}
                </h2>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50 oscar-center" data-appear="fadeInDown" style={windowSize?.width < 400 ? { justifyContent: "center", paddingTop: "50px" } : {}} data-delay="0">
                <h5 className={windowSize?.width < 400 ? `mtext-103 cl2  text-end ${styles.productLabel}` : "mtext-103 cl2  text-end oscar-center"}>
                  Muputo<br />2023
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-100 p-b-50 oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[5]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04 ">
                  Art Details
                </Link>
              </div>
            </div>

            <div class="col-sm-12 col-md-8 col-lg-8 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <a to={`/product/${productList[5]?._id}`}>
                    <img className={styles.img} src={imageURL + productList[5]?.image} alt="IMG-BLOG" />
                  </a>
                </div>
              </div>

              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img className={styles.img}
                    src={imageURL + productList[3]?.image}
                    class="img-fluid p-t-50 rounded"
                    style={windowSize?.width < 400 ? { margin: "30px 0", width: "300px" } : { width: "300px" }} />
                  <Link to={`/product/${productList[3]?._id}`} target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* <!-- Section 5 --> */}
      <section class="p-t-100 p-b-50 respon2">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-8 col-lg8 text-center">
              <div class="block2">
                <div class="hov-img0">
                  <Link to={`/product/${productList[2]?._id}`}>
                    <img className={styles.img} src={imageURL + productList[2]?.image} alt="IMG-BLOG" class="img-fluid oscar-padding-top" />
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="flex-l-m flex-w w-full p-t-200 respon3" style={windowSize?.width < 400 ? { paddingTop: "100px" } : {}} data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-start oscar-center" style={windowSize?.width < 400 ? { textAlign: "center" } : {}}>
                  {/* TITOLONE GRANDE */}
                  {productList[2]?.name}
                </h2>
              </div>
              {/* <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
						<h2 class="ltext-109 cl2  text-end">
							SU DUE RIGHE
						</h2>
					</div> */}
              <div class="flex-l-m flex-w w-full p-t-50 oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center", paddingTop: "50px" } : {}} data-appear="fadeInDown" data-delay="0">
                <h5 className={windowSize?.width < 400 ? `mtext-103 cl2  text-end ${styles.productLabel}` : "mtext-103 cl2  text-end oscar-center"}>
                  Muputo
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center" } : {}} data-appear="fadeInDown" data-delay="0">
                <h5 className={windowSize?.width < 400 ? `mtext-103 cl2  text-end ${styles.productLabel}` : "mtext-103 cl2  text-end oscar-center"}>
                  2023
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full p-t-50 oscar-center" style={windowSize?.width < 400 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[2]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="flex-c-m flex-w w-full p-t-50">
                <Link to="/shop" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Visit To Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 6 --> */}
      <section class="p-b-50 p-t-50" >
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe src="https://www.youtube.com/embed/TcqAu8VyjZA" class="embed-responsive-item" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--Section 7--> */}
      <section class="p-b-50 ">
        <div class="container bg3 bor2">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
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
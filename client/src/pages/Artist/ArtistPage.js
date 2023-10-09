import React from 'react';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { imageURL } from '../../utils/constants/constant';

const ArtistPage = ({addCategory}) => {
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
          <div class="row p-t-50">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center ">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[0]?._id}`}>
                    <img src={imageURL + productList[0]?.image} alt="IMG-BLOG" class="img-fluid" style={{ width: "3000px", height: "300px", objectFit: "cover" }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="row p-t-50">
            <div class="col-sm-12 col-md-12 col-lg-12">
              <h3 class="ltext-105 cl5">
                Selected<br /> Work
              </h3>
            </div>
            <div class="col-sm-12 col-md-4 col-lg-4 p-t-50">
              <div class="layer-slick1 animated p-b-40" data-appear="fadeInUp" data-delay="800">
                <span class="stext-116 cl2">
                  INTRO AL SITO DI OSCAR
                  Lorem ipsum dolor sit amet, cons ectetuer adipiscing ut
                  laoreet dolore magna aliquam erat volutpat. Ut wisi
                  enim ad minim veniam, quis nostrud exerci tation ullamcorper
                  suscipit lobortis nisl ut aliquip ex ea commodo
                  consedolore eu feugiat nulla facilisis at vero eros et accumsan
                  et iusto odio dignissim
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 2 --> */}
      <section>
        <div class="container">
          <div class="row p-t-100">
            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                <div class="flex-r-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                  <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                    {/* TITOLO<br />OPERA */}
                    {productList[0]?.name}
                  </h2>
                </div>
                <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                  <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                    Muputo<br />2023
                  </h5>
                </div>
                <div class="flex-r-m flex-w w-full p-t-100" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
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
                <Link to={`/product/${productList[0]?._id}`} class="ltext-108 cl2 hov-cl1 trans-04">
                  "{productList[0]?.quote}"
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* <!--Section 3--> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-4 p-t-20">
              <div class="block2">
                <div class="block2-pic hov-img0 bor2">
                  <img src={imageURL + productList[1]?.image} alt="IMG-PRODUCT" class="img-fluid" />
                  <Link to={`/product/${productList[1]?._id}`} target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
              <div class="flex-r-m flex-w w-full p-t-70" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {productList[1]?.name}
                </h2>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  Muputo<br />2023
                </h5>
              </div>
              <div class="flex-r-m flex-w w-full p-t-50" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[1]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-100">
                <div class="block2-pic hov-img0 bor2">
                  <img src={imageURL + productList[2]?.image} alt="IMG-PRODUCT" />
                  <Link to={`/product/${productList[2]?._id}`} target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="block2 p-t-50">
                <div class="block2-pic hov-img0 bor2">
                  <img src={imageURL + productList[3]?.image} alt="IMG-PRODUCT" />
                  <Link to={`/product/${productList[3]?._id}`} target="_blank" class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                    Art Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!--- Section 4 --> */}
      <section class="p-t-100">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center">
              <div class="blog-item">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[3]?._id}`}>
                    <img src={imageURL + productList[3]?.image} alt="IMG-BLOG" />
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
                <Link to={`/product/${productList[3]?._id}`} class="ltext-108 cl2 hov-cl1 trans-04">
                  "{productList[3]?.quote}"
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 5 --> */}
      <section class="p-t-100">
		<div class="container">
			<div class="row">
				<div class="col-sm-6 col-md-2 col-lg-2">
					<div class="flex-r-m flex-w w-full p-t-50 respon2" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
						<h2 class="ltext-109 cl2 text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
              {productList[4]?.name}
						</h2>
					</div>
					<div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
						<h2 class="mtext-110 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
              {productList[4]?.description}
						</h2>
					</div>
					<div class="flex-r-m flex-w w-full p-t-50" data-appear="fadeInDown" data-delay="0 "style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
						<h5 class="mtext-103 cl2 text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
							Muputo<br />2023
						</h5>
					</div>
					<div class="flex-r-m flex-w w-full p-t-50" style={windowSize?.width <= 575 ? { justifyContent: "center", marginBottom: "30px" } : {}}>
						<Link to={`/product/${productList[4]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
							Art Details
						</Link>
					</div>
				</div>
				<div class="col-sm-12 col-md-6 col-lg-6 text-center">
					<div class="blog-item">
						<div class="hov-img0 ">
              <Link to={`/product/${productList[4]?._id}`}>
								<img src={imageURL + productList[4]?.image} alt="IMG-BLOG" />
							</Link>
						</div>
					</div>
					<div class="block2 p-t-50">
						<div class="block2-pic hov-img0 bor2">
							<img src={imageURL + productList[5]?.image} class="img-fluid" style={{width: "300px"}} />
							<Link to={`/product/${productList[5]?._id}`}target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
								Art Details
							</Link>
						</div>
					</div>
				</div>
                <div class="col-sm-6 col-md-4 col-lg-4 text-center">
                    <div class="block2 p-t-50">
						<div class="block2-pic hov-img0 bor2">
							<img src={imageURL + productList[6]?.image} class="img-fluid" style={{width: "300px"}} />
							<Link to={`/product/${productList[6]?._id}`} target="_blank" class="block2-btn flex-c-m stext-104 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04">
								Art Details
							</Link>
						</div>
					</div>
                </div>
			</div>
		</div>
	</section>

      {/* <!-- Section 6 --> */}
      <section class="p-t-100 p-b-50">
        <div class="container">
        {productList[7] &&
          <div class="row">
            <div class="col-sm-12 col-md-8 col-lg8 text-center">
              <div class="block2">
                <div class="hov-img0 bor2">
                  <Link to={`/product/${productList[7]?._id}`}>
                    <img src={imageURL + productList[7]?.image} alt="IMG-BLOG" class="img-fluid " />
                  </Link>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-6 col-lg-4">
              <div class="flex-l-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  {productList[7]?.name}
                </h2>
              </div>
              {/* <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2  text-end">
                  OPERA
                </h2>
              </div> */}
              <div class="flex-l-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  Muputo
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <h5 class="mtext-103 cl2  text-end" style={windowSize?.width <= 575 ? { textAlign: "center" } : {}}>
                  2023
                </h5>
              </div>
              <div class="flex-l-m flex-w w-full p-t-100" style={windowSize?.width <= 575 ? { justifyContent: "center" } : {}}>
                <Link to={`/product/${productList[7]?._id}`} target="_blank" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  Art Details
                </Link>
              </div>
            </div>
          </div>
          }
        </div>
      </section>



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
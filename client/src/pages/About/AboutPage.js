import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { imageURL } from '../../utils/constants/constant';
// import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get("/product/top").then((dist) => {
      console.log('dist', dist?.data?.data);
      setProductList(dist?.data?.data);
      setLoading(false);
    }).catch((err) => {
      swal("Oops!", "Product List Page API Error", "error");
      setLoading(false);
    });
  }, []);


  return (
    <>
      <Header />
      <Cart />

      {/* <!-- Title page --> */}
      {/* <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: "url('poto/a3.jpg')" }}>
        <h2 class="ltext-105 cl0 txt-center">
          About
        </h2>
      </section> */}
      {loading && <LoadingSpinner />}

      {/* <!-- Content page --> */}
      <section class="p-t-250">
        <div class="bg3">
          {/* <!-- Containter --> */}
          <div class="container">

            <div class="row">
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                  <div class="layer-slick1 animated" data-appear="fadeInDown" data-delay="0">
                    <h2 class="mtext-111 cl0 p-t-19 p-b-20">
                      about
                    </h2>
                  </div>
                  <div class="layer-slick1 animated p-b-40" data-appear="fadeInUp" data-delay="800">
                    <span class="stext-115 cl0 respon2">
                      rem ipsum dolor sit amet, cons ectetuer adipiscing ut
                      laoreet dolore magna aliquam erat volutpat. Ut wisi
                      enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                      consedolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim Lorem ipsum dolor
                      sit
                      amet, consectetuer adipiscing elit, sed diam nonummy
                      nibh euismod tincidunt ut laoreet dolore magna aliquam
                      erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl
                      ut
                      aliquip ex ea commodo consequat. Duis autem vel eum
                      iriure dolor in hendrerit in vulputate velit esse molestie
                      consequat, vel illum dolore eu feugiat nulla facilisis at <br /><br />
                        rem ipsum dolor sit amet, cons ectetuer adipiscing ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi
                        enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
                        consedolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim Lorem ipsum dolor
                        sit
                        amet, consectetuer adi
                      </span>
                        <div class="w-full p-t-45">
                          <div></div>
                          <a href="product-detail.html" target="_blank" class="dis-block stext-103 cl0 p-b-15 trans-04">
                            <span class="p-r-5"><img src="images/icons/icon-file.png" alt="icon-file" /></span>
                            View Curriculum Vitae.pdf
                          </a>
                          <a href="product-detail.html" target="_blank" class="dis-block stext-103 cl0 trans-04">
                            <span class="p-r-5"><img src="images/icons/icon-download.png" alt="icon-download" /></span>
                            Download Press Kit.zip
                          </a>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-8 col-lg8 m-t--125">
                  <div class="blog-item">
                    <div class="hov-img0 bor2">
                      <Link to={`/product/${productList[0]?._id}`}>
                        <img src={productList?.length > 0 && imageURL + productList[0]?.image} alt="IMG-BLOG" />
                      </Link>
                    </div>
                  </div>
                  <h4 class="p-b-15 p-t-100 text-center">
                    <Link to={`/product/${productList[0]?._id}`} class="ltext-108 cl0 hov-cl1 trans-04">
                      "{productList?.length > 0 && productList[0]?.quote}"
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default AboutPage;
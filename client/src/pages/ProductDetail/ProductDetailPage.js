import React from 'react';
import swal from 'sweetalert';
import { useHistory, useParams, Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';
import { imageURL } from '../../utils/constants/constant';
import styles from "./ProductDetail.module.scss";

const ProductDetailPage = () => {
  const param = useParams();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [product, setProduct] = React.useState();
  const [firstPartDescription, setFirstPartDescription] = React.useState("");
  const [secondPartDescription, setSecondPartDescription] = React.useState("");

  React.useEffect(() => {
    let id = param['id'];
    axios.get(`/product/${id}`).then((dist) => {
      console.log("dist", dist?.data?.data);
      setProduct(dist?.data?.data);
      if (dist?.data?.data?.fullDescription?.length > 500) {
        let fullDescription = dist?.data?.data?.fullDescription;
        const midpoint = Math.ceil(fullDescription.length / 2);
        // Split the text into two halves
        const firstHalf = fullDescription.slice(0, midpoint);
        const secondHalf = fullDescription.slice(midpoint);
        setFirstPartDescription(firstHalf);
        setSecondPartDescription(secondHalf);
      } else {
        setFirstPartDescription(dist?.data?.data?.fullDescription);
      }
    });
  }, []);

  /**
   * add new product.
   * @param {*} dist 
   * @param {*} cart 
   */
  const addNewProduct = (dist, cart) => {
    const param = {
      id: dist?.data.data._id,
      name: dist?.data.data.name,
      price: dist?.data.data.price,
      count: dist?.data.data.count,
      image: dist?.data.data.image,
      status: dist?.data?.data?.status,
      quantity: 1
    };
    cart.push(param);
    localStorage.setItem("cart", JSON.stringify(cart));
    history.push("/cart");
  }

  const addToCart = () => {
    let id = param['id'];
    console.log('addToCart', id);
    axios.get(`/product/${id}`).then((dist) => {
      console.log('CART', dist?.data?.data);
      if (dist?.data?.data?.count > 0 && dist?.data?.data?.status === "available") {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart?.length > 0) {
          console.log('CART', cart);
          const data = cart?.find((c) => c.id === id);
          console.log('data', data);
          if (data) {
            swal("Success", "Product is already added", "success").then(() => {
              history.push("/cart");
            });
          } else {
            addNewProduct(dist, cart);
          }
        } else {
          addNewProduct(dist, cart);
        }

      } else {
        swal("Oops!", "Product is out of stock", "error");
      }
    });
  }

  const downloadImage = () => {
    const imageUrl = product?.image;
    console.log('image url', imageUrl);
    const imgName = product?.image?.split('/');
    axios.get(`/product/${imgName[imgName.length - 1]}/download`, { responseType: 'blob' }) // Set responseType to 'blob'
    .then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Extract the filename from the URL
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

        // Set the download attribute and filename
        link.setAttribute('download', filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element and URL object
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error downloading image:', error);
    });
  }

  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner />}

      {/* <!-- breadcrumb --> */}
      <div class="container">
        <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" class="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </a>

          <a href="product.html" class="stext-109 cl8 hov-cl1 trans-04">
            Artista
            <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
          </a>

          <span class="stext-109 cl4">
            {product?.name}
          </span>
        </div>
      </div>

      {/* <!-- Product Detail --> */}
      {/* <section class="sec-product-detail bg0 p-t-65 p-b-60">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-7 p-b-30">
              <div class="blog-item">
                <div class="hov-img0">
                  <img src={imageURL + product?.image} alt="IMG-BLOG" class="img-fluid rounded img-size-xl" />
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-5 p-b-30">
              <div class="p-r-50 p-t-5 p-lr-0-lg">
                <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                  {product?.name}
                </h4>

                <span class="mtext-106 cl2">
                  ${product?.price}
                </span>

                <p class="stext-102 cl3 p-t-23">
                  {product?.description}
                </p>

                <div class="p-t-33">

                  <div class="flex-w flex-l-m p-b-10">
                    <div className={`size-205 flex-l-m respon6 stext-301 ${styles.artInfoRespon}`}>
                      Category
                    </div>

                    <div class="size-206 stext-110">
                      {product?.category?.name}
                    </div>
                  </div>

                  <div class="flex-w flex-l-m p-b-10">
                    <div className={`size-205 flex-l-m respon6 stext-301 ${styles.artInfoRespon}`}>
                      Status
                    </div>

                    <div class="size-206 stext-110">
                      {product?.status === "available" ? "Available" : "Not Available"}
                    </div>
                  </div>
                  <hr />
                  <div class="flex-w flex-c-m p-b-10">
                    <div class="size-204 flex-w flex-c-m respon6-next">
                      {product?.status === "available" &&
                        <button
                          onClick={addToCart}
                          class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                          Add to cart
                        </button>
                      }
                    </div>
                  </div>
                </div>

                <div class="flex-w flex-c-m p-t-40">
                  <div class="flex-m bor9 p-r-10 m-r-11">
                    <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
                      <i class="zmdi zmdi-favorite"></i>
                    </a>
                  </div>

                  <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
                    <i class="fa fa-facebook"></i>
                  </a>

                  <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Twitter">
                    <i class="fa fa-twitter"></i>
                  </a>

                  <a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
                    <i class="fa fa-google-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Related Products --> */}
      {/* <section class="sec-relate-product bg0 p-t-20 p-b-105">
        <div class="container">
          <div class="p-b-45">
            <h3 class="ltext-106 cl5 txt-center">
              Related Products
            </h3>
          </div>
          <div class="wrap-slick2">
            <div class="slick2">

              {relatedProduct.map((dist) => {
                return (
                  <>
                    <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">

                      <div class="block2">
                        <div class="block2-pic hov-img0">
                          <img src={imageURL + dist?.image} alt="IMG-PRODUCT" class="img-fluid img-size respon1" />

                          <Link to={`/product/${dist?._id}`}
                            class="block2-btn flex-c-m stext-103 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Detail
                          </Link>
                        </div>

                        <div class="block2-txt flex-w flex-t p-t-14">
                          <div class="block2-txt-child1 flex-col-l ">
                            <Link to={`/product/${dist?._id}`} class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                              {dist?.name}
                            </Link>

                            <span class="stext-105 cl3">
                              ${dist?.price}
                            </span>
                          </div>

                          <div class="block2-txt-child2 flex-r p-t-3">
                            <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                              <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON" />
                              <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })

              }

            </div>
          </div>
        </div>
      </section> */}


      {/* <!-- Section 1 --> */}
      <section>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-8 col-lg-8 flex-c-m">
              <div class="blog-item p-t-100 respon2 img-size-xxl">
                <div class="hov-img0 bor2 text-center">
                  <img src={imageURL + product?.image} alt="IMG-BLOG" class="" />
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4">
              <div class="flex-col-l-m p-t-100 p-b-30 respon5">
                <div class="layer-slick1 animated" data-appear="fadeInDown" data-delay="0">
                  <h2 class="ltext-109 cl2 p-t-19 p-b-43 text-dark text-uppercase">
                    {product?.name}
                  </h2>
                </div>
                <div class="flex-l-m flex-w w-full p-t-10" data-appear="fadeInDown" data-delay="0">
                  <h5 class="mtext-103 cl2 text-start">
                    Muputo<br />2023
                  </h5>
                </div>
                <div class="layer-slick1 animated p-t-40" data-appear="fadeInUp" data-delay="800">
                  <span class="stext-108 cl2">
                    {product?.description}
                  </span>
                </div>
              </div>
              <div class="flex-w flex-c-m p-b-10">
                    <div class="size-204 flex-w flex-c-m respon6-next">
                      {product?.status === "available" &&
                        <button
                          onClick={addToCart}
                          class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                          Add to cart
                        </button>
                      }
                    </div>
                  </div>
            </div>
          </div>
          <div class="row p-t-50">
            <div class="col-sm-12 col-md-8 col-lg-8 flex-c-m">
              <ul class="p-lr-28 p-lr-15-sm bor16">
                <li class="flex-w flex-t p-b-7">
                  <span class="stext-105 cl3 size-205">
                    Dimension
                  </span>

                  <span class="stext-105 cl6 size-206">
                    {product?.dimension}
                  </span>
                </li>

                <li class="flex-w flex-t p-b-7">
                  <span class="stext-105 cl3 size-205">
                    Materials
                  </span>

                  <span class="stext-105 cl6 size-206">
                    {product?.material}
                  </span>
                </li>

                <li class="flex-w flex-t p-b-7">
                  <span class="stext-105 cl3 size-205">
                    Technique
                  </span>

                  <span class="stext-105 cl6 size-206">
                    {product?.technique}
                  </span>
                </li>
              </ul>
            </div>
            <div class="col-sm-6 col-md-4 col-lg-4">
              <h4 class="p-b-15 p-t-20 stext-105">
                Notes: {product?.note}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* <!--Section 2--> */}
      <section class="p-t-50 respon2">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 text-center">
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h2 class="ltext-109 cl2 p-b-43  text-start">
                  Full Description
                </h2>
              </div>
            </div>
            {firstPartDescription &&
              <div class="col-sm-12 col-md-6 col-lg-6">
                {firstPartDescription}
              </div>
            }
            {secondPartDescription &&
            <div class="col-sm-12 col-md-6 col-lg-6">
              {secondPartDescription}
				    </div>
            }
          </div>
          <div class="col-sm-12 col-md-12 col-lg-12 text-center">
            <div class="flex-l-m flex-w w-full p-t-100" data-appear="fadeInDown" data-delay="0">
              <div onClick={downloadImage} style={{cursor: "pointer"}} target="_blank" class="flex-c-m mtext-103 cl5 size-102 p-lr-15 trans-04">
                <i class="zmdi zmdi-download zmdi-hc-lg p-r-10"></i>Download a free Jpeg of this painting
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Section 8 --> */}
      <section class="p-b-50 p-t-100" >
        <div class="container bg3 bor2">
          <div class="row">
            {/* <!-- Col --> */}
            <div class="col-sm-12 col-md-12 col-lg-12">
              <h4 class="p-b-15 p-t-100 text-center ltext-108 text-white">
                "quis nostrud exerci tation ullamcorper suscipit<br />
                lobortis nisl ut aliquip ex ea commodo conse-"
              </h4>
              <div class="flex-c-m flex-w w-full p-t-45 p-b-50">
                <a href="#" class="flex-c-m stext-101 cl5 size-102 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                  CTA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default ProductDetailPage;
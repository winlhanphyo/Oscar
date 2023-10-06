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

      {/* <!-- Product Detail --> */}

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
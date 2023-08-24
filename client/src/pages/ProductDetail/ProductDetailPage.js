import React from 'react';
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';

const ProductDetailPage = () => {
  const param = useParams();
  const history = useHistory();
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    let id = param['id'];
    axios.get(`/product/${id}`).then((dist) => {
      console.log("dist", dist?.data?.data);
      setProduct(dist?.data?.data);
    });
  }, []);

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
    console.log('cart', cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    history.push("/cart");
  }

  const addToCart = () => {
    let id = param['id'];
    console.log('addToCart', id);
    axios.get(`/product/${id}`).then((dist) => {
      console.log('CART', dist?.data?.data);
      if (dist?.data?.data?.count > 0 && dist?.data?.data?.status === "available") {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
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

  return (
    <>
      <Header />
      <Cart />

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
      <section class="sec-product-detail bg0 p-t-65 p-b-60">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-lg-7 p-b-30">
					<div class="blog-item">
						<div class="hov-img0">
							<img src="poto/a1.jpg" alt="IMG-BLOG" class="img-fluid rounded text-center"/>
						</div>
					</div>
				</div>
					
				<div class="col-md-6 col-lg-5 p-b-30">
					<div class="p-r-50 p-t-5 p-lr-0-lg">
						<h4 class="mtext-105 cl2 js-name-detail p-b-14">
							Item One
						</h4>

						<span class="mtext-106 cl2">
							$58.79
						</span>
						
						<div class="p-t-33">
							<div class="flex-w flex-r-m p-b-10">
								<div class="size-205 flex-l-m stext-301">
									Artista Name
								</div>

                <p class="stext-102 cl3 p-t-23">
                  {product?.description}
                </p>

							<div class="flex-w flex-l-m p-b-10">
								<div class="size-205 flex-c-m stext-301">
									Category
								</div>

								<div class="size-206 stext-110">
									Category One
								</div>
							</div>

							<div class="flex-w flex-l-m p-b-10">
								<div class="size-205 flex-c-m stext-301">
									Status
								</div>
								<div class="size-206 stext-110">
									Available
								</div>
							</div>
							<hr/>
							<div class="flex-w flex-r-m p-b-10">
								<div class="size-204 flex-w flex-m respon6-next">
									<button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
										Add to cart
									</button>
								</div>
							</div>	
						</div>

						<div class="flex-w flex-m p-l-100 p-t-40 respon7">
							<div class="flex-m bor9 p-r-10 m-r-11">
								<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100" data-tooltip="Add to Wishlist">
									<i class="zmdi zmdi-favorite"></i>
								</a>
							</div>

							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Facebook">
								<i class="fa fa-facebook"></i>
							</a>

                    <div class="size-206 respon6-next stext-110">
                      {product?.status === "available" ? "Available" : "Not Available"}
                    </div>
                  </div>
                  <hr />
                  <div class="flex-w flex-r-m p-b-10">
                    <div class="size-204 flex-w flex-m respon6-next">
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

							<a href="#" class="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100" data-tooltip="Google Plus">
								<i class="fa fa-google-plus"></i>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="bor10 m-t-50 p-t-43 p-b-40">
				<div class="tab01">
					<ul class="nav nav-tabs" role="tablist">
						<li class="nav-item p-b-10">
							<a class="nav-link active" data-toggle="tab" href="#description" role="tab">Description</a>
						</li>

						<li class="nav-item p-b-10">
							<a class="nav-link" data-toggle="tab" href="#information" role="tab">Additional information</a>
						</li>

						<li class="nav-item p-b-10">
							<a class="nav-link" data-toggle="tab" href="#reviews" role="tab">Reviews (1)</a>
						</li>
					</ul>

					<div class="tab-content p-t-43">
						<div class="tab-pane fade show active" id="description" role="tabpanel">
							<div class="how-pos2 p-lr-15-md">
								<p class="stext-102 cl6">
									Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
								</p>
							</div>
						</div>

						<div class="tab-pane fade" id="information" role="tabpanel">
							<div class="row">
								<div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
									<ul class="p-lr-28 p-lr-15-sm">
										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Date Of Art
											</span>

											<span class="stext-102 cl6 size-206">
												11-03-2021
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Dimensions
											</span>

											<span class="stext-102 cl6 size-206">
												110 x 33 x 100 cm
											</span>
										</li>

										<li class="flex-w flex-t p-b-7">
											<span class="stext-102 cl3 size-205">
												Art Idea
											</span>

											<span class="stext-102 cl6 size-206">
												Personal
											</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="tab-pane fade" id="reviews" role="tabpanel">
							<div class="row">
								<div class="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
									<div class="p-b-30 m-lr-15-sm">
										<div class="flex-w flex-t p-b-68">
											<div class="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
												<img src="poto/a6.jpg" alt="AVATAR"/>
											</div>

											<div class="size-207">
												<div class="flex-w flex-sb-m p-b-17">
													<span class="mtext-107 cl2 p-r-20">
														Oscar D. CHAVARRIA
													</span>

													<span class="fs-18 cl11">
														<i class="zmdi zmdi-star"></i>
														<i class="zmdi zmdi-star"></i>
														<i class="zmdi zmdi-star"></i>
														<i class="zmdi zmdi-star"></i>
														<i class="zmdi zmdi-star-half"></i>
													</span>
												</div>

												<p class="stext-102 cl6">
													Quod autem in homine praestantissimum atque optimum est, id deseruit. Apud ceteros autem philosophos
												</p>
											</div>
										</div>
										
										<form class="w-full">
											<h5 class="mtext-108 cl2 p-b-7">
												Add a review
											</h5>

											<p class="stext-102 cl6">
												Your email address will not be published. Required fields are marked *
											</p>

											<div class="flex-w flex-m p-t-50 p-b-23">
												<span class="stext-102 cl3 m-r-16">
													Your Rating
												</span>

												<span class="wrap-rating fs-18 cl11 pointer">
													<i class="item-rating pointer zmdi zmdi-star-outline"></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"></i>
													<i class="item-rating pointer zmdi zmdi-star-outline"></i>
													<input class="dis-none" type="number" name="rating"/>
												</span>
											</div>

											<div class="row p-b-25">
												<div class="col-12 p-b-5">
													<label class="stext-102 cl3" for="review">Your review</label>
													<textarea class="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10" id="review" name="review"></textarea>
												</div>

												<div class="col-sm-6 p-b-10 p-t-20">
													<div class="bor8 m-b-20 how-pos4-parent">
														<input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="name" name="yourname" placeholder="Your Name"/>
														<i class="zmdi zmdi-account how-pos4 pointer-none"></i>
													</div>
												</div>

												<div class="col-sm-6 p-b-10 p-t-20">
													<div class="bor8 m-b-20 how-pos4-parent">
														<input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="email" name="email" placeholder="Email"/>
														<i class="zmdi zmdi-email how-pos4 pointer-none"></i>
													</div>
												</div>
											</div>

											<button class="flex-c-m stext-101 cl0 size-112 bg1 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
												Submit
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	</section>

      {/* <!-- Related Products --> */}
      <section class="sec-relate-product bg0 p-t-20 p-b-105">
        <div class="container">
          <div class="p-b-45">
            <h3 class="ltext-106 cl5 txt-center">
              Related Products
            </h3>
          </div>

          {/* <!-- Slide2 --> */}
          <div class="wrap-slick2">
            <div class="slick2">
              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item One
                      </a>

                      <span class="stext-105 cl3">
                        $16.64
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Two
                      </a>

                      <span class="stext-105 cl3">
                        $35.31
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Three
                      </a>

                      <span class="stext-105 cl3">
                        $25.50
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Four
                      </a>

                      <span class="stext-105 cl3">
                        $75.00
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item One
                      </a>

                      <span class="stext-105 cl3">
                        $34.75
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Two
                      </a>

                      <span class="stext-105 cl3">
                        $93.20
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Three
                      </a>

                      <span class="stext-105 cl3">
                        $52.66
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

              <div class="item-slick2 p-l-15 p-r-15 p-t-15 p-b-15">
                {/* <!-- Block2 --> */}
                <div class="block2">
                  <div class="block2-pic hov-img0">
                    <img src="poto/j2.jpg" alt="IMG-PRODUCT" />

                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                      Quick View
                    </a>
                  </div>

                  <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l ">
                      <a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                        Item Four
                      </a>

                      <span class="stext-105 cl3">
                        $18.96
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

      {/* <!-- Modal1 --> */}
      <div class="wrap-modal1 js-modal1 p-t-60 p-b-20">
        <div class="overlay-modal1 js-hide-modal1"></div>

        <div class="container">
          <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
            <button class="how-pos3 hov3 trans-04 js-hide-modal1">
              <img src="images/icons/icon-close.png" alt="CLOSE" />
            </button>
            <div class="row">
              <div class="col-md-6 col-lg-7 p-b-30 flex-c-m">
                <img src="poto/j2.jpg" alt="IMG-BLOG" class="img-fluid rounded" style={{width: "300px"}} />
              </div>

              <div class="col-md-6 col-lg-5 p-b-30">
                <div class="p-r-50 p-t-5 p-lr-0-lg">
                  <h4 class="mtext-105 cl2 js-name-detail p-b-14">
                    Item One
                  </h4>

                  <span class="mtext-106 cl2">
                    $58.79
                  </span>

                  <p class="stext-102 cl3 p-t-23">
                    Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.
                  </p>


                  <div class="p-t-33">
                    <div class="flex-w flex-r-m p-b-10">
                      <div class="size-205 flex-l-m respon6 stext-301">
                        Artista Name
                      </div>

                      <div class="size-206 respon6-next stext-110">
                        Item One
                      </div>
                    </div>

                    <div class="flex-w flex-l-m p-b-10">
                      <div class="size-205 flex-c-m respon6 stext-301">
                        Category
                      </div>

                      <div class="size-206 respon6-next stext-110">
                        Category One
                      </div>
                    </div>

                    <div class="flex-w flex-l-m p-b-10">
                      <div class="size-205 flex-c-m respon6 stext-301">
                        Status
                      </div>

                      <div class="size-206 respon6-next stext-110">
                        Available
                      </div>
                    </div>
                    <hr />
                    <div class="flex-w flex-r-m p-b-10">
                      <div class="size-204 flex-w flex-m respon6-next">
                        <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="flex-w flex-m p-l-100 p-t-40 respon7">
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
        </div>
      </div>
    </>
  )
}

export default ProductDetailPage;
import React from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';

const ProductPage = () => {
  const [activeProduct, setActiveProduct] = React.useState("all");
  const [categoryList, setCategoryList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginateCount, setPaginateCount] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState(null);
  const searchName = React.createRef();

  React.useEffect(() => {
    getCategoryList();
    getProductList();
  }, []);

  /**
   * get category list.
   * @param {*} offsetData 
   */
  const getCategoryList = (offsetData = 0) => {
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchName.current?.value) {
      params.name = searchName.current.value
    }
    axios.get("/category", {
      params
    }).then((dist) => {
      setCategoryList(dist?.data?.data);
    }).catch((err) => {
      console.log('Get Category API error', err);
      swal("Oops!", "Get Category API error", "error");
    });
  }

  /**
   * get product with category list.
   * @param {*} catId 
   * @param {*} offsetData 
   */
  const getProductWithCategoryList = (catId, offsetData = 0) => {
    setActiveProduct(catId);
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchName.current?.value) {
      params.name = searchName.current.value
    }
    axios.get(`/product/category/${catId}`, {
      params
    }).then((dist) => {
      setProductList(dist?.data?.data);
    }).catch((err) => {
      console.log('Get Category API error', err);
      swal("Oops!", "Get Category API error", "error");
    });
  }

  /**
   * get product list.
   * @param {*} offsetData 
   */
  const getProductList = (offsetData = 0) => {
    setActiveProduct("all");
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchName.current?.value) {
      params.name = searchName.current.value
    }
    axios.get("/product", {
      params
    }).then((dist) => {
      setProductList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / 5;
      const count = [];
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
      }
      setPaginateCount(count);
    }).catch((err) => {
      swal("Oops!", "Product List Page API Error", "error");
    });
  }

  /**
   * paginate click.
   * @param {*} status 
   * @param {*} index 
   */
  const paginateClick = (status = null, index = 0) => {
    if (status === "next") {
      getProductList(offset + 1);
    } else if (status === "prev") {
      getProductList(offset - 1);
    } else {
      getProductList(index - 1);
    }
  };

  return (
    <>
      <Header />
      <Cart />

      {/* <!-- Product --> */}
      <div class="bg0 m-t-23 p-b-100">
        <div class="container">
          <div class="flex-w flex-sb-m p-b-52">
            <div class="flex-w flex-l-m filter-tope-group m-tb-10">
              <button className={activeProduct === "all" ?
                "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" : "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"}
                data-filter="*" onClick={() => getProductList()}>
                All Items
              </button>

              {categoryList.map((data) => {
                return (
                  <button className={activeProduct === data._id ?
                  "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" : "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"} data-filter=".women" onClick={() => getProductWithCategoryList(data._id)}>
                    {data.name}
                  </button>
                )
              })
              }
            </div>

            <div class="flex-w flex-c-m m-tb-10">
              <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Filter
              </div>

              <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search">
                <i class="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                <i class="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Search
              </div>
            </div>

            {/* <!-- Search product --> */}
            <div class="dis-none panel-search w-full p-t-10 p-b-15">
              <div class="bor8 dis-flex p-l-15">
                <button class="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i class="zmdi zmdi-search"></i>
                </button>

                <input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search" />
              </div>
            </div>

            {/* <!-- Filter --> */}
            <div class="dis-none panel-filter w-full p-t-10">
              <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                <div class="filter-col1 p-r-15 p-b-27">
                  <div class="mtext-102 cl2 p-b-15">
                    Sort By
                  </div>

                  <ul>
                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Default
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Popularity
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Average rating
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04 filter-link-active">
                        Newness
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Price: Low to High
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="filter-col2 p-r-15 p-b-27">
                  <div class="mtext-102 cl2 p-b-15">
                    Price
                  </div>

                  <ul>
                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04 filter-link-active">
                        All
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        $0.00 - $50.00
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        $50.00 - $100.00
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        $100.00 - $150.00
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        $150.00 - $200.00
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        $200.00+
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="filter-col3 p-r-15 p-b-27">
                  <div class="mtext-102 cl2 p-b-15">
                    Categories
                  </div>

                  <ul>
                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04 filter-link-active">
                        All
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Art One
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Art Two
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Art Three
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Art Four
                      </a>
                    </li>

                    <li class="p-b-6">
                      <a href="#" class="filter-link stext-106 trans-04">
                        Art Five
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="filter-col4 p-b-27">
                  <div class="mtext-102 cl2 p-b-15">
                    Tags
                  </div>

                  <div class="flex-w p-t-4 m-r--5">
                    <a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                      Item One
                    </a>

                    <a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                      Item Two
                    </a>

                    <a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                      Item Three
                    </a>

                    <a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                      Item Four
                    </a>

                    <a href="#" class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5">
                      Item Five
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row isotope-grid">
            {productList.map((data, index) => {
              return (
                <>
                  <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* <!-- Block2 --> */}
                    <div class="block2">
                      <div class="block2-pic hov-img0">
                        <img src={imageURL + data.image} alt="IMG-PRODUCT" />

                        <Link to={`/product/${data._id}`} target="_blank" class="block2-btn flex-c-m stext-102 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                          {data.name}
                        </Link>
                      </div>

                      <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                          <p class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">{data.name}</p>
                          <span class="stext-105 cl3">
                            {data.price}
                          </span>
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                          <i class="zmdi zmdi-check-circle dis-block trans-04 zmdi-hc-lg text-primary"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
            }

          </div>

          {/* <!-- Pagination --> */}

          <div class="flex-w w-full p-t-10 m-lr--7 flex-c-m">
            <a className={Number(offset) === 0 ? "flex-c-m how-pagination1 trans-04 m-all-7 disabled" : "flex-c-m how-pagination1 trans-04 m-all-7"}
             onClick={() => paginateClick("prev")}>
              <i class="fa fa-long-arrow-left"></i>
            </a>

            {paginateCount?.map((dist) => {
              return (
                <>
                  <li className={Number(dist - 1) === Number(offset) ? "flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1" : "flex-c-m how-pagination1 trans-04 m-all-7"}
                  onClick={() => paginateClick(null, dist)}>
                    <a class="page-link">{dist}</a></li>
                </>
              )
            })}

            <a
              className={totalCount <= ((Number(offset) + 1) * 5) ? "flex-c-m how-pagination1 trans-04 m-all-7 disabled" : "flex-c-m how-pagination1 trans-04 m-all-7"}
              onClick={() => paginateClick("next")}>
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>

        </div>
      </div>

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

export default ProductPage;
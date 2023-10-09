import React from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';
import OscarPagination from '../../components/OscarPagination/OscarPagination';
import { imageURL } from '../../utils/constants/constant';
import { useCategory } from "../../store/actions/category.action";
import styles from './ProductPage.module.scss';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductPage = () => {
  const category = useCategory();
  let query = useQuery();
  const paginateSize = 8;
  const [loading, setLoading] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("all");
  // const [categoryList, setCategoryList] = React.useState([]);
  const [productList, setProductList] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [paginationData, setPaginationData] = React.useState({
    from: 1,
    last_page: 1,
    per_page: 1
  })
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginateCount, setPaginateCount] = React.useState([]);
  const searchName = React.createRef();

  React.useEffect(() => {
    // getCategoryList();
    const catId = query.get("catId");
    if (catId) {
      getProductWithCategoryList(catId);
    } else {
      getProductList();
    }
  }, []);

  /**
   * get category list.
   */
  // const getCategoryList = () => {
    
  // }

  const goProductWithCategoryList = (catId=null) => {
    let searchNameData = query.get("page") ? "&page=" + query.get("page") : "";
    searchNameData += query.get("searchName") ? "searchName=" + query.get("searchName") : "";
    if (catId) {
      window.location.href = "/shop?catId=" + catId + "&" + searchNameData;
    } else {
      window.location.href = "/shop?" + searchNameData;
    }
  }

  /**
   * get product with category list.
   * @param {*} catId 
   * @param {*} offsetData 
   */
  const getProductWithCategoryList = (catId, offsetData = 0) => {
    setActiveCategory(catId);
    offsetData = Number(query.get("page")) || 0;
    offsetData = offsetData > 0 ? offsetData - 1 : offsetData;
    let searchNameData = query.get("searchName") || searchName.current.value;
    searchName.current.value = searchNameData;
    let params = {
      size: paginateSize,
      page: Number(offsetData)
    };
    if (searchNameData) {
      params.name = searchNameData
    }
    setLoading(true);
    axios.get(`/product/category/${catId}`, {
      params
    }).then((dist) => {
      setLoading(false);
      setProductList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / paginateSize;
      const count = [];
      let lastPage = 0;
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
        lastPage = i + 1;
      }
      setPaginateCount(count);
      setLoading(false);
      let prePaginationData = {
        from: dist?.data?.offset,
        last_page: lastPage,
        per_page: paginateSize
      }
      setPaginationData({ ...prePaginationData });
    }).catch((err) => {
      setLoading(false);
      console.log('Get Category API error', err);
      swal("Oops!", "Get Category API error", "error");
    });
  }

  /**
   * get product list.
   * @param {*} offsetData 
   */
  const getProductList = (offsetData = 0) => {
    setActiveCategory("all");
    offsetData = Number(query.get("page")) || 0;
    offsetData = offsetData > 0 ? offsetData - 1 : offsetData;
    let searchNameData = query.get("searchName") || searchName.current.value;
    searchName.current.value = searchNameData;
    let params = {
      size: paginateSize,
      page: Number(offsetData)
    };
    if (searchNameData) {
      params.name = searchNameData
    }
    setLoading(true);
    axios.get("/product", {
      params
    }).then((dist) => {
      setLoading(false);
      setProductList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / paginateSize;
      const count = [];
      let lastPage = 0;
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
        lastPage = i + 1;
      }
      setPaginateCount(count);
      setLoading(false);
      let prePaginationData = {
        from: dist?.data?.offset,
        last_page: lastPage,
        per_page: paginateSize
      }
      setPaginationData({ ...prePaginationData });
    }).catch((err) => {
      swal("Oops!", "Product List Page API Error", "error");
      setLoading(false);
    });
  }

  /**
   * paginate click.
   * @param {*} status 
   * @param {*} index 
   */
  // const paginateClick = (status = null, index = 0) => {
  //   if (status === "next") {
  //     getProductList(offset + 1);
  //   } else if (status === "prev") {
  //     getProductList(offset - 1);
  //   } else {
  //     getProductList(index - 1);
  //   }
  // };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      const value = e.target.value;
      const catId = query.get("catId");
      if (catId) {
        let searchNameData = query.get("page") ? "&page=" + query.get("page") : "";
        searchNameData += query.get("searchName") ? "&searchName=" + query.get("searchName") : "";
        window.location.href = "/shop?catId=" + catId + "&searchName=" + value;
      } else {
        window.location.href = "/shop?searchName=" + value;
      }
      // const params = {
      //   size: 5,
      //   page: 0,
      //   name: value
      // };
      // let apiUrl = `/product`;
      // if (activeCategory !== "all") {
      //   apiUrl = `/product/category/${activeCategory}`;
      // }
      // axios.get(apiUrl, {
      //   params
      // }).then((dist) => {
      //   setLoading(false);
      //   setProductList(dist?.data?.data);
      //   setOffset(dist?.data?.offset);
      //   setTotalCount(dist?.data?.count);
      //   const page = dist?.data?.count / 5;
      //   const count = [];
      //   for (let i = 0; i < page; i++) {
      //     count.push(i + 1);
      //   }
      //   setPaginateCount(count);
      // }).catch((err) => {
      //   swal("Oops!", err.toString(), "error");
      //   setLoading(false);
      // });
    }
  }

  const showSearch = () => {
    $(this).toggleClass('show-search');
    $('.panel-search').slideToggle(400);

    if ($('.js-show-filter').hasClass('show-filter')) {
      $('.js-show-filter').removeClass('show-filter');
      $('.panel-filter').slideUp(400);
    }
  }

  const showFilter = () => {
    $(this).toggleClass('show-filter');
    $('.panel-filter').slideToggle(400);

    if ($('.js-show-search').hasClass('show-search')) {
      $('.js-show-search').removeClass('show-search');
      $('.panel-search').slideUp(400);
    }
  }

  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner text="Logging in..." />}

      {/* <!-- Product --> */}
      <div class="bg0 m-t-23 p-b-100">
        <div class="container">
          <div class="flex-w flex-sb-m p-b-52">
            {/* <!-- All Product --> */}
            <div class="flex-w flex-c-m m-tb-10">
              <div class="flex-c-m stext-106 cl6 size-102 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter"
                onClick={showFilter}>
                <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                Category
              </div>
            </div>
            {/* <!-- Search --> */}
            <div class="flex-w flex-c-m m-tb-10">
              <div class="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search" onClick={showSearch}>
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

                <input class="mtext-107 cl2 size-114 plh2 p-r-15" type="text" name="search-product" placeholder="Search"
                  ref={searchName} onKeyDown={handleSearchKeyDown} />
              </div>
            </div>

            {/* <!-- Category List --> */}
            <div class="dis-none panel-filter w-full p-t-10">
              <div class="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm p-b-27 overflow-divy">
                <div class="mtext-102 cl2 p-b-15">
                  Choose Your Category
                </div>
                <div class="flex-w p-t-4 m-r--5" style={{ width: "100%" }}>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => goProductWithCategoryList()} class="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10"
                    className={activeCategory === "all" ? `flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10 ${styles.active}`
                            : "flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10"}>
                    All
                  </a>
                  {category?.map((dist) => {
                    return (
                      <>
                        <a onClick={() => goProductWithCategoryList(dist._id)}
                          style={{ cursor: "pointer" }}
                          className={activeCategory === dist._id ? `flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10 ${styles.active}`
                            : "flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-10 m-b-10"}>
                          {dist.name}
                        </a>
                      </>
                    )
                  })}

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
                        <img src={imageURL + data.image} alt="IMG-PRODUCT" class="img-fluid respon1 img-size oscar-item-size" />

                        <Link to={`/product/${data._id}`} target="_blank" class="block2-btn flex-c-m stext-102 cl2 size-104 bg0 bor2 hov-btn1 p-lr-15 trans-04 ">
                          Detail
                        </Link>
                      </div>

                      <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l ">
                          <p class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">{data.name}</p>
                          <span class="stext-105 cl3">
                            ${data.price}
                          </span>
                        </div>

                        <div class="block2-txt-child2 flex-r p-t-3">
                          {data.status === 'available' && data?.count > 0 ?
                            <i class="zmdi zmdi-check-circle dis-block trans-04 zmdi-hc-lg text-primary"></i>
                            :
                            <i class="zmdi zmdi-minus-circle dis-block trans-04 zmdi-hc-lg text-danger"></i>
                          }
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

          {/* <div class="flex-w w-full p-t-10 m-lr--7 flex-c-m">
            <a className={Number(offset) === 0 ? "flex-c-m how-pagination1 trans-04 m-all-7 disabled" : "flex-c-m how-pagination1 trans-04 m-all-7"}
              onClick={() => paginateClick("prev")}>
              <i class="fa fa-long-arrow-left"></i>
            </a>

            {paginateCount?.map((dist) => {
              return (
                <>
                  <a className={Number(dist - 1) === Number(offset) ? "flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1" : "flex-c-m how-pagination1 trans-04 m-all-7"}
                    onClick={() => paginateClick(null, dist)}>{dist}</a>
                </>
              )
            })}

            <a
              className={totalCount <= ((Number(offset) + 1) * 5) ? "flex-c-m how-pagination1 trans-04 m-all-7 disabled" : "flex-c-m how-pagination1 trans-04 m-all-7"}
              onClick={() => paginateClick("next")}>
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div> */}

          <OscarPagination
            paginateUrl="/shop?page="
            metadata={paginationData}
            fetchData={getProductList}
            size="8"
          />

        </div>
      </div>


    </>
  )
}

export default ProductPage;
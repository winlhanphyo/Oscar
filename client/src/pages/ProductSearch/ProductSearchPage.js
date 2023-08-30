import React from 'react';
import swal from 'sweetalert';
import { Link, useLocation } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';
import styles from "./ProductSearchPage.module.scss";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProductSearchPage = () => {
  let query = useQuery();
  const [itemName, setItemName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginateCount, setPaginateCount] = React.useState([]);

  React.useEffect(() => {
    console.log("Search name", query.get("searchName"));
    const name = query.get("searchName");
    setItemName(name);
    getProductList(0, name);
  }, []);

  /**
   * get product list.
   * @param {*} offsetData 
   */
  const getProductList = (offsetData = 0, searchName=null) => {
    setLoading(true);
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchName) {
      params.name = searchName
    }
    axios.get("/product", {
      params
    }).then((dist) => {
      setLoading(false);
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
      setLoading(false);
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

      {loading && <LoadingSpinner text="Logging in..." />}

      {/* <!-- Product --> */}
      <div class="bg0 m-t-23 p-b-100">
        <div class="container">

          <div className={styles.searchName}><span>{itemName}</span> List of Items</div>

          <div class="row isotope-grid">
            {productList.map((data, index) => {
              return (
                <>
                  <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
                    {/* <!-- Block2 --> */}
                    <div class="block2">
                      <div class="block2-pic hov-img0">
                        <img src={imageURL + data.image} alt="IMG-PRODUCT" class="img-fluid img-size respon1" />

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
    </>
  )
}

export default ProductSearchPage;
import React from 'react';
import $ from "jquery";
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useCategory } from "../../store/actions/category.action";
import axios from '../../axios/index';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Footer = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const category = useCategory();

  const backToTop = () => {
    $('html, body').animate({ scrollTop: 0 }, 300);
  }

  React.useEffect(() => {
    getCategoryList();
  }, []);

  /**
   * get category list.
   */
  const getCategoryList = () => {
    axios.get("/category").then((dist) => {
      console.log('dist?.data?.data', dist?.data?.data);
      // setCategoryList(dist?.data?.data);
      dispatch({
        type: "ADD_CATEGORY",
        payload: {
          categories: dist?.data?.data
        }
      });
    }).catch((err) => {
      console.log('Get Category API error', err);
      swal("Oops!", "Get Category API error", "error");
    });
  }

  /**
   * go to product page.
   * @param {*} catId 
   */
  const goProductWithCategoryList = (catId = null) => {
    let searchNameData = query.get("page") ? "&page=" + query.get("page") : "";
    searchNameData += query.get("searchName") ? "searchName=" + query.get("searchName") : "";
    if (catId) {
      window.location.href = "/shop?catId=" + catId + "&" + searchNameData;
    } else {
      window.location.href = "/shop?" + searchNameData;
    }
  }

  return (
    <>
      {/* <!-- Footer --> */}
      <footer class="bg3 p-t-75 p-b-32">
        <div class="container">
          <div class="row">
            {/* <!-- Col --> */}
            {window.location.href.indexOf("/about") === -1 &&
            <div class="col-sm-12 col-md-12 col-lg-12 p-b-50">
              <h4 class="p-b-15 text-center ltext-108 text-white">
                "quis nostrud exerci tation ullamcorper suscipit<br />
                lobortis nisl ut aliquip ex ea commodo conse-"
              </h4>
            </div>
            }
            <div class="col-sm-12 col-md-12 col-lg-12 bor3 ">
              <div class="flex-l-m flex-w w-full" data-appear="fadeInDown" data-delay="0">
                <h2 class="p-b-15 ltext-108 text-white">
                  OSCAR<span class="text-muted">DANILO</span><br />
                  CHAVARRIA<span class="text-muted">GOMEZ</span>
                </h2>
              </div>
            </div>
            <div class="col-sm-6 col-lg-3 p-b-50">
              <h4 class="stext-301 cl0 p-b-30">
                Categories
              </h4>

              <ul>
                {category.map((data) => {
                  return (
                    <li class="p-b-10">
                      <a onClick={() => goProductWithCategoryList(data._id)} class="stext-107 cl7 hov-cl1 trans-04">
                        {data.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div class="col-sm-6 col-lg-3 p-b-50">
              <h4 class="stext-301 cl0 p-b-30">
                Useful Links
              </h4>

              <ul>
                <li class="p-b-10">
                  <Link to="/home" class="stext-107 cl7 hov-cl1 trans-04">
                    Home
                  </Link>
                </li>

                <li class="p-b-10">
                  <Link to="shop" class="stext-107 cl7 hov-cl1 trans-04">
                    Shop
                  </Link>
                </li>

                <li class="p-b-10">
                  <Link to="/about" class="stext-107 cl7 hov-cl1 trans-04">
                    About
                  </Link>
                </li>

                <li class="p-b-10">
                  <Link to="/contact" class="stext-107 cl7 hov-cl1 trans-04">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div class="col-sm-6 col-lg-3 p-b-50">
              <h4 class="stext-301 cl0 p-b-30">
                GET IN TOUCH
              </h4>

              <p class="stext-107 cl7 size-201">
                Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
              </p>

              <div class="p-t-27">
                <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i class="fa fa-facebook"></i>
                </a>

                <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i class="fa fa-instagram"></i>
                </a>

                <a href="#" class="fs-18 cl7 hov-cl1 trans-04 m-r-16">
                  <i class="fa fa-pinterest-p"></i>
                </a>
              </div>
            </div>

            <div class="col-sm-6 col-lg-3 p-b-50">
              <h4 class="stext-301 cl0 p-b-30">
                Email
              </h4>

              <form>
                <div class="wrap-input1 w-full p-b-4">
                  {/* <input class="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="support@oscar-admin.orionmmtecheng.com" />
                  <div class="focus-input1 trans-04"></div> */}
                  <label>support@oscar-admin.orionmmtecheng.com</label>

                </div>

                {/* <div class="p-t-18">
                  <button class="flex-c-m stext-101 cl0 size-102 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                    Subscribe
                  </button>
                </div> */}
              </form>
            </div>
          </div>

          <div class="p-t-40">
            <div class="flex-c-m flex-w p-b-18">
              <span class="m-all-1">
                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
              </span>

              <span class="m-all-1">
                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
              </span>

              <span class="m-all-1">
                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
              </span>

              <span class="m-all-1">
                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
              </span>

              <span class="m-all-1">
                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
              </span>
            </div>

            <p class="stext-107 cl6 txt-center">
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">OSCAR D.CHAVARRIA</a>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}

            </p>
          </div>
        </div>
      </footer>

      {/* <!-- Back to top --> */}
      <div class="btn-back-to-top" id="myBtn" onClick={backToTop}>
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default Footer;
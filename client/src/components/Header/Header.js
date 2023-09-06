import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import $ from "jquery";
import styles from './Header.module.scss';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Header = () => {
  let query = useQuery();
  const searchName = React.useRef();
  const history = useHistory();
  const storageData = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = React.useState(0);


  React.useEffect(() => {
    try {
      const currentUrl = window.location.href;
      if (currentUrl.indexOf("/shop/search") !== -1) {
        let searchNameData = query.get("searchName") || searchName.current.value;
        searchName.current.value = searchNameData;
      }
      let cart = localStorage.getItem("cart") || null;
      if (cart) {
        cart = JSON.parse(cart);
        setCartCount(cart?.length || 0);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const searchModal = (e) => {
    e.preventDefault();
    $('.modal-search-header').addClass('show-modal-search');
    $(this).css('opacity','0');
  }

  const hideModalSearch = (e) => {
    e.preventDefault();
    $('.modal-search-header').removeClass('show-modal-search');
    $('.js-show-modal-search').css('opacity','1');
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      history.push({
        pathname: '/shop/search',
        search: `?searchName=${value}`
      });
    }
  }

  const showMenu = () => {
    $(this).toggleClass('is-active');
    $('.menu-mobile').slideToggle();
  }

  return (
    <>
      <header class="header-v2">
        {/* <!-- Header desktop --> */}
        <div class="container-menu-desktop trans-03">
          <div class="wrap-menu-desktop">
            <nav class="limiter-menu-desktop p-l-45">

              {/* <!-- Logo desktop -->		 */}
              <Link to="/home">
                <p class="mtext-103 cl2">
                  OSCAR D.CHAVARRIA
                </p>
              </Link>

              {/* <!-- Menu desktop --> */}
              <div class="menu-desktop">
                <ul class="main-menu">
                  <li className={window.location.href.indexOf("home") !== -1 ? "active-menu" : ""}>
                    <Link to="/home">Home</Link>
                    {/* <ul class="sub-menu">
									<li><a href="index1.html">Artista One</a></li>
									<li><a href="index2.html">Artista Two</a></li>
									<li><a href="index3.html">Artista Three</a></li>
								</ul> */}
                  </li>
                  <li className={window.location.href.indexOf("shop") !== -1 ? "active-menu" : ""}>
                    <Link to="/shop">Shop </Link>
                    {/* <ul class="sub-menu">
									<li><a href="product.html">Item One</a></li>
									<li><a href="product.html">Item Two</a></li>
									<li><a href="product.html">Item Three</a></li>
								</ul> */}
                  </li>
                  <li className={window.location.href.indexOf("about") !== -1 ? "active-menu" : ""}>
                    <Link to="/about">About</Link>
                  </li>

                  <li className={window.location.href.indexOf("artist") !== -1 ? "active-menu" : ""}>
                    <Link to="/artist">Artist</Link>
                  </li>

                  <li className={window.location.href.indexOf("contact") !== -1 ? "active-menu" : ""}>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>

              {/* <!-- Icon header --> */}
              <div class="wrap-icon-header flex-w flex-r-m h-full">
                <div class="flex-c-m h-full p-r-24">
                  <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search" onClick={searchModal}>
                    <i class="zmdi zmdi-search"></i>
                  </div>
                </div>

                <div class="flex-c-m h-full p-l-18 p-r-25 bor5">
                  <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify={cartCount}>
                    <Link to="/cart"><i class="zmdi zmdi-shopping-cart text-dark"></i></Link>
                  </div>
                </div>
                <div class="flex-c-m h-full p-l-18 p-r-25">
                  <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11">
                    <Link to="/login"><i class="zmdi zmdi-account-o text-dark"></i></Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* <!-- Header Mobile --> */}
        <div class="wrap-header-mobile">
          {/* <!-- Logo moblie -->		 */}
          <div class="logo-mobile">
            <a href="index.html">
              <p class="mtext-103 cl2">
                OSCAR D.CHAVARRIA
              </p>
            </a>
          </div>

          {/* <!-- Icon header --> */}
          <div class="wrap-icon-header flex-w flex-r-m h-full m-r-15">
            <div class="flex-c-m h-full p-r-10">
            <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 js-show-modal-search" onClick={searchModal}>
              <i class="zmdi zmdi-search"></i>
            </div>
            </div>

            <div class="flex-c-m h-full p-lr-10 bor5">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11 icon-header-noti js-show-cart" data-notify={cartCount}>
              <Link to="/cart"><i class="zmdi zmdi-shopping-cart"></i></Link>
              </div>
            </div>

            {/* <div class="flex-c-m h-full p-lr-10 bor5">
              <div class="icon-header-item cl2 hov-cl1 trans-04 p-lr-11">
                <Link to="/login" alt="Login"><i class="zmdi zmdi-account-o text-dark"></i></Link>
              </div>
            </div> */}
          </div>

          {/* <!-- Button show menu --> */}
          <div class="btn-show-menu-mobile hamburger hamburger--squeeze" onClick={showMenu}>
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </div>
        </div>


        {/* <!-- Menu Mobile --> */}
        <div class="menu-mobile">
          <ul class="main-menu-m">
            <li>
              <Link to="/home">Home</Link>
              {/* <ul class="sub-menu-m">
                <li><a href="index1.html">Artista One</a></li>
                <li><a href="index2.html">Artista Two</a></li>
                <li><a href="index3.html">Artista Three</a></li>
              </ul> */}
              {/* <span class="arrow-main-menu-m">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </span> */}
            </li>
            <li>
              <Link to="/shop">Shop</Link>
              {/* <ul class="sub-menu-m">
                <li><a href="product.html">Item One</a></li>
                <li><a href="product.html">Item Two</a></li>
                <li><a href="product.html">Item Three</a></li>
              </ul>
              <span class="arrow-main-menu-m">
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </span> */}
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/artist">Artist</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        {/* <!-- Modal Search --> */}
        <div className={`modal-search-header flex-c-m trans-04 js-hide-modal-search ${styles.modalSearch}`}>
          <div class="container-search-header">
            <button class="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search" onClick={hideModalSearch}>
              <img src="images/icons/icon-close2.png" alt="CLOSE" />
            </button>

            <form class="wrap-search-header flex-w p-l-15">
              <button class="flex-c-m trans-04">
                <i class="zmdi zmdi-search"></i>
              </button>
              <input class="plh3" type="text" name="search" placeholder="Search..." ref={searchName} onKeyDown={handleSearchKeyDown} />
            </form>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
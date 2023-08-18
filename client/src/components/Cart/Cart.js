const Cart = () => {
  return (
    <>
      <div class="wrap-header-cart js-panel-cart">
        <div class="s-full js-hide-cart"></div>

        <div class="header-cart flex-col-l p-l-65 p-r-25">
          <div class="header-cart-title flex-w flex-sb-m p-b-8">
            <span class="mtext-103 cl2">
              Your Cart
            </span>

            <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
              <i class="zmdi zmdi-close"></i>
            </div>
          </div>

          <div class="header-cart-content flex-w js-pscroll">
            <ul class="header-cart-wrapitem w-full">
              <li class="header-cart-item flex-w flex-t m-b-12">
                <div class="header-cart-item-img">
                  <img src="poto/a1.jpg" alt="IMG" class="img-thumbnail img-fluid" />
                </div>

                <div class="header-cart-item-txt p-t-8">
                  <a href="product-detail.html" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    Item One
                  </a>
                  <span class="header-cart-item-info">
                    1 x $36.00
                  </span>
                </div>
              </li>

              <li class="header-cart-item flex-w flex-t m-b-12">
                <div class="header-cart-item-img">
                  <img src="poto/a2.jpg" alt="IMG" class="img-thumbnail img-fluid" />
                </div>

                <div class="header-cart-item-txt p-t-8">
                  <a href="product-detail.html" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    Item Two
                  </a>

                  <span class="header-cart-item-info">
                    1 x $16.00
                  </span>
                </div>
              </li>

              <li class="header-cart-item flex-w flex-t m-b-12">
                <div class="header-cart-item-img">
                  <img src="poto/a3.jpg" alt="IMG" class="img-thumbnail img-fluid" />
                </div>

                <div class="header-cart-item-txt p-t-8">
                  <a href="product-detail.html" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                    Item Three
                  </a>

                  <span class="header-cart-item-info">
                    1 x $16.00
                  </span>
                </div>
              </li>
            </ul>

            <div class="w-full">
              <div class="header-cart-total size-119">
                Total: $78.00
              </div>
              <div class="header-cart-buttons flex-w flex-c-m">
                <a href="shoping-cart.html" class="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10">
                  View Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;
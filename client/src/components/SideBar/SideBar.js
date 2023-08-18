const SideBar = () => {
  return (
    <>
      <aside class="wrap-sidebar js-sidebar">
        <div class="s-full js-hide-sidebar"></div>

        <div class="sidebar flex-col-l p-t-22 p-b-25">
          <div class="flex-r w-full p-b-30 p-r-27">
            <div class="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-sidebar">
              <i class="zmdi zmdi-close"></i>
            </div>
          </div>

          <div class="sidebar-content flex-w w-full p-lr-65 js-pscroll">
            <ul class="sidebar-link w-full">
              <li class="p-b-13">
                <a href="index.html" class="stext-102 cl2 hov-cl1 trans-04">
                  Home
                </a>
              </li>

              <li class="p-b-13">
                <a href="#" class="stext-102 cl2 hov-cl1 trans-04">
                  My Wishlist
                </a>
              </li>

              <li class="p-b-13">
                <a href="#" class="stext-102 cl2 hov-cl1 trans-04">
                  My Account
                </a>
              </li>

              <li class="p-b-13">
                <a href="#" class="stext-102 cl2 hov-cl1 trans-04">
                  Track Oder
                </a>
              </li>

              <li class="p-b-13">
                <a href="#" class="stext-102 cl2 hov-cl1 trans-04">
                  Refunds
                </a>
              </li>

              <li class="p-b-13">
                <a href="#" class="stext-102 cl2 hov-cl1 trans-04">
                  Help & FAQs
                </a>
              </li>
            </ul>

            <div class="sidebar-gallery w-full p-tb-30">
              <span class="mtext-101 cl5">
                @ OSCAR D.CHAVARRIA
              </span>

              <div class="flex-w flex-sb p-t-36 gallery-lb">
                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>

                {/* <!-- item gallery sidebar --> */}
                <div class="wrap-item-gallery m-b-10">
                  <a class="item-gallery bg-img1" href="poto/j2.jpg" data-lightbox="gallery"
                    style="background-image: url('poto/j2.jpg');"></a>
                </div>
              </div>
            </div>

            <div class="sidebar-gallery w-full">
              <span class="mtext-101 cl5">
                About Us
              </span>

              <p class="stext-108 cl6 p-t-27">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vulputate hendrerit. Praesent faucibus erat vitae rutrum gravida. Vestibulum tempus mi enim, in molestie sem fermentum quis.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideBar;
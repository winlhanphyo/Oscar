import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { imageURL } from '../../utils/constants/constant';

const ShoppingCartPage = () => {
  const [windowSize, setWindowSize] = React.useState([
    {
      width: window.innerWidth,
      height: window.innerHeight
    }
  ]);
  const [cartData, setCartData] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    let cart = localStorage.getItem("cart") || null;
    if (cart) {
      cart = JSON.parse(cart);
      setCartData(cart);
      let total = 0;
      cart.map((data) => {
        total += Number(data.price) * Number(data.quantity);
      });
      setTotalAmount(total);
    }
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const removeProduct = (index) => {
    let preCartData = cartData;
    preCartData.splice(index, 1);
    setCartData([...preCartData]);
    localStorage.setItem("cart", preCartData);
  }

  const changeQuantity = (event, index) => {
    let value = (event?.target?.value) ? event.target.value : event;
    console.log('value', value, index);
    if (Number(value) > 0) {
      let preCartData = cartData;
      preCartData[index].quantity = value;
      setCartData([...preCartData]);
      localStorage.setItem("cart", JSON.stringify(preCartData));

      let total = 0;
      preCartData.map((data) => {
        total += Number(data.price) * Number(data.quantity);
      });
      setTotalAmount(total);
    }
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
          <span class="stext-109 cl4">
            Your Cart
          </span>
        </div>
      </div>

      {/* <!-- Shoping Cart --> */}
      <form class="bg0 p-t-75 p-b-85">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-xl-12 m-lr-auto m-b-50">
              <div class="m-l-25 m-r--38 m-lr-0-xl">
                <div class="wrap-table-shopping-cart">
                  <table class="table-shopping-cart">
                    <tr class="table_head">
                      <th class="column-1">Product</th>
                      <th class="column-2"></th>
                      <th class="column-3">Price</th>
                      <th class="column-4">Quantity</th>
                      <th class="column-5">Total</th>
                      <th class="column-3"></th>
                    </tr>

                    {
                      cartData?.length > 0 ?
                        cartData?.map((data, index) => {
                          return (<>
                            <tr key={index} class="table_row">
                              <td class="column-1">
                                <div class="how-itemcart1">
                                  <img src={imageURL + data?.image} alt="IMG" class="img-thumbnail img-fluid img-size-sm" />
                                </div>
                              </td>
                              <td class="column-2">{data?.name}</td>
                              <td class="column-3">$ {data?.price}</td>
                              <td class="column-4">
                                <div class="wrap-num-product flex-w m-l-auto m-r-0">
                                  <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m" onClick={() => changeQuantity(Number(cartData[index].quantity) - 1, index)}>
                                    <i class="fs-16 zmdi zmdi-minus"></i>
                                  </div>

                                  <input class="mtext-104 cl3 txt-center num-product" type="number" onChange={(e) => changeQuantity(e, index)} name="num-product1" value={data?.quantity} />

                                  <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m" onClick={() => changeQuantity(Number(cartData[index].quantity) + 1, index)}>
                                    <i class="fs-16 zmdi zmdi-plus"></i>
                                  </div>
                                </div>
                              </td>
                              <td class="column-5">$ {data?.price}</td>
                              <td class="column-3">
                                <button class="flex-c-m stext-101 cl0 size-104 bor2 hov-btn2 p-lr-15 hov-btn3 trans-04 text-danger" onClick={() => removeProduct(index)}>
                                  <i class="fa fa-trash fa-2x "></i>
                                </button>
                              </td>
                            </tr>
                          </>)
                        })
                        :
                        (
                          <>
                          <tr class="table_row">
                            <td class="column-1" colspan="6">
                              <div class="flex-w flex-c-m">
                                <div class="size-210 bor2 flex-c-m" style={{backgroundColor: "#D2E9E9"}}>
                                  <i class="zmdi zmdi-folder-outline zmdi zmdi-flower-alt zmdi-hc-3x"></i>
                                  <h4 class="p-l-15 mtext-103">Cart Data is Empty!</h4>
                                </div>
                              </div>
                            </td>
                          </tr>
                          </>
                        )}

                  </table>
                </div>
                <div class="flex-w flex-c-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  {cartData?.length > 0 && windowSize?.width <= 575 && <div class="flex-c-m mtext-101 cl2 size-119  m-lr-50 trans-04 m-tb-10"
                  style={windowSize.width <= 575 ? {margin: "20px"}: {}}>
                    Total Amount : $ {totalAmount}
                  </div>}
                  {cartData?.length > 0 &&
                    <Link to="/checkout" style={windowSize.width <= 575 ? {margin: "10px 0 10px 0"}: {}} class="flex-c-m stext-101 cl5 size-103 bg1 bor1 hov-btn1  m-lr-50 trans-04">CheckOut</Link>}
                  <Link to="/shop" class="flex-c-m stext-101 cl5 size-104 p-lr-15 trans-04 bor121" style={windowSize.width <= 575 ? {margin: "10px 0px 20px 0px"}: {}}>
                    Continue Shopping <i class="zmdi zmdi-long-arrow-right m-l-10"></i></Link>
                  {cartData?.length > 0 && windowSize?.width > 575 && <div class="flex-c-m mtext-101 cl2 size-119  m-lr-50 trans-04 m-tb-10">
                    Total Amount : $ {totalAmount}
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>


      <Footer />
    </>
  )
}

export default ShoppingCartPage;
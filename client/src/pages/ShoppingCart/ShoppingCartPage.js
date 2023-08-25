import React from 'react';
import { Link } from 'react-router-dom';
import { imageURL } from '../../utils/constants/constant';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const ShoppingCartPage = () => {
  const [cartData, setCartData] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(0);

  React.useEffect(() => {
    let cart = localStorage.getItem("cart");
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
                          <img src={imageURL + data?.image} alt="IMG" class="img-thumbnail img-fluid img-size-sm"/>
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
                        <div>
                          Cart Data is empty
                        </div>
                      )}

                  </table>
                </div>
                <div class="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  {cartData?.length > 0 && 
                  <Link to="/checkout" class="flex-c-m stext-101 cl5 size-103 bg1 bor1 hov-btn1 p-lr-15 trans-04">CheckOut</Link>}
                  <Link to="/shop" class="flex-c-m stext-101 cl5 size-104 p-lr-15 trans-04 bor121">Continue Shopping <i class="zmdi zmdi-long-arrow-right m-l-10"></i></Link>
                  {cartData?.length > 0 && <div class="flex-r-m mtext-101 cl2 size-119 p-lr-15 trans-04 m-tb-10">
                    Total Amount : $ {totalAmount}
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>


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

export default ShoppingCartPage;
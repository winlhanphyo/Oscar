import React from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { imageURL } from '../../utils/constants/constant';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';

const CheckoutPage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartData, setCartData] = React.useState(null);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [errorForm, setErrorForm] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    country: "Singapore",
    company: "",
    address: "",
    additonalInfo: "",
    city: "",
    postalCode: "",
    phone: ""
  });

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

  const validation = () => {
    const errorMsg = {
      firstName: "First Name is required",
      lastName: "Last Name is required",
      address: "Address is required",
      city: "City is required",
      postalCode: "Postal Code is required",
      phone: "Phone is required"
    };

    let preErrorForm = errorForm;
    let validate = true;
    Object.keys(errorMsg).map((dist) => {
      console.log('validate', formData[dist]);
      if (!formData[dist]) {
        preErrorForm[dist] = errorMsg[dist];
        validate = false;
      } else {
        preErrorForm[dist] = null;
      }
    });
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  /**
  * handle textbox change checkout page.
  */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    const preErrorForm = errorForm;
    preFormData[name] = value;
    setFormData({ ...preFormData });

    if (preFormData[name] && preErrorForm[name]) {
      preErrorForm[name] = null;
    }
    setErrorForm({
      ...preErrorForm
    });
  };

  const createCheckout = async (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      const user = JSON.parse(localStorage.getItem("user"));

      const orderDetail = [];
      cart.map((dist) => {
        const param = {
          "product": dist.id,
          "qty": dist.quantity,
          "amount": dist.price
        };
        orderDetail.push(param);
      });

      const param = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        phone: formData.phone,
        customer: user._id,
        status: "new",
        totalAmount,
        orderDetail,
        created_user_id: user._id
      };

      axios.post("/order", param).then(async (dist) => {
        console.log('response', dist);
        const stripe = await loadStripe("pk_test_51NfFraEGcRue3GUHmDGShja5f4ML32oLud8vLWGd2m6nEV8beUsUMb2UIGxwpgwun4BMWJEM41JzegaZHXTnEjzK00YRvykuo9");
        const result = stripe.redirectToCheckout({
          sessionId: dist.data.id,
        });

        if (result.error) {
          console.log(result.error);
        }
        //   swal("Success", "Order is created successfully", "success").then(() => {
        //   window.location.href = "/admin/product";
        // });
      }).catch((err) => {
        swal("Oops!", err.toString(), "error");
      })
    }
  };

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
            Proceed To Checkout
          </span>
        </div>
      </div>

      {/* <!-- Shoping Cart --> */}
      <form class="bg0 p-t-75 p-b-40">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 m-lr-auto m-b-50">
              <div class="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl p-lr-15-sm">
                <div class="flex-c-m flex-w p-b-18 bor12">
                  <a href="#" class="m-all-1">
                    <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px" />
                  </a>

                  <a href="#" class="m-all-1">
                    <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px" />
                  </a>

                  <a href="#" class="m-all-1">
                    <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" class="img-fluid img-thumbnail" width="60px" />
                  </a>
                </div>

                <div class="flex-w flex-t p-t-15 p-b-30">
                  {/* <h4 class="mtext-109 cl2 p-t-5">
                    Contact
                  </h4> */}

                  {/* <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="Name" placeholder="Email" value={formData.email} />
                    </div>
                  </div> */}
                  <div class="w-full">
                    <h4 class="mtext-109 cl2 p-b-5">
                      Shipping Address
                    </h4>

                    <div class="rs1-select2 rs2-select2 bor13 bg0 m-b-12 m-t-9">
                      <select class="js-select2" name="time">
                        <option selected>Singapore</option>
                        <option>Myanmar</option>
                      </select>
                      <div class="dropDownSelect2"></div>
                    </div>

                    <div class="row">
                      <div class="col-lg-6 col-xl-6">
                        <input
                          className={errorForm?.firstName ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"}
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange} />
                        {errorForm.firstName ? (
                          <div className="invalid-form">{errorForm.firstName}</div>) : ''}
                      </div>

                      <div class="col-lg-6 col-xl-6">
                        <input className={errorForm?.lastName ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5"}
                          type="text" name="lastName" placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange} />
                        {errorForm.lastName ? (
                          <div className="invalid-form">{errorForm.lastName}</div>) : ''}
                      </div>

                    </div>
                  </div>
                  <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input class="stext-111 cl8 plh3 size-111 p-lr-15 bor13" type="text" name="company" placeholder="Company"
                        value={formData.company}
                        onChange={handleChange} />
                    </div>
                  </div>

                  <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input
                        className={errorForm?.address ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-111 cl8 plh3 size-111 p-lr-15 bor13"}
                        type="text" name="address" placeholder="Address"
                        value={formData.address}
                        onChange={handleChange} />
                      {errorForm.address ? (
                        <div className="invalid-form">{errorForm.address}</div>) : ''}
                    </div>
                  </div>
                  <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input
                        className={errorForm?.city ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-111 cl8 plh3 size-111 p-lr-15 bor13"}
                        type="text" name="city" placeholder="City"
                        value={formData.city}
                        onChange={handleChange} />
                      {errorForm.city ? (
                        <div className="invalid-form">{errorForm.city}</div>) : ''}
                    </div>
                  </div>
                  <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input
                        className={errorForm?.postalCode ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-111 cl8 plh3 size-111 p-lr-15 bor13"}
                        type="number" name="postalCode" placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleChange} />
                      {errorForm.postalCode ? (
                        <div className="invalid-form">{errorForm.postalCode}</div>) : ''}
                    </div>
                  </div>
                  <div class="w-full p-t-5">
                    <div class=" bg0 m-b-12">
                      <input
                        className={errorForm?.phone ? "stext-111 cl8 plh3 size-111 p-lr-15 bor13 is-invalid" : "stext-111 cl8 plh3 size-111 p-lr-15 bor13"}
                        type="tel" name="phone" placeholder="Phone Number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}"
                        value={formData.phone}
                        onChange={handleChange} />
                      {errorForm.phone ? (
                        <div className="invalid-form">{errorForm.phone}</div>) : ''}
                    </div>
                  </div>
                </div>
                <button onClick={createCheckout} class="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer">
                  Proceed to Checkout
                </button>
              </div>
            </div>
            <div class="col-sm-12 col-lg-5 col-xl-5 m-lr-auto m-b-50">
              <div class="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl p-lr-15-sm bg10">
                {
                  cartData.map((data) => {
                    return (
                      <>
                        <div class="flex-w flex-t p-b-30">
                          <Link to={"/product/" + data.id} target="_blank" class="wrao-pic-w size-214 m-r-20">
                            <img src={imageURL + data.image} alt="PRODUCT" class="img-fluid img-thumbnail" />
                          </Link>
                          <div class="size-215 flex-col-t p-t-8">
                            <Link to={"/product/" + data.id} target="_blank" class="stext-116 cl8 hov-cl1 trans-04">
                              {data.name}
                            </Link>
                            <span class="stext-116 cl6 p-t-20">
                              Quantity : {data.quantity}
                            </span>
                            <span class="stext-116 cl6 p-t-20">
                              Price : $ {data.price}
                            </span>
                          </div>
                        </div>
                      </>
                    )
                  })
                }
                {/* <div class="flex-w flex-m m-r-20 m-tb-5 bor12 p-b-10">
                  <input class="stext-104 cl2 plh4 size-117 bor13 p-lr-20 m-r-10 m-tb-5" type="text" name="coupon" placeholder="Discount Code" />
                  <a onClick={createCheckout} class="flex-c-m stext-101 cl5 size-104 bg1 bor1 hov-btn1 p-lr-15 trans-04">
                    Apply
                  </a>
                </div> */}
                <div class="flex-w flex-m m-r-20 m-tb-5">
                  <div class="flex-l-m mtext-101 cl2 size-119 p-lr-15 trans-04 ">
                    Total
                  </div>
                  <div class="flex-r-m mtext-101 cl2 size-115 p-lr-15 trans-04">
                    $ {totalAmount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Footer />

      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default CheckoutPage;
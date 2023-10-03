import React from 'react';
import swal from 'sweetalert';
import axios from '../../axios/index';
import { Container, Navbar } from 'react-bootstrap';
import $ from "jquery";
import { useHistory, useLocation } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState({
    email: "",
    msg: ""
  });
  const [formData, setFormData] = React.useState({
    email: "",
    msg: ""
  });
  const history = useHistory();

  const validation = () => {
    const errorMsg = {
      email: "Email is required",
      msg: "Message is required"
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
    console.log('preErrorForm', preErrorForm);
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = validation();
    if (validate) {
      setLoading(true);
      axios.post("/contact", formData).then((dist) => {
        console.log("Created Product")
        setLoading(false);
        swal("Success", "Thank you for contact mail", "success").then(() => {
          history.push("/home");
        });
      }).catch((err) => {
        swal("Oops!", err.toString(), "error");
        setLoading(false);
      })
    }
  }

  /**
  * handle textbox change contact page.
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

  const backToTop = () => {
    $('html, body').animate({scrollTop: 0}, 300);
  }

  return (
    <>
      <footer class="bg3 p-t-75 p-b-32">
        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-lg-3 p-b-50">
            <form>
						<h4 class="mtext-105 cl2 txt-center p-b-30">
							Send Us A Message
						</h4>

                <div className={errorForm?.email ? "bor8 m-b-20 how-pos4-parent is-invalid" : "bor8 m-b-20 how-pos4-parent"}>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    name="email" onChange={handleChange} placeholder="Your Email Address" />
                  <i class="zmdi zmdi-email how-pos4 pointer-none"></i>
                </div>
                {errorForm.email ? (
                  <div class="invalid-form">{errorForm.email}</div>) : ''}

                <div className={errorForm?.msg ? "bor8 m-b-30 is-invalid" : "bor8 m-b-30"}>
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    name="msg" onChange={handleChange}
                    value={formData.msg} placeholder="How Can We Help?"></textarea>
                </div>
                {errorForm.msg ? (
                  <div class="invalid-form">{errorForm.msg}</div>) : ''}

                <button onClick={handleSubmit} class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Submit
                </button>
              </form>
            </div>

            {/* <div class="col-sm-6 col-lg-3 p-b-50">
              <h4 class="stext-301 cl0 p-b-30">
                Help
              </h4>

              <ul>
                <li class="p-b-10">
                  <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                    Track Order
                  </a>
                </li>

                <li class="p-b-10">
                  <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                    Returns
                  </a>
                </li>

                <li class="p-b-10">
                  <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                    Shipping
                  </a>
                </li>

                <li class="p-b-10">
                  <a href="#" class="stext-107 cl7 hov-cl1 trans-04">
                    FAQs
                  </a>
                </li>
              </ul>
            </div> */}

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
                  {/* <input class="input1 bg-none plh1 stext-107 cl7" type="text" name="email" placeholder="email@example.com" />
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
              <a href="#" class="m-all-1">
                <img src="images/icons/icon-pay-01.png" alt="ICON-PAY" />
              </a>

              <a href="#" class="m-all-1">
                <img src="images/icons/icon-pay-02.png" alt="ICON-PAY" />
              </a>

              <a href="#" class="m-all-1">
                <img src="images/icons/icon-pay-03.png" alt="ICON-PAY" />
              </a>

              <a href="#" class="m-all-1">
                <img src="images/icons/icon-pay-04.png" alt="ICON-PAY" />
              </a>

              <a href="#" class="m-all-1">
                <img src="images/icons/icon-pay-05.png" alt="ICON-PAY" />
              </a>
            </div>

            <p class="stext-107 cl6 txt-center">
              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="#" target="_blank">OSCAR D.CHAVARRIA</a>
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
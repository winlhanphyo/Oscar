import React from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';

const ContactPage = ({addCategory}) => {
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


  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner />}

      {/* <!-- Title page --> */}
      <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: "url('poto/a1.jpg')" }}>
        <h2 class="ltext-105 cl0 txt-center">
          Contact
        </h2>
      </section>

      {/* <!-- Content page --> */}
      <section class="bg0 p-t-104 p-b-116">
		<div class="container">
			<div class="flex-w flex-tr">
				<div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
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

				<div class="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
					<div class="flex-w w-full p-b-42">
						<span class="fs-18 cl5 txt-center size-211">
							<i class="zmdi zmdi-pin  zmdi-hc-lg"></i>
						</span>

						<div class="size-212 p-t-2">
							<span class="mtext-110 cl2">
								Address
							</span>

							<p class="stext-115 cl6 size-213 p-t-18">
								Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018 US
							</p>
						</div>
					</div>

					<div class="flex-w w-full p-b-42">
						<span class="fs-18 cl5 txt-center size-211">
							<i class="zmdi zmdi-phone  zmdi-hc-lg"></i>
						</span>

						<div class="size-212 p-t-2">
							<span class="mtext-110 cl2">
								Lets Talk
							</span>

							<p class="stext-115 cl1 size-213 p-t-18">
								+1 800 1236879
							</p>
						</div>
					</div>

					<div class="flex-w w-full">
						<span class="fs-18 cl5 txt-center size-211">
							<i class="zmdi zmdi-email  zmdi-hc-lg"></i>
						</span>

						<div class="size-212 p-t-2">
							<span class="mtext-110 cl2">
								Sale Support
							</span>

							<p class="stext-115 cl1 size-213 p-t-18">
								contact@example.com
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>	

      {/* <!-- Map --> */}
      <div class="map">
        <div class="size-303" id="google_map" data-map-x="40.691446" data-map-y="-73.886787" data-pin="images/icons/pin.png" data-scrollwhell="0" data-draggable="1" data-zoom="11"></div>
      </div>




    </>
  )
}

export default ContactPage;
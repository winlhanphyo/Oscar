import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ForgetPasswordPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: ''
  });
  const [errorForm, setErrorForm] = React.useState({
    email: ''
  });
  const history = useHistory();

  const validation = (error=true) => {
    let preErrorForm = errorForm;
    let validate = true;
    let value = formData.email;
    if (!value) {
      validate = false;
      if (error) {
        preErrorForm.email = 'Email is required';
      }
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      validate = false;
      if (error) {
        preErrorForm.email = 'Email Format is required';
      }
    }
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  /**
   * handle textbox change register button disabled enabled.
   */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({ ...preFormData });
    const error = validation(false);
    let preErrorForm = errorForm;
    if (!error) {
      preErrorForm[name] = error;
      setErrorForm({
        ...preErrorForm
      });
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    setLoading(true);
    const validate = validation();
    if (validate) {
      axios.post('/forget-password', formData).then((response) => {
        console.log(response);
        setLoading(false);
        swal("Success", "Password Reset link is sent to your email successfully", "success").then(() => {
          let preFormData = formData;
          preFormData.email = "";
          setFormData({ ...preFormData });
        });
      }).catch((error) => {
        setLoading(false);
        swal("Oops!", "Email does not exists", "error");
        console.log(error);
      });
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner text="Logging in..." />}

      {/* <!-- Title page --> */}
      <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{ backgroundImage: "url('poto/a2.jpg')" }}>
        <h2 class="ltext-105 cl0 txt-center">
          Reset Your Password
        </h2>
      </section>

      {/* <!-- Content page --> */}
      <section class="bg0 p-t-104 p-b-116">
        <div class="container">
          <div class="flex-w flex-tr flex-c-m">
            <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <h6 class="stext-105 cl2 txt-center p-b-30">
                  We will send you an email to reset your password
                </h6>

                <div
                  className={errorForm?.email ? `bor8 m-b-30 how-pos4-parent is-invalid` : `bor8 m-b-30 how-pos4-parent`}>
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange} />
                  <i class="zmdi zmdi-email how-pos4 pointer-none"></i>
                </div>
                {errorForm.email ? (
                  <div className="invalid-form">{errorForm.email}</div>) : ''}

                <button onClick={handleClick} class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  Submit
                </button>
                <Link href="login.html" class="flex-l-m stext-101 size-102 p-lr-15 trans-04 pointer text-dark p-t-30">cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default ForgetPasswordPage;

import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { LOGIN_SUCCESS } from "../../store/actions/types";
import axios from '../../axios/index';
import styles from './LoginPage.module.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const LoginPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(true);
  const [errorForm, setErrorForm] = React.useState({
    email: '',
    password: ''
  });
  const history = useHistory();
  const dispatch = useDispatch();

  let validation = (value, name) => {
    if (name == 'email') {
      if (!value) {
        return 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Email Format is required';
      }
      return '';
    }
    if (name == 'password') {
      if (!value) {
        return 'Password is required';
      } else if (value.length > 10) {
        return 'Password is greater than 10';
      }
      return '';
    }
  }

  /**
   * handle textbox change register button disabled enabled.
   */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log('change', name, value);
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({ ...preFormData });
    const error = validation(value, name);
    let preErrorForm = errorForm;
    if (!error) {
      preErrorForm[name] = error;
      setErrorForm({
        ...preErrorForm
      });
    }
    if (!error && formData.email && formData.password) {
      setDisabledLoginBtn(false);
    } else {
      setDisabledLoginBtn(true);
    }
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const error = validation(value, name);
    let preErrorForm = errorForm;
    console.log('blur error', error);
    if (error) {
      preErrorForm[name] = error;
      console.log('preError', preErrorForm);
      setErrorForm({
        ...preErrorForm
      });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setDisabledLoginBtn(true);
    axios.post('/login', formData).then((response) => {
      console.log(response);
      setLoading(false);
      setDisabledLoginBtn(false);
      if (response.status === 200) {
        const { data } = response;
        const token = data.token;
        const { user } = data;
        localStorage.setItem(
          "user",
          JSON.stringify({
            accessToken: token,
            ...user
          })
        );
        /** store logged in user's info to App State */
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: {
              accessToken: token,
              ...formData
            },
          }
        });
        history.push('/home');
      }
    }).catch((error) => {
      setLoading(false);
      setDisabledLoginBtn(false);
      alert("Email or Password name is incorrect.");
      console.log(error);
    });

  }

  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner text="Logging in..." />}

      {/* <div className={loading ? styles.container + ' shadow ' + styles.backdrop : styles.container}> */}
        <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: "url('poto/a1.jpg')"}}>
          <h2 class="ltext-105 cl0 txt-center">
            Your Account
          </h2>
        </section>

        {/* <!-- Content page --> */}
        <section class="bg0 p-t-104 p-b-116">
          <div class="container">
            <div class="flex-w flex-tr flex-c-m">
              <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
                <form onSubmit={handleSubmit}>
                  <h4 class="mtext-105 cl2 txt-center p-b-30">
                    Login
                  </h4>

                  <div className={errorForm?.email ? `bor8 m-b-20 how-pos4-parent is-invalid` : `bor8 m-b-20 how-pos4-parent`}>
                    <input 
                      className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30`}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                  </div>
                  {errorForm.email ? (
                          <div className="invalid-form">{errorForm.email}</div>) : ''}

                  <div className={errorForm?.password ? `bor8 m-b-20 how-pos4-parent is-invalid` : `bor8 m-b-20 how-pos4-parent`}>
                    <input
                      className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30`}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur} />
                    <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                  </div>

                  {errorForm.password ? (
                          <div className="invalid-form">{errorForm.password}</div>) : ''}
                  <button disabled={disabledLoginBtn} class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                    Submit
                  </button>
                  <a href="login-forget.html" class="flex-l-m stext-103 size-121 p-lr-15 trans-04 pointer text-dark p-t-30">Forget Your Password?</a><hr />
                  <Link to="/create/account" class ="flex-c-m stext-101 size-121 p-lr-15 trans-04 pointer text-dark">Create Account</Link>
                </form>
              </div>
            </div>
          </div>
        </section>
      {/* </div> */}

      <Footer />

      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default LoginPage;

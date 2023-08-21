import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import { LOGIN_SUCCESS } from "../../store/actions/types";
// import styles from './LoginPage.module.scss';
import axios from '../../axios/index';
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
    if (error) {
      preErrorForm[name] = error;
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
        console.log('token', response);
        /** store logged in user's info to local storage */
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
        history.push('/admin/events');
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
                <form>
                  <h4 class="mtext-105 cl2 txt-center p-b-30">
                    Login
                  </h4>

                  <div class="bor8 m-b-20 how-pos4-parent">
                    <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="text" name="username" placeholder="User Name" />
                    <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                  </div>
                  <div class="bor8 m-b-30 how-pos4-parent">
                    <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30" type="password" name="password" placeholder="Password" />
                    <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                  </div>
                  <button class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
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

import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const CreateAccountPage = ({addCategory}) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errorForm, setErrorForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const history = useHistory();

  let validation = (error=true) => {
    const keys = ["firstName", "lastName", "email", "password"];
    let preErrorForm = errorForm;
    let validate = true;
    keys.map((dist) => {
      let value = formData[dist];
      if (dist == 'email') {
        if (!value) {
          validate = false;
          if (error) {
            preErrorForm[dist] = 'Email is required';
          }
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          validate = false;
          if (error) {
            preErrorForm[dist] = 'Email Format is required';
          }
        }
      } else if (dist == 'password') {
        if (!value) {
          validate = false;
          if (error) {
            preErrorForm[dist] = 'Password is required';
          }
        } else if (value.length > 10) {
          validate = false;
          if (error) {
            preErrorForm[dist] = 'Password is greater than 10';
          }
        }
      } else if (dist == 'firstName') {
        if (!value) {
          validate = false;
          if (error) {
            preErrorForm[dist] = "First Name is required";
          }
        }
      } else if (dist == 'lastName') {
        if (!value) {
          validate = false;
          if (error) {
            preErrorForm[dist] = "Last Name is required";
          }
        }
      }
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validate = validation();
    if (validate) {
      setLoading(true);
      axios.post('/signup', formData).then((response) => {
        setLoading(false);
        if (response.status === 200) {
          swal("Success", "User Signup successfully", "success").then(() => {
            history.push('/login');
          });
        }
      }).catch((error) => {
        setLoading(false);
        alert("Email or Password name is incorrect.");
        console.log(error);
      });
    }
  }

  return (
    <>
      <Header />
      <Cart />

      {loading && <LoadingSpinner text="Logging in..." />}

      {/* <!-- Title page --> */}
      <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: "url('poto/a3.jpg')"}}>
        <h2 class="ltext-105 cl0 txt-center">
          Create Account
        </h2>
      </section>

      {/* <!-- Content page --> */}
      <section class="bg0 p-t-104 p-b-116">
        <div class="container">
          <div class="flex-w flex-tr flex-c-m">
            <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form onSubmit={handleSubmit}>

                <div className={errorForm?.firstName ? `bor8 m-b-20 how-pos4-parent is-invalid` : `bor8 m-b-20 how-pos4-parent`}>
                    <input 
                      className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30`}
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange} />
                  <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                </div>
                {errorForm.firstName ? (
                  <div className="invalid-form">{errorForm.firstName}</div>) : ''}

                <div className={errorForm?.lastName ? `bor8 m-b-20 how-pos4-parent is-invalid` : `bor8 m-b-20 how-pos4-parent`}>
                    <input 
                      className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30`}
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange} />
                  <i class="zmdi zmdi-account how-pos4 pointer-none"></i>
                </div>
                {errorForm.lastName ? (
                          <div className="invalid-form">{errorForm.lastName}</div>) : ''}

                <div className={errorForm?.email ? `bor8 m-b-20 how-pos4-parent is-invalid` : `bor8 m-b-20 how-pos4-parent`}>
                    <input 
                      className={`stext-111 cl2 plh3 size-116 p-l-62 p-r-30`}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}/>
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
                      onChange={handleChange}/>
                    <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                  </div>

                  {errorForm.password ? (
                          <div className="invalid-form">{errorForm.password}</div>) : ''}
                
                <button class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer">
                  SignUp
                </button>
                <Link to="/login" class="flex-l-m stext-101 size-121 p-lr-15 trans-04 pointer text-dark p-t-30">Cancel</Link>
              </form>
            </div>
          </div>
        </div>
      </section>





    </>
  )
}

export default CreateAccountPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const ForgetPasswordUpdatePage = ({addCategory}) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: '',
    confirmPassword: ''
  });
  const [errorForm, setErrorForm] = React.useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const { token, userId } = useParams();


  const validation = (error = true) => {
    const keys = ["password", "confirmPassword"];

    let preErrorForm = errorForm;
    let validate = true;
    keys.map((dist) => {
      let value = formData[dist];
      if (dist === 'password') {
        if (!value) {
          preErrorForm[dist] = 'New Password is required';
          validate = false;
        } else if (value.length > 10) {
          preErrorForm[dist] = 'New Password is greater than 10';
          validate = false;
        }
      }
      if (dist === 'confirmPassword') {
        if (!value) {
          preErrorForm[dist] = 'Comfirm Password is required';
          validate = false;
        } else if (value.length > 10) {
          preErrorForm[dist] = 'Comfirm Password is greater than 10';
          validate = false;
        } else if (value !== formData.password) {
          preErrorForm["confirmPassword"] = 'Comfirm Password not equal with New Password';
          preErrorForm["password"] = 'Comfirm Password not equal with New Password';
          validate = false;
        }
      }
    });
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  /**
   * handle textbox change register button.
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
    const validate = validation();
    if (validate) {
      setLoading(true);
      const param = {
        password: formData.password
      };
      axios.post(`/password-reset-update/${userId}/${token}`, param).then(response => {
        setLoading(false);
        if (response.status === 200) {
          swal("Success", "Password is reset successfully", "success").then(() => {
            window.location.href = "/admin/login";
          });
        }
      }).catch(err => {
        setLoading(false);
        swal("Oops!", "Password Reset API Error", "error");
      });
    } else {
      setLoading(false);
    }
  }

  const handleChangeShowPassword = (event) => {
    const checked = event.target.checked;
    setShowPassword(checked);
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <Header />
      <Cart />

      {/* <!-- Title page --> */}
      <section class="bg-img1 txt-center p-lr-15 p-tb-92" style={{backgroundImage: "url('poto/a3.jpg')"}}>
        <h2 class="ltext-105 cl0 txt-center">
          Change Your Password
        </h2>
      </section>

      {/* <!-- Content page --> */}
      <section class="bg0 p-t-50 p-b-50">
        <div class="container">
          <div class="flex-w flex-tr flex-c-m">
            <div class="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form>
                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                </div>
                {errorForm.password ? (
                  <div className="invalid-form">{errorForm.password}</div>) : ''}

                <div class="bor8 m-b-20 how-pos4-parent">
                  <input class="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Comfirm Password" />
                  <i class="zmdi zmdi-eye how-pos4 pointer-none"></i>
                </div>
                {errorForm.confirmPassword ? (
                  <div className="invalid-form">{errorForm.confirmPassword}</div>) : ''}

                <div class="m-b-20 how-pos4-parent">
                  <input class="form-check-input m-lr-15-xl m-l-0-lg m-l-0-md m-l-0-sm m-l-0-ssm" type="checkbox" value="" id="flexCheckChecked"
                  onChange={handleChangeShowPassword} value={showPassword} />
                  <label class="form-check-label mar" for="flexCheckChecked" >
                    Show Password
                  </label>
                </div>
                <button class="flex-c-m stext-101 cl0 size-121 bg1 bor1 hov-btn3 p-lr-15 trans-04 pointer" onClick={handleClick}>
                  Change
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>



      <div class="btn-back-to-top" id="myBtn">
        <span class="symbol-btn-back-to-top">
          <i class="zmdi zmdi-chevron-up"></i>
        </span>
      </div>
    </>
  )
}

export default ForgetPasswordUpdatePage;

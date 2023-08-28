import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
import styles from './ForgetPasswordUpdate.module.scss';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';

const ForgetPasswordUpdate = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    newPassword: '',
    comfirmNewPassword: ''
  });
  const [errorForm, setErrorForm] = React.useState({
    newPassword: '',
    comfirmNewPassword: '',
  });
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(true);
  const { token, userId } = useParams();
  const dispatch = useDispatch();
  let validation = (value, name) => {
    if (name === 'newPassword') {
      if (!value) {
        return 'New Password is required';
      } else if (value.length > 10) {
        return 'New Password is greater than 10';
      }
      return '';
    }
    if (name === 'comfirmNewPassword') {
      if (!value) {
        return 'Comfirm Password is required';
      } else if (value.length > 10) {
        return 'Comfirm Password is greater than 10';
      } else if (value !== formData.newPassword) {
        return 'Comfirm Password not equal with New Password';
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
    if (!error && formData.newPassword && formData.comfirmNewPassword) {
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
    const param = {
      password: formData.newPassword
    };
    axios.post(`/password-reset-update/${userId}/${token}`, param).then(response => {
      setLoading(false);
      setDisabledLoginBtn(false);
      if (response.status === 200) {
        swal("Success", "Password is reset successfully", "success").then(() => {
          window.location.href = "/admin/login";
        });
      }
    }).catch(err => {
      setLoading(false);
      setDisabledLoginBtn(false);
      swal("Oops!", "Password Reset API Error", "error");
    });
  }

  return (
    <Fragment>
      <video autoPlay loop muted className={loading ? styles.backdrop + ' shadow ' + styles.videoBg : styles.videoBg}>
        <source src='../../../login/phone_using.mp4' type='video/mp4'></source>
      </video>

      {loading && <LoadingSpinner />}

      <div className={loading ? styles.container + ' shadow ' + styles.backdrop : styles.container}>
        <p className={styles.ForgetPasswordUpdateTtl}>Change Password</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.newPassword}
              isInvalid={errorForm.newPassword}
            />
            {errorForm.newPassword ? (
              <span className='text-danger mt-4'>{errorForm.newPassword}</span>) : ''}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              name="comfirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              value={formData.comfirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.comfirmNewPassword}
              isInvalid={errorForm.comfirmNewPassword}
            />
            {errorForm.comfirmNewPassword ? (
              <span className='text-danger mt-4'>{errorForm.comfirmNewPassword}</span>) : ''}
          </Form.Group>
          <div className="d-flex justify-content-around mt-5">
            <Button disabled={disabledLoginBtn} type="submit" className={styles.forgetBtn}>
              Change
            </Button>
          </div>
          <div className="d-flex justify-content-around mt-3">
            <a href="/admin/login" className={styles.backToLogin}>Back to Login</a>
          </div>
        </Form>
      </div>
    </Fragment>
  )
}

export default ForgetPasswordUpdate;

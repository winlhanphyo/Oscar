import React, { Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import { useDispatch } from "react-redux";
import swal from 'sweetalert';
import styles from './PasswordChangeForm.module.scss';
import axios from '../../axios/index';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const PasswordChangeForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    new_password: '',
    comfirm_new_password: ''
  });
  const [errorForm, setErrorForm] = React.useState({
    new_password: '',
    comfirm_new_password: '',
  });
  const [disabledLoginBtn, setDisabledLoginBtn] = React.useState(true);
  const history = useHistory();
  const { token } = useParams();
  const dispatch = useDispatch();
  let validation = (value, name)=>{
    if(name === 'new_password'){
      if(!value){
        return 'New Password is required';
      } else if(value.length > 10){
        return 'New Password is greater than 10';
      }
      return '';
    }
    if(name === 'comfirm_new_password'){
      if(!value){
        return 'Comfirm Password is required';
      } else if(value.length > 10){
        return 'Comfirm Password is greater than 10';
      } else if(value !== formData.new_password){
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
    setFormData({...preFormData});
    const error = validation(value, name);
    let preErrorForm = errorForm;
    if (!error) {
      preErrorForm[name] = error;
      setErrorForm({
        ...preErrorForm
      });
    }
    if(!error && formData.new_password && formData.comfirm_new_password){
      setDisabledLoginBtn(false);
    }else{
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
    axios.post(`/reset-password/${token}`, formData).then(response => {
      setLoading(false);
      setDisabledLoginBtn(false);
      if(response.status === 200) {
        swal("Success", "Password is changed successfully", "success").then(() => {
          history.push('/login');
        });
      }
    }).catch(error => {
      setLoading(false);
      setDisabledLoginBtn(false);
      swal("Oops!", "Password Change API is error occurred!", "error");
    });
  }

  return (
    <Fragment>
      <video autoPlay loop muted className={loading ? styles.backdrop + ' shadow ' + styles.videoBg : styles.videoBg}>
        <source src='../../../login/phone_using.mp4' type='video/mp4'></source>
      </video>

      {loading && <LoadingSpinner />}

      <div className={loading ? styles.container + ' shadow ' + styles.backdrop : styles.container }>
        <p className={styles.passwordChangeFormTtl}>Change Password</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              name="new_password"
              type="password"
              placeholder="New Password"
              value={formData.new_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.new_password}
              isInvalid={errorForm.new_password}
            />
              {errorForm.new_password ? (
                <span className='text-danger mt-4'>{errorForm.new_password}</span>) : ''}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              required
              name="comfirm_new_password"
              type="password"
              placeholder="Confirm New Password"
              value={formData.comfirm_new_password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.formControl}
              isValid={!errorForm.comfirm_new_password}
              isInvalid={errorForm.comfirm_new_password}
            />
              {errorForm.comfirm_new_password ? (
                <span className='text-danger mt-4'>{errorForm.comfirm_new_password}</span>) : ''}
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

export default PasswordChangeForm;

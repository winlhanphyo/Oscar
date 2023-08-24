import React from 'react';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import axios from '../../axios/index';
import styles from './Product.module.scss';
import { imageURL } from '../../utils/constants/constant';

const EditProductPage = () => {
  const param = useParams();
  const [categoryList, setCategoryList] = React.useState([]);
  const [preview, setPreview] = React.useState(null);
  const [errorForm, setErrorForm] = React.useState({
    name: "",
    description: "",
    category: "",
    price: "",
    count: ""
  });
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    category: "",
    price: "",
    count: "",
    status: "available"
  });

  React.useEffect(() => {
    let id = param['id'];
    axios.get(`/product/${id}`).then((dist) => {
      setFormData({
        name: dist?.data?.data?.name,
        description: dist?.data?.data?.description,
        category: dist?.data?.data?.category?._id,
        price: dist?.data?.data?.price,
        count: dist?.data?.data?.count,
        status: dist?.data?.data?.status
      });
      const img = dist?.data?.data?.image ? imageURL + dist?.data?.data?.image : null;
      setPreview(img);
    }).catch((err) => {
      swal("Oops!", "Get Product API Error", "error");
    })

    axios.get("/category").then((dist) => {
      const result = [];
      dist?.data?.data?.map((cat, index) => {
        result.push({
          name: cat.name,
          id: cat._id
        });
        if (index === dist.data.data.length - 1) {
          setCategoryList(result);
        }
      });
    }).catch((err) => {
      swal("Oops!", err.toString(), "error");
    });
  }, []);

  const validation = () => {
    const errorMsg = {
      name: "Product Name is required",
      description: "Product Description is required",
      category: "Category is required",
      price: "Price is required",
      count: "Count is required"
    };

    let preErrorForm = errorForm;
    let validate = true;
    Object.keys(errorMsg).map((dist) => {
      if ((dist === "count" && Number(formData[dist]) < 0) || !formData[dist]) {
        console.log('formData', formData[dist]);
        preErrorForm[dist] = errorMsg[dist];
        validate = false;
      } else {
        preErrorForm[dist] = null;
      }
    });
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  const updateProduct = (e) => {
    e.preventDefault();
    const validate = validation();
    console.log('validate', validate);
    if (validate) {
      let id = param['id'];
      const user = JSON.parse(localStorage.getItem("admin"));
      let formParam = new FormData();
      formParam.append('name', formData.name);
      formParam.append('description', formData.description);
      formParam.append('price', formData.price);
      formParam.append('count', formData.count);
      if (formData?.image) {
        formParam.append('image', formData.image);
      }
      formParam.append('category', formData.category);
      formParam.append('created_user_id', user._id);
      formParam.append('status', formData.status);
      axios.post(`/product/${id}`, formParam,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((dist) => {
          console.log("Updated Product")
          swal("Success", "Product is updated successfully", "success").then(() => {
            window.location.href = "/admin/product";
          });
        }).catch((err) => {
          swal("Oops!", "Update Product API Error", "error");
        })
    }
  }

  const cancelClick = (e) => {
    e.preventDefault();
    window.location.href = "/admin/product";
  }

  /**
  * handle textbox change.
  */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const preErrorForm = errorForm;
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({ ...preFormData });
    if (preFormData[name] && preErrorForm[name]) {
      preErrorForm[name] = null;
      setErrorForm({ ...preErrorForm });
    }
  };

  const handleFileSelected = (e) => {
    const name = e.target.name;
    let preFormData = formData;
    const file = e.target.files[0];
    preFormData[name] = file;
    setPreview(URL.createObjectURL(file));
    setFormData({ ...preFormData });
  }

  return (
    <div class="container-scroller">
      <Header />
      <div class="page-body-wrapper">
        <Sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-md-12 stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">Update Product</h4>
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" name="name" className={errorForm?.name ? `form-control is-invalid` : `form-control`} value={formData.name} onChange={handleChange} id="name" placeholder="Product Name" />
                        {errorForm.name ? (
                          <div class="invalid-feedback">{errorForm.name}</div>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="name">Description</label>
                        <textarea className={errorForm?.description ? `form-control is-invalid` : `form-control`} id="description" rows="3" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                        {errorForm.description ? (
                          <div class="invalid-feedback">{errorForm.description}</div>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="category">Category</label>
                        <select className={errorForm?.category ? `custom-select is-invalid` : `custom-select`} id="category" name="category" value={formData.category} onChange={handleChange}>
                          <option value="" selected>Choose...</option>
                          {categoryList.map((data) => {
                            return (<option value={data.id}>{data.name}</option>)
                          })
                          }
                        </select>
                        {errorForm.category ? (
                          <div class="invalid-feedback">{errorForm.category}</div>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="price">Price</label>
                        <input type="number" name="price" className={errorForm?.price ? `form-control is-invalid` : `form-control`} value={formData.price} onChange={handleChange} id="price" placeholder="Price" />
                        {errorForm.price ? (
                          <div class="invalid-feedback">{errorForm.price}</div>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="count">Count</label>
                        <input type="number" name="count" className={errorForm?.count ? `form-control is-invalid` : `form-control`} value={formData.count} onChange={handleChange} id="count" placeholder="count" />
                        {errorForm.count ? (
                          <div class="invalid-feedback">{errorForm.count}</div>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="status">Status</label>
                        <select className={errorForm?.status ? `custom-select is-invalid` : `custom-select`} id="status" name="status" value={formData.status} onChange={handleChange}>
                          <option value="available" selected>Available</option>
                          <option value="not available">Not Available</option>
                        </select>
                      </div>

                      <div class="form-group">
                        <label for="image">Image</label>
                        <div class="custom-file">
                          <input type="file" name="image" className="custom-file-input" id="image" onChange={handleFileSelected} required />
                          <label class="custom-file-label" for="validatedCustomFile">{formData?.image?.name ? formData.image.name : "Choose file..."}</label>
                        </div>
                        {preview &&
                          <div className="mb-3">
                            <img src={preview} name="profile" className={styles.previewImg} />
                          </div>
                        }
                      </div>

                      <button class="btn btn-primary mr-2" onClick={(e) => updateProduct(e)}>Update</button>
                      <button class="btn btn-light" onClick={(e) => cancelClick(e)}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html --> */}
          <footer class="footer">
            <div class="d-sm-flex justify-content-center justify-content-sm-between">
              <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2018 <a href="https://www.urbanui.com/" target="_blank">Urbanui</a>. All rights reserved.</span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="mdi mdi-heart text-danger"></i></span>
            </div>
          </footer>
          {/* <!-- partial --> */}
        </div>
        {/* <!-- main-panel ends --> */}
      </div>
      {/* <!-- page-body-wrapper ends --> */}
    </div>

  )
}

export default EditProductPage;
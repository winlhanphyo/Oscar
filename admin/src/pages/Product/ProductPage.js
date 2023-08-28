import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import $ from 'jquery';
import 'bootstrap';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import { imageURL } from '../../utils/constants/constant';
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';

const ProductPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginateCount, setPaginateCount] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState(null);
  const searchName = React.createRef();

  React.useEffect(() => {
    getProductList();
  }, []);

  const getProductList = (offsetData = 0) => {
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchName.current?.value) {
      params.name = searchName.current.value
    }
    setLoading(true);
    axios.get("/product", {
      params
    }).then((dist) => {
      // $(".odd").empty();
      setProductList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / 5;
      const count = [];
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
      }
      setPaginateCount(count);
      setLoading(false);
    }).catch((err) => {
      swal("Oops!", "Product List Page API Error", "error");
      setLoading(false);
    });
  }

  const paginateClick = (status = null, index = 0) => {
    if (status === "next") {
      getProductList(offset + 1);
    } else if (status === "prev") {
      getProductList(offset - 1);
    } else {
      getProductList(index - 1);
    }
  };

  const goToCreateProduct = () => {
    window.location.href = "/admin/product/create";
  };

  const editProduct = (id) => {
    window.location.href = `/admin/product/${id}/edit`;
  }

  const deleteCategory = () => {
    setLoading(true);
    axios.delete(`/product/${deleteId}`).then((dist) => {
      getProductList();
    }).catch((err) => {
      swal("Oops!", err.toString(), "error");
      setLoading(false);
    });
  }

  const showDeleteDialog = (id) => {
    setDeleteId(id);
  }

  const searchProduct = () => {
    setLoading(true);
    axios.get("/product", {
      params: {
        size: 5,
        page: 0,
        name: searchName.current.value,
      }
    }).then((dist) => {
      setProductList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / 5;
      const count = [];
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
      }
      setPaginateCount(count);
      setLoading(false);
    }).catch((err) => {
      swal("Oops!", err.toString(), "error");
      setLoading(false);
    });
  }

  return (
    <>
      <div class="container-scroller">
        <Header />
        {loading && <LoadingSpinner />}
        {/* <!-- partial --> */}
        <div class="page-body-wrapper">
          {/* <!-- partial:partials/_sidebar.html --> */}
          <Sidebar />
          {/* <!-- partial --> */}
          <div class="main-panel">
            <div class="content-wrapper">
              <div class="row">
                <div class="col-md-12 stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <p class="card-title">Product</p>

                      <div className="btn-div">
                        <div className="search-group">
                          <div class="form-row align-items-center">
                            <div class="col-auto">
                              <label class="sr-only" for="inlineFormInput">Name</label>
                              <input type="text" class="form-control mb-2" id="searchText" ref={searchName} placeholder="Search Name" />
                            </div>

                            <div class="col-auto">
                              <button class="btn btn-primary mb-2" onClick={searchProduct}>Search</button>
                            </div>
                          </div>
                        </div>

                        <div className="addbtn-div">
                          <button type="button" class="addBtn btn btn-primary" onClick={goToCreateProduct}>Add</button>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <table id="recent-purchases-listing" class="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>Category</th>
                              <th>Price</th>
                              <th>Count</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productList.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>{((index + 1) + (5 * Number(offset)))}</td>
                                  <td>{data?.name}</td>
                                  <td>{data?.category?.name}</td>
                                  <td>{data?.price}</td>
                                  <td>{data?.count}</td>
                                  <td>{data?.status}</td>
                                  <td><img src={imageURL + data.image} /></td>
                                  <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
                                  <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
                                  <td>
                                    <button type="button" class="btn btn-social-icon btn-outline-facebook" onClick={() => editProduct(data._id)}><i class="mdi mdi-pencil"></i></button>
                                    <button type="button" class="btn btn-social-icon btn-outline-facebook" data-toggle="modal" data-target="#confirmModal" onClick={() => showDeleteDialog(data._id)}><i class="mdi mdi-delete"></i></button>
                                  </td>
                                </tr>
                              )
                            })
                            }
                          </tbody>
                        </table>
                        <nav aria-label="Category Page navigation">
                          <ul class="pagination justify-content-center">
                            <li className={Number(offset) === 0 ? "page-item disabled" : "page-item"}>
                              <a class="page-link" href="#" tabindex={offset - 1} onClick={() => paginateClick("prev")}>Previous</a>
                            </li>
                            {paginateCount?.map((dist) => {
                              return (
                                <>
                                  <li className={Number(dist - 1) === Number(offset) ? "page-item active" : "page-item"}><a class="page-link"
                                    onClick={() => paginateClick(null, dist)}>{dist}</a></li>
                                </>
                              )
                            })}
                            <li class="page-item">
                              <a className={totalCount <= ((Number(offset) + 1) * 5) ? "page-link disabled" : "page-link"} onClick={() => paginateClick("next")}>Next</a>
                            </li>
                          </ul>
                        </nav>

                      </div>
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
      <ConfirmDialog text="Are you sure want to delete" next={deleteCategory} btnLabel="Delete" />
    </>
  )
}

export default ProductPage;
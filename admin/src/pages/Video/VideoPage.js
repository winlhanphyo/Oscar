import React from 'react';
import moment from 'moment';
import swal from 'sweetalert';
import { useLocation } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import OscarPagination from '../../components/OscarPagination/OscarPagination';
import axios from '../../axios/index';


function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const VideoPage = () => {
  let query = useQuery();
  const [loading, setLoading] = React.useState(false);
  const [videoList, setVideoList] = React.useState([]);
  const [paginationData, setPaginationData] = React.useState({
    from: 1,
    last_page: 1,
    per_page: 1
  })
  const [offset, setOffset] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginateCount, setPaginateCount] = React.useState([]);
  const [deleteId, setDeleteId] = React.useState(null);
  const searchName = React.createRef();

  React.useEffect(() => {
    getVideoList();
  }, []);

  const getVideoList = (offsetData = 0) => {
    offsetData = Number(query.get("page")) || 0;
    offsetData = offsetData > 0 ? offsetData - 1 : offsetData;
    let searchNameData = query.get("searchName") || searchName.current.value;
    searchName.current.value = searchNameData;
    let params = {
      size: 5,
      page: offsetData
    };
    if (searchNameData) {
      params.name = searchNameData
    }
    setLoading(true);
    axios.get("/video", {
      params
    }).then((dist) => {
      setLoading(false);
      setVideoList(dist?.data?.data);
      setOffset(dist?.data?.offset);
      setTotalCount(dist?.data?.count);
      const page = dist?.data?.count / 5;
      const count = [];
      let lastPage = 0;
      for (let i = 0; i < page; i++) {
        count.push(i + 1);
        lastPage = i + 1;
      }
      setPaginateCount(count);
      let prePaginationData = {
        from: dist?.data?.offset,
        last_page: lastPage,
        per_page: 5
      }
      setPaginationData({ ...prePaginationData });
    }).catch((err) => {
      setLoading(false);
      console.log('Get Video API error', err);
      swal("Oops!", "Get Video API error", "error");
    });
  }

  const goToCreateVideo = () => {
    window.location.href = "/admin/video/create";
  };

  const editVideo = (id) => {
    window.location.href = `/admin/video/${id}/edit`;
  }

  /**
   * deleteVideo
   */
  const deleteVideo = () => {
    axios.delete(`/video/${deleteId}`).then((dist) => {
      getVideoList();
    }).catch((err) => {
      console.log('Delete Video API error', err);
      swal("Oops!", "Delete Video API Error", "error");
    });
  }

  /**
   * show delete confirm dialog.
   * @param {*} id 
   */
  const showDeleteDialog = (id) => {
    setDeleteId(id);
  }

  /**
   * search video.
   */
  const searchVideo = () => {
    let offsetData = Number(query.get("page")) || 0;
    offsetData = offsetData > 0 ? offsetData - 1 : offsetData;
    let searchNameData = searchName.current.value;
    window.location.href = "/admin/video?page=" + offsetData + "&searchName=" + searchNameData;
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
                      <p class="card-title">Video</p>

                      <div className="btn-div">
                        <div className="search-group">
                          <div class="form-row align-items-center">
                            <div class="col-auto">
                              <label class="sr-only" for="inlineFormInput">Video Name</label>
                              <input type="text" class="form-control mb-2" id="searchText" ref={searchName} placeholder="Video Name" />
                            </div>

                            <div class="col-auto">
                              <button class="btn btn-primary mb-2" onClick={searchVideo}>Search</button>
                            </div>
                          </div>
                        </div>

                        <div className="addbtn-div">
                          <button type="button" class="addBtn btn btn-primary" onClick={goToCreateVideo}>Add</button>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <table id="category-listing" class="table">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Name</th>
                              <th>URL</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {videoList.map((data, index) => {
                              return (
                                <tr>
                                  <td>{((index + 1) + (5 * Number(offset)))}</td>
                                  <td>{data.name}</td>
                                  <td>{data.url}</td>
                                  <td>{moment(data.createdAt).format('YYYY-MM-DD')}</td>
                                  <td>{moment(data.updatedAt).format('YYYY-MM-DD')}</td>
                                  <td>
                                    <button
                                      type="button"
                                      class="btn btn-social-icon btn-outline-facebook"
                                      disabled={videoList?.length === 1}
                                      onClick={() => editVideo(data._id)}>
                                      <i class="mdi mdi-pencil"></i>
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-social-icon btn-outline-facebook"
                                      data-toggle="modal"
                                      data-target="#confirmModal"
                                      disabled={videoList?.length === 1}
                                      onClick={() => showDeleteDialog(data._id)}>
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })
                            }
                          </tbody>
                        </table>

                        <OscarPagination
                          paginateUrl="/admin/video?page="
                          metadata={paginationData}
                          fetchData={getVideoList}
                        />
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
        </div>
      </div>
      <ConfirmDialog text="Are you sure want to delete" next={deleteVideo} btnLabel="Delete" />
    </>
  )
};

export default VideoPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Alert } from 'react-bootstrap';
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Header/Sidebar";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import axios from '../../axios/index';

const EditVideoPage = () => {
  const param = useParams();
  const [loading, setLoading] = React.useState(false);
  const [errorForm, setErrorForm] = React.useState({
    name: '',
    url: ''
  });
  const [formData, setFormData] = React.useState({
    name: '',
    url: ''
  });
  const [isValidUrl, setIsValidUrl] = React.useState(true);

  React.useEffect(() => {
    let id = param['id'];
    setLoading(true);
    axios.get(`/video/${id}`).then((dist) => {
      console.log('dist', dist);
      setFormData({
        name: dist?.data?.data?.name,
        url: dist?.data?.data?.url
      })
      setLoading(false);
    }).catch((err) => {
      alert('Update Video API Error' + err.toString());
      setLoading(false);
    })
  }, []);

  /**
   * validation.
   * @returns 
   */
  const validation = () => {
    const errorMsg = {
      name: "Product Name is required",
      url: "YouTube URL is required"
    };

    let preErrorForm = errorForm;
    let validate = true;
    Object.keys(errorMsg).map((dist) => {
      if (dist == "url") {
        if (!formData[dist]) {
          preErrorForm[dist] = 'YouTube URL is required';
        } else {
          // Regular expression to match YouTube video URLs
          const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;
          const match = formData?.url?.match(youtubeRegex);

          if (match) {
            preErrorForm[dist] = null;
          } else {
            preErrorForm[dist] = 'YouTube URL format is invalid';
          }
        }
      } else {
        if (!formData[dist]) {
          preErrorForm[dist] = 'Video Name is required';
        }
        return null;
      }
    });
    setErrorForm({ ...preErrorForm });
    return validate;
  }

  /**
   * update video.
   * @param {*} e 
   */
  const updateVideo = (e) => {
    e.preventDefault();
    let id = param['id'];
    const validate = validation();

    if (validate) {
      const user = JSON.parse(localStorage.getItem("admin"));
      const data = {
        name: formData.name,
        url: formData.url,
        created_user_id: user._id
      };
      setLoading(true);
      console.log('data', data);
      axios.post(`/video/${id}`, data).then((dist) => {
        setLoading(false);
        swal("Success", "Video is updated successfully", "success").then(() => {
          window.location.href = "/admin/video";
        });
      }).catch((err) => {
        console.log('Update video API error----', err);
        swal("Oops!", "Update Video API Error", "error");
        setLoading(false);
      })
    }
  }

  const cancelClick = (e) => {
    e.preventDefault();
    window.location.href = "/admin/video";
  }

  /**
  * handle textbox change.
  */
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    let preErrorForm = errorForm;
    preFormData[name] = value;
    setFormData({ ...preFormData });

    if (preFormData[name] && preErrorForm[name]) {
      if (name === 'name') {
        preErrorForm[name] = null;
        setErrorForm({ ...preErrorForm });
      } else {
        // Regular expression to match YouTube video URLs
        const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/;
        const match = formData?.url?.match(youtubeRegex);

        if (match) {
          preErrorForm[name] = null;
          setErrorForm({ ...preErrorForm });
          setIsValidUrl(true);
        } else {
          setIsValidUrl(false);
        }
      }
    }
  };

  return (
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
                    <h4 class="card-title">Update Video</h4>
                    <form class="forms-sample">
                      <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" class="form-control" value={formData.name} onChange={handleChange} id="name" placeholder="Video Name" />
                        {errorForm.name ? (
                          <span className='text-danger mt-4'>{errorForm.name}</span>) : ''}
                      </div>

                      <div class="form-group">
                        <label for="url">YouTube URL</label>
                        <input type="text" name="url" class="form-control" value={formData.url} onChange={handleChange} id="url" placeholder="YouTube URL" />
                        {errorForm.url ? (
                          <span className='text-danger mt-4'>{errorForm.url}</span>) : ''}
                      </div>

                      <button class="btn btn-primary mr-2" onClick={(e) => updateVideo(e)}>Update</button>
                      <button class="btn btn-light" onClick={(e) => cancelClick(e)}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isValidUrl ? (
            <div className="video-container">
              <iframe
                style={{margin: "0 22px"}}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${formData?.url.split('v=')[1]}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Alert variant="danger">Invalid YouTube URL</Alert>
          )}

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

export default EditVideoPage;
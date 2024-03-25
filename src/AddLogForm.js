import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { Badge, Nav, Spinner, Tab, Toast } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

const AddLogForm = ({ sendData, updatePreviewData }) => {
  const { id } = useParams();
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [logType, setLogType] = useState("New"); // State for log type
  const navigate = useNavigate();
  const [imagepreview, setPreviewImageUrl] = useState(null);
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for spinner
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State for showing toast
  const baseURL = "http://localhost:8080"; // Update this with your actual backend URL

  const [activeTab, setActiveTab] = useState("add");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async () => {
    if (
      newImageTitle.trim() !== "" &&
      newImageDescription.trim() !== "" &&
      // email.trim() !== "" &&
      newImageFile
    ) {
      setLoading(true); // Show spinner

      // sendData(newImageUrl, newImageDescription, newImageTitle);

      try {
        let response;
        if (id) {
          const formDatanew = new FormData();
          formDatanew.append("title", newImageTitle);
          formDatanew.append("description", newImageDescription);
          // formDatanew.append("email", email);
          formDatanew.append("image", newImageFile);
          formDatanew.append("type", logType);

          console.log("formData", formDatanew);
          response = await axios.put(
            `${"http://localhost:8080"}/posts/${id}`,
            formDatanew,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          const formData = new FormData();
          formData.append("title", newImageTitle);
          formData.append("description", newImageDescription);
          // formData.append("email", email);
          formData.append("image", newImageFile);
          formData.append("type", logType);
          console.log("formData", formData);

          response = await axios.post(
            `${"http://localhost:8080"}/posts`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }

        const newPost = response.data;
        setNewImageUrl(newPost.imageUrl);

        setNewImageTitle("");
        setNewImageDescription("");
        setNewImageFile(null);
        navigate("/");

        setShowToast(true);
        setToastMessage("Post saved successfully");
      } catch (error) {
        console.error("Error adding post:", error.message);
        setShowToast(true);
        setToastMessage("Failed to save post");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl); // assuming you have a state variable to store the preview image URL
    }
  };

  const onCancelLog = () => {
    navigate("/");
  };

  const getPostbyid = async () => {
    const postdata = await axios.get(`${"http://localhost:8080"}/posts/${id}`);
    setNewImageTitle(postdata?.data?.title);
    setNewImageDescription(postdata?.data?.description);
    setNewImageUrl(postdata?.data?.image);
    // setEmail(postdata?.data?.email);
  };
  React.useEffect(() => {
    if (id) {
      getPostbyid();
    }
  }, [id]);

  return (
    <div className="container mt-3">
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link eventKey="add">Add ChangeLogs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="preview">Preview </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="add">
            <div className="card mt-3">
              <div className="card-header">
                <h5 className="mt-2">Add ChangeLog</h5>
              </div>
              <div className="card-body">
                <form className="form-outline " style={{ marginRight: "50px" }}>
                  <div className="row  mb-3 ms-5 mt-3">
                    <div className="col-md-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Title
                      </label>
                    </div>
                    <div className="col-md-12">
                      {" "}
                      <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Title"
                        value={newImageTitle}
                        onChange={(e) => setNewImageTitle(e.target.value)}
                      />{" "}
                    </div>
                  </div>

                  {/* <div className="row  mb-3 ms-5 mt-3">
                    <div className="col-md-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Email
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="email"
                        className="form-control w-100"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div> */}

                  <div className="row  mb-3 ms-5 mt-3">
                    <div className="col-md-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Description
                      </label>
                    </div>
                    <div className="col-md-12">
                      <textarea
                        className="form-control  "
                        rows="5"
                        placeholder="Enter Description"
                        value={newImageDescription}
                        onChange={(e) => setNewImageDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row  mb-3 ms-5 mt-3">
                    <div className="col-md-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Tag
                      </label>
                    </div>
                    <div className="col-md-12">
                      <select
                        className="form-select  "
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Improved">Improved</option>
                        <option value="Fixed">Fixed</option>
                      </select>
                    </div>
                  </div>

                  <div className="row  mb-3 ms-5 mt-3">
                    <div className="col-md-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Upload Image
                      </label>
                    </div>
                    <div className="col-md-12">
                      {newImageUrl && (
                        <img
                          className="img-thumbnail"
                          src={`${baseURL}/${newImageUrl.replace(/\\/g, "/")}`}
                          alt="Selected Image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                      <input
                        type="file"
                        name="image"
                        className="form-control "
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      variant="primary"
                      className="me-2"
                      style={{ marginLeft: "5%" }}
                      onClick={() => {
                        handleSubmit();
                      }}
                      disabled={loading} // Disable button when loading
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" /> // Show spinner when loading
                      ) : (
                        "Save"
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={onCancelLog}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>

              <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className={
                  toastMessage.includes("Failed") ? "bg-danger" : "bg-success"
                }
                // delay={3000}
                autohide
                style={{ position: "absolute", bottom: "1rem", right: "1rem" }}
              >
                <Toast.Body>{toastMessage}</Toast.Body>
              </Toast>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="preview">
            <div className="mt-3 ms-5">
              {newImageTitle ||
              newImageDescription ||
              newImageUrl ||
              imagepreview ? (
                <div>
                  <h3 className="mt-2 d-inline-block">{newImageTitle}</h3>
                  <Badge className="mb-4 ms-3" bg="primary" pill>
                    {logType}
                  </Badge>
                  <p className="mt-2">{newImageDescription}</p>
                  {newImageUrl && (
                    <img
                      className="img-thumbnail w-50 mt-3 h-50"
                      src={`${baseURL}/${newImageUrl.replace(/\\/g, "/")}`}
                      alt="Selected Image"
                    />
                  )}
                  {imagepreview && (
                    <img
                      className="img-thumbnail w-50 mt-3 h-50"
                      src={imagepreview}
                      alt="Selected Image"
                    />
                  )}
                </div>
              ) : (
                <div>
                <div className="d-flex justify-content-center text-secondary  ">
                 {/* < CiSearch  style={{color:"",width:100,height:"100",fontWeight:"100"}} /> */}
                </div>
                <p className="d-flex justify-content-center  ">No Preview Found's</p>
                <p className="d-flex justify-content-center   ">Try To Add ChangeLog</p>
                </div>
              )}
            </div>
          </Tab.Pane>

          <Tab.Pane eventKey="setting">setting</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default AddLogForm;

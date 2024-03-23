import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { Badge, Nav, Spinner, Tab, Toast } from "react-bootstrap";

const AddLogForm = ({ sendData, updatePreviewData }) => {
  const { id } = useParams();
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [logType, setLogType] = useState("New"); // State for log type
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State for spinner
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State for showing toast
  console.log("tost", showToast);
<<<<<<< HEAD
=======
  const baseURL = "http://localhost:8080"; // Update this with your actual backend URL

  const [activeTab, setActiveTab] = useState('add');

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  console.log("logType", logType)
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
  const handleSubmit = async () => {
    if (
      newImageTitle.trim() !== "" &&
      newImageDescription.trim() !== "" &&
      email.trim() !== "" &&
      newImageFile
    ) {
      setLoading(true); // Show spinner

<<<<<<< HEAD
      sendData(newImageUrl, newImageDescription, newImageTitle);
=======
      // sendData(newImageUrl, newImageDescription, newImageTitle);
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763

      try {
        const formData = new FormData();
        formData.append("title", newImageTitle);
        formData.append("description", newImageDescription);
        formData.append("email", email);
        formData.append("image", newImageFile);
        formData.append("type", logType);
        let response;
        if (id) {
          response = await axios.put(
<<<<<<< HEAD
            `${process.env.REACT_API_URL}/posts/${id}`,
=======
            `${"http://localhost:8080"}/posts/${id}`,
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
<<<<<<< HEAD
          response = await axios.post(
            `${process.env.REACT_API_URL}/posts`,
=======
           formData.append("title", newImageTitle);
        formData.append("description", newImageDescription);
        formData.append("email", email);
        formData.append("image", newImageFile);
        formData.append("type", logType);
          response = await axios.post(
            `${"http://localhost:8080"}/posts`,
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
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

        // Show success toast
        setShowToast(true);
        setToastMessage("Post saved successfully");
<<<<<<< HEAD
        updatePreviewData(newImageUrl, newImageDescription, newImageTitle);
=======
        // updatePreviewData(newImageUrl, newImageDescription, newImageTitle);
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
      } catch (error) {
        console.error("Error adding post:", error.message);
        // Show error toast
        setShowToast(true);
        setToastMessage("Failed to save post");
      } finally {
        setLoading(false); // Hide spinner
      }
    }
  };
<<<<<<< HEAD
  const handleSendmail = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_API_URL}/send-otp`,
        {
          email,
          title: newImageTitle,
          description: newImageDescription,
          img: newImageFile,
        }
      );
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
=======

>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763

  const handleImageChange = (e) => {
   
      
    if (newImageUrl) {
      setNewImageFile(newImageUrl)
    }
    else {
      const file = e.target.files[0];
      setNewImageFile(file);


       if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewImageFile(reader.result);
        };
        reader.readAsDataURL(file);
      }
  

    }

  };

  const onCancelLog = () => {
    navigate("/");
  };

<<<<<<< HEAD
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };
  console.log("img", setNewImageUrl);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setNewImageTitle(value);
    } else if (name === "description") {
      setNewImageDescription(value);
    } else if (name === "imageUrl") {
      setNewImageUrl(value);
    }

    updatePreviewData(newImageUrl, newImageDescription, newImageTitle);
  };

=======

  console.log("img", setNewImageUrl);

  const getPostbyid = async () => {
    const postdata = await axios.get(
      `${"http://localhost:8080"}/posts/${id}`);
    setNewImageTitle(postdata?.data?.title)
    setNewImageDescription(postdata?.data?.description)
    setNewImageUrl(postdata?.data?.image)
    setEmail(postdata?.data?.email)
  }
  React.useEffect(() => {
    if (id) {
      getPostbyid();
    }
  }, [id]);

  console.log("img", setNewImageUrl)
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
  return (


    <div className="container mt-3">
      <Tab.Container activeKey={activeTab} onSelect={handleTabSelect}>

<<<<<<< HEAD
            <div className="mt-3">
              <Button
                variant="primary"
                className="me-2 ms-5"
                onClick={() => {
                  handleSubmit();
                  handleSendmail();
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
              <Button variant="info" onClick={togglePreview}>
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
=======
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link eventKey="add">New ChangeLogs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="preview">Preview </Nav.Link>
          </Nav.Item>

        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="add">

            <div className="card mt-3"  >
             
                <div className="card-header">
                  <h5 className="mt-2">Add New ChangeLog</h5></div>
                <div className="card-body">


                  <form className="form-outline">
                    <div className="row  mb-3 ms-5 mt-3">
                      <div className="col-md-12">
                        <label for="exampleInputEmail1" className="form-label">Title</label>
                      </div>
                      <div className="col-md-12">   <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Title"
                        value={newImageTitle}
                        onChange={(e) => setNewImageTitle(e.target.value)}
                      />  </div>
                    </div>




                    <div className="row  mb-3 ms-5 mt-3">
                      <div className="col-md-12">
                        <label for="exampleInputEmail1" className="form-label">Email</label>
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
                    </div>




                    <div className="row  mb-3 ms-5 mt-3">
                      <div className="col-md-12">
                        <label for="exampleInputEmail1" className="form-label">Description</label>
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
                        <label for="exampleInputEmail1" className="form-label">Tag</label>
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
                        <label for="exampleInputEmail1" className="form-label">Upload Image</label>
                      </div>
                      <div className="col-md-12">
                      {newImageUrl && (
                      <img className="img-thumbnail" src={`${baseURL}/${newImageUrl.replace(/\\/g, "/")}`} alt="Selected Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    )}
                    <input
                      type="file"
                      className="form-control "
                      onChange={handleImageChange}
                    />
                      </div>
                      </div>
                   

                    <div className="mt-4">
                      <Button
                        variant="primary"
                        className="me-2 ms-5"
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
             
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
            </div>

          </Tab.Pane>
          <Tab.Pane eventKey="preview">
            <div className="mt-3 ms-5">

              <div>
                <h3 className="mt-2 d-inline-block"  >{newImageTitle} </h3>
                
                 <Badge className="mb-4" bg="primary" pill  >
                  {logType}
                </Badge>
                <p className="mt-2">{newImageDescription}</p>
                {newImageUrl && (
                  <img className="img-thumbnail w-100 mt-3 h-50" src={`${baseURL}/${newImageUrl.replace(/\\/g, "/")}`} alt="Selected Image" />
                )}
                {newImageFile && (
                  <img className="img-thumbnail w-100 mt-3 h-50" src={newImageFile} alt="Selected Image" />
                )}

              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="setting">
            setting
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>




<<<<<<< HEAD
          {/* Toast component for displaying success or error message */}
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
      </div>
=======
>>>>>>> 4958adc23ae572ea5caffe8dbf98d5d2e179c763
    </div>
  );
};

export default AddLogForm;

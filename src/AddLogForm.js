import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { Spinner, Toast } from "react-bootstrap";
import styles from "./App.module.css";

const AddLogForm = ({ sendData, updatePreviewData }) => {
  const { id } = useParams();
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [logType, setLogType] = useState("New"); // State for log type
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false); // State for spinner
  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State for showing toast
  console.log("tost", showToast);
  const handleSubmit = async () => {
    if (
      newImageTitle.trim() !== "" &&
      newImageDescription.trim() !== "" &&
      email.trim() !== "" &&
      newImageFile
    ) {
      setLoading(true); // Show spinner

      sendData(newImageUrl, newImageDescription, newImageTitle);

      try {
        const formData = new FormData();
        formData.append("title", newImageTitle);
        formData.append("description", newImageDescription);
        formData.append("email", email);
        formData.append("image", newImageFile);
        formData.append("type", logType); // Append log type to formData

        let response;
        if (id) {
          response = await axios.put(
            `${process.env.REACT_API_URL}/posts/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post(
            `${process.env.REACT_API_URL}/posts`,
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
        updatePreviewData(newImageUrl, newImageDescription, newImageTitle);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
  };

  const onCancelLog = () => {
    navigate("/");
  };

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

  return (
    <div className="container mt-5">
      <div className="card w-50" style={{ marginLeft: "17rem" }}>
        <div className="card-body">
          <h5 className="card-title">Add New ChangeLog</h5>
          <form style={{ width: "26rem" }} className="form-outline">
            <input
              type="text"
              className="form-control mb-3 ms-5 mt-5"
              placeholder="Title"
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
            />

            <input
              type="email"
              className="form-control mb-3 ms-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              className="form-control mb-3 ms-5"
              placeholder="Enter Description"
              value={newImageDescription}
              onChange={(e) => setNewImageDescription(e.target.value)}
            />
            <select
              className="form-select mb-3 ms-5"
              value={logType}
              onChange={(e) => setLogType(e.target.value)}
            >
              <option value="New">New</option>
              <option value="All entries">All entries</option>
              <option value="Improved">Improved</option>
              <option value="Fixed">Fixed</option>
            </select>
            <input
              type="file"
              className="form-control-file mb-3 ms-5"
              onChange={handleImageChange}
            />

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
            </div>
          </form>

          {showPreview && (
            <div className="mt-3 ms-5">
              <h6>Preview:</h6>
              <div>
                <h3>{newImageTitle}</h3>
                <p>{newImageDescription}</p>
                {newImageUrl && (
                  <img src={newImageUrl} alt="Preview" className="img-fluid" />
                )}
              </div>
            </div>
          )}

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
    </div>
  );
};

export default AddLogForm;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios library
import styles from "./App.module.css";

const AddLogForm = ({ setBlogPost }) => {
  const { id } = useParams();
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [logType, setLogType] = useState("New"); // State for log type
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async () => {
    if (
      newImageTitle.trim() !== "" &&
      newImageDescription.trim() !== "" &&
      email.trim() !== "" &&
      newImageFile
    ) {
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
            `http://localhost:8080/posts/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          response = await axios.post("http://localhost:8080/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        }

        const newPost = response.data;
        setNewImageUrl(newPost.imageUrl);

        setNewImageTitle("");
        setNewImageDescription("");
        setNewImageFile(null);
        navigate("/");
      } catch (error) {
        console.error("Error adding post:", error.message);
      }
    }
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:8080/send-otp", {
        email,
      });
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

  return (
    <div className="container mt-5" >
      <div className="card w-50" style={{marginLeft:"17rem"}}>
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
                  handleSendOTP();
                }}
              >
                Save
              </Button>
              <Button variant="secondary" className="me-2" onClick={onCancelLog}>
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
        </div>
      </div>
    </div>
  );
};

export default AddLogForm;

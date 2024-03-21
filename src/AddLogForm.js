import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library

const AddLogForm = ({ setBlogPost }) => {
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(""); // Use state to store image URL
  // const [newemail, setnewemail] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleAddImage = async () => {
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

        const response = await axios.post(
          "http://localhost:8080/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Assuming the response contains the newly added post
        const newPost = response.data;

        console.log("newPost", newPost);
        // Set the image URL received from the server
        // setNewImageUrl(newPost.image);
        setNewImageUrl(newPost.imageUrl)
        // Reset form fields and navigate back to home
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
      // Make a POST request to backend to send OTP
      const response = await axios.post('http://localhost:8080/send-otp', {
        email,
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
  };

  const onCancelLog = () => {
    navigate("/");
  };

  return (
    <div className="container mb-2" style={{ width: "101%" }}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add New Blog</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={newImageTitle}
            onChange={(e) => setNewImageTitle(e.target.value)}
          />
        
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Enter Description"
            value={newImageDescription}
            onChange={(e) => setNewImageDescription(e.target.value)}
          />
          
          {/* Display the image URL if available */}
          {newImageUrl && (
            <div>
              <p>Image URL: {newImageUrl}</p>
              <img src={newImageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
            </div>
          )}

          <input
            type="file"
            className="form-control-file mb-2"
            onChange={handleImageChange}
          />
          
          <div className="mt-2">
            <Button
              className="btn btn-primary ms-2 m-1"
              onClick={()=>{
                handleAddImage();
                handleSendOTP()
              }}
            >
              Save
            </Button>
            <Button
              className="btn btn-secondary me-2"
              onClick={() => onCancelLog()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLogForm;

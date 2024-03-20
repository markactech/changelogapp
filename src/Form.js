import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { MdCancel } from "react-icons/md";

const Form = ({ setBlogPost, blogpost, onCancel, removePost }) => {
   const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const handleAddImage = () => {
    if (
      newImageTitle.trim() !== "" &&
      newImageDescription.trim() !== "" &&
      newImageUrl.trim() !== "" &&
      newImageFile
    ) {
      const imageUrl = URL.createObjectURL(newImageFile);
      setBlogPost([
        ...blogpost,
        {
          id: Date.now(),
          title: newImageTitle,
          description: newImageDescription,
          imageUrl,
        },
      ]);
      setNewImageTitle(""); // Reset title field
      setNewImageDescription(""); // Reset description field
      setNewImageUrl(""); // Reset image URL field
      setNewImageFile(null); // Reset image file field
    }
  };
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);
    setNewImageUrl(URL.createObjectURL(file));
  };

  const handleRemovePost = (postId) => {
    // Filter out the post with the given postId
    const updatedPosts = blogpost.filter(post => post.id !== postId);
    // Update the state with the filtered posts
    setBlogPost(updatedPosts);
  };

  return (
    <div className="container  mb-2" style={{ width: "101%" }}>
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
          <textarea
            className="form-control mb-2"
            placeholder="Enter Description"
            value={newImageDescription}
            onChange={(e) => setNewImageDescription(e.target.value)}
          />
          <input
            type="file"
            className="form-control-file mb-2"
            onChange={handleImageChange}
          />
          {newImageUrl && (
            <img
              src={newImageUrl}
              alt="Preview"
              className="img-fluid mt-2"
              style={{ maxHeight: "150px" }}
            />
          )}
          <div className="mt-2">
            <Button className="btn btn-primary ms-2 m-1   " onClick={handleAddImage}>
              Save
            </Button>
            <Button className="btn btn-secondary me-2" onClick={() => onCancel(false)}>
               Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

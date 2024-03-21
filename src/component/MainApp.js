import React, { useState } from "react";
import Add from "./Add";
import SearchInput from "../SearchInput";
import Header from "../Header";
import Form from "./Form";
import ViewForm from "./ViewForm";
import { MdCancel } from "react-icons/md";
import Button from "react-bootstrap/Button";
import styles from "./App.module.css";
import Title from "./Title";
import AddLogForm from "../AddLogForm";

function MainApp() {
   const [blogpost, setBlogPost] = useState([]);
  const toggleForm = () => {
    setShowForm(true);
  };
  const handleRemovePost = (postId) => {
    // Filter out the post with the given postId
    const updatedPosts = blogpost.filter(post => post.id !== postId);
    // Update the state with the filtered posts
    setBlogPost(updatedPosts);
  };
  return (
    <div className={styles.fullbody}>
      <Title/>
      <div className="container">
        {!showForm && (
          <Button variant="primary" className={styles.addbutton} onClick={toggleForm}>
            Add
          </Button>
        )}

        {showForm && (
          <div>
            <AddLogForm
              setBlogPost={setBlogPost}
              blogpost={blogpost}
              onCancel={setShowForm}
            />
          </div>
        )}
      </div>

      <Header />
      <SearchInput />
      <ViewForm blogpost={blogpost}  onRemove={handleRemovePost}/>
    </div>
  );
}

export default MainApp;

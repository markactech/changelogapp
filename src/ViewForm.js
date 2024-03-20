import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { BsPlus, BsDash } from "react-icons/bs"; // Import icons from React Icons library
import styles from "./App.module.css";
import { MdDelete } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
function ViewForm({ blogpost, onRemove }) {
  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId]
    });
  };

  const getCurrentDate = () => {
    const currentDate = moment();
    const formattedDate = currentDate.format("MMMM DD, YYYY");
    return formattedDate;
  };

  return (
    <div className="container mt-4">
      <hr />
      {blogpost.map((post) => (
        <>
        <div
          key={post.id}
          className="mb-5"
          style={{ borderRadius: "8px", margin: "2%", marginLeft: "20%" }}
        >
          <div className={styles.dateandnew}>
            <p className={styles.date}>{getCurrentDate()}</p>{" "}
            <Badge className={styles.new} pill  style={{}} >New</Badge>
          </div>{" "}
          {/* Display current date */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h3>{post.title}</h3>
            <span className={styles.deteleicon} onClick={() => onRemove(post.id)}>
              <MdDelete />
            </span>
            <Button
              variant="outline-light"
              className={styles.plusebutton}
              style={{ color: "black", border: "1px solid rgb(184, 175, 175)" }}
              onClick={() => toggleDescription(post.id)}
            >
              {showFullDescription[post.id] ? <BsDash /> : <BsPlus />} {/* Use icons */}
            </Button>
          </div>
          <div>
            {showFullDescription[post.id] ? (
              <p>{post.description}</p>
            ) : (
              <p>{post.description.substring(0, 100)}</p>
            )}
            {showFullDescription[post.id] && (
              <img src={post.imageUrl} alt="Preview" className={styles.image} />
            )}{" "}
            {/* Conditionally render the image */}
          </div>
        </div>
        <hr className=" mt-5" style={{ width: "100%" }} />
        </>
      ))}
    </div>
  );
}

export default ViewForm;

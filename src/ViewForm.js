import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Button from "react-bootstrap/Button";
import { BsPlus, BsDash, BsTrash2 } from "react-icons/bs"; // Import icons from React Icons library
import styles from "./App.module.css";
import { MdDelete } from "react-icons/md";
import Badge from "react-bootstrap/Badge";
import moment from "moment";
import SearchInput from "./SearchInput";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function ViewForm() {
  const [posts, setPosts] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState({});
  const navigate = useNavigate();

  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };

  console.log("Calklkingingingingn");
  const getCurrentDate = () => {
    const currentDate = moment();
    const formattedDate = currentDate.format("MMMM DD, YYYY");
    return formattedDate;
  };

  useEffect(() => {
    console.log("Fetching posts...");
    axios
      .get("http://localhost:8080/posts")
      .then((response) => {
        console.log("Posts:", response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`);
      // Update posts state by removing the deleted post
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const baseURL = "http://localhost:8080"; // Update this with your actual backend URL

  const handleEdit = (id) => {
    navigate(`/editlog/${id}`);
  };

  return (
    <>
      <Header/>
      <SearchInput setPosts={setPosts} />
      <div className="container ">
        <hr />

        {posts.map((post) => (
          <>
            <div
              key={post.id}
              className="mb-5 mt-1"
              style={{ borderRadius: "8px", margin: "3%", marginLeft: "26%" }}
            >
              <div className={styles.dateandnew}>
                <p className={styles.date}>{getCurrentDate()}</p>{" "}
                <Badge className={styles.new} pill style={{}}>
                  New
                </Badge>
              </div>{" "}
              {/* Display current date */}
              <div className="mt-6">
                <h3>{post.title}</h3>

                <Button
                  variant="outline-light"
                  className={styles.plusebutton}
                  style={{
                    color: "black",
                    border: "1px solid rgb(184, 175, 175)",
                  }}
                  onClick={() => toggleDescription(post.id)}
                >
                  {showFullDescription[post.id] ? (
                    <BsDash
                      className="mb-2"
                      style={{ position: "relative", right: "8px" }}
                    />
                  ) : (
                    <BsPlus
                      className="mb-2  "
                      style={{ position: "relative", right: "8px",bottom:"2px"}}
                    />
                  )}{" "}
                  {/* Use icons */}
                </Button>
                {/* <Button
              variant="danger"
              className={styles.deleteButton}
              onClick={() => handleDelete(post.id)}
            >
              <MdDelete />
            </Button> */}
              </div>
              <div>
                <div className={styles.descrip}>
                  {console.log("post", post)}
                  {showFullDescription[post.id] ? (
                    <p>{post.description}</p>
                  ) : (
                    <p>{post.description.substring(0, 200)}</p>
                  )}
                  {showFullDescription[post.id] && (
                    <>
                      <img
                        src={`${baseURL}/${post?.media.replace(/\\/g, "/")}`}
                        alt="Preview"
                        className={styles.image}
                      />
                      <span
                        className={styles.deteleicon}
                        onClick={() => handleDelete(post.id)}
                      >
                        <BsTrash2 />
                      </span>
                      <span className={styles.editicon}
                      onClick={()=>handleEdit(post.id)}>
                        <HiPencilAlt />
                      </span>
                    </>
                  )}
                </div>
                {/* Conditionally render the image */}
              </div>
            </div>

            <hr className=" mt-5" style={{ width: "100%" }} />
          </>
        ))}
      </div>
    </>
  );
}

export default ViewForm;

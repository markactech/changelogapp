import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Button from "react-bootstrap/Button";
import { BsPlus, BsDash, BsTrash2 } from "react-icons/bs"; // Import icons from React Icons library
import styles from "./App.module.css";
 import Badge from "react-bootstrap/Badge";
import moment from "moment";
import SearchInput from "./SearchInput";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./component/Footer ";

function ViewForm() {
  const [allpost,setAllpost] = useState([])
  const [posts, setPosts] = useState([]);
   const [showFullDescription, setShowFullDescription] = useState({});
  const navigate = useNavigate();

  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };


 

  useEffect(() => {
    console.log("Fetching posts...");
    axios
      .get("http://localhost:8080/posts")
      .then((response) => {
        console.log("Posts:", response.data);
        setPosts(response.data);
        setAllpost(response.data)
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
      setAllpost(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const baseURL = "http://localhost:8080"; // Update this with your actual backend URL

  const handleEdit = (id) => {
    navigate(`/editlog/${id}`);
  };
  const setFilter=(e)=>{
   const filterpost =  posts.filter(x=>{
    if(e!=='all'){
      return x.tag===e
    }
   else{
    return x
   }
  })
  setAllpost(filterpost)
 
   }
  return (
    <>
      <Header/>
      <SearchInput setPosts={setPosts} setFilter={setFilter}/>
      <div className="container mb-5">
        <hr />

        {allpost.map((post) => (
          <>
            <div
              key={post.id}
              className="mb-5 mt-1"
              style={{ borderRadius: "8px", margin: "3%", marginLeft: "26%" }}
            >
              <div className={styles.dateandnew}>
                <p className={styles.date}>{ moment(post.createdAt).format('MMMM D ,yyyy')}</p>{" "}
                <Badge className={styles.new} pill style={{}}>
                  {post.tag}
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
                   {showFullDescription[post.id] ? (
                    <p>{post.description}</p>
                  ) : (
                    <p>{post.description.substring(0, 200)}</p>
                  )}
                  {showFullDescription[post.id] && (
                    <>
                      <img
                        src={`${baseURL}/${post?.image.replace(/\\/g, "/")}`}
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
      <Footer/> 
    </>
  );
}

export default ViewForm;

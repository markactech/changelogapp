import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Button from "react-bootstrap/Button";
import { BsPlus, BsDash, BsTrash2 } from "react-icons/bs"; // Import icons from React Icons library
import styles from "./App.module.css";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import SearchInput from "./SearchInput";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./component/Footer ";
import CreatableSelect from "react-select/creatable";
import "./ViewForm.css";

function ViewForm() {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All entries");
  const [showFullDescription, setShowFullDescription] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMails, setSelectedMails] = useState([]);
  const navigate = useNavigate();

  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };

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

        const initialShowDescriptionState = {};
        response.data.forEach((post) => {
          initialShowDescriptionState[post.id] = true;
        });
        setShowFullDescription(initialShowDescriptionState);
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

  const handleCheckboxChange = (postId) => {
    setSelectedPosts((prevSelectedPosts) => {
      if (prevSelectedPosts.includes(postId)) {
        return prevSelectedPosts.filter((id) => id !== postId);
      } else {
        return [...prevSelectedPosts, postId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
    } else {
      const allPostIds = posts.map((post) => post.id);
      setSelectedPosts(allPostIds);
    }
    setSelectAll(!selectAll);
  };

  const handleCreatableSelectChange = (newValue) => {
    setSelectedMails(newValue);
    console.log("Selected mails:", newValue);
    console.log("selected Posts", selectedPosts);
  };

  const handleSendData = async () => {
    try {
      const data = {
        selectedIds: selectedPosts,
        selectedMails: selectedMails.map((mail) => mail.value),
      };
      console.log(data);
      await axios.post(`http://localhost:8080/send-multimail`, data);

      // setSelectedPosts([]);
      // setSelectedMails([]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <Header />
      <SearchInput
        setPosts={setPosts}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="container mb-5">
        {posts.length > 0 ? (
          <>
            <div className="mx-5 mb-5 d-flex">
              <div className="w-50">
                <CreatableSelect
                  isMulti
                  isClearable
                  onChange={handleCreatableSelectChange}
                />
              </div>
              <div style={{ marginLeft: "20px" }}>
                <Button onClick={handleSendData}>Send</Button>
              </div>
            </div>

            <div className="mb-3">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="large-checkbox"
              />{" "}
              Select All
            </div>

            <hr />
            {posts
              .filter(
                (post) =>
                  selectedFilter === "All entries" ||
                  post.tag === selectedFilter
              )
              .map((post) => (
                <>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleCheckboxChange(post.id)}
                    className="large-checkbox"
                  />{" "}
                  <div
                    key={post.id}
                    className="mb-5 mt-1"
                    style={{
                      borderRadius: "8px",
                      margin: "3%",
                      marginLeft: "26%",
                    }}
                  >
                    <div className={styles.dateandnew}>
                      <p className={styles.date}>
                        {moment(post.createdAt).format("MMMM D ,yyyy")}
                      </p>{" "}
                      <div className={styles.new}>
                        <span
                          className={
                            post.tag === "New"
                              ? "badge green"
                              : post.tag === "Improved"
                              ? "badge blue"
                              : "badge yellow"
                          }
                          style={{}}
                        >
                          {post.tag}
                        </span>
                      </div>
                    </div>
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
                            style={{
                              position: "relative",
                              right: "8px",
                              bottom: "2px",
                            }}
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
                              src={`${baseURL}/${post?.image.replace(
                                /\\/g,
                                "/"
                              )}`}
                              alt="Preview"
                              className={styles.image}
                            />
                            <span
                              className={styles.deteleicon}
                              onClick={() => handleDelete(post.id)}
                            >
                              <BsTrash2 />
                            </span>
                            <span
                              className={styles.editicon}
                              onClick={() => handleEdit(post.id)}
                            >
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
          </>
        ) : (
          <div className="d-flex justify-content-center">
            No data to display
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ViewForm;

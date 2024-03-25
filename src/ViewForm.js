import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Button from "react-bootstrap/Button";
import { BsPlus, BsDash, BsTrash2 } from "react-icons/bs"; // Import icons from React Icons library
import styles from "./App.module.css";
import moment from "moment";
import SearchInput from "./SearchInput";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./component/Footer ";
import CreatableSelect from "react-select/creatable";
import "./ViewForm.css";
import { CiSearch } from "react-icons/ci";
import { Spinner } from "react-bootstrap";

function ViewForm() {
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All entries");
  const [showFullDescription, setShowFullDescription] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [allEmails, setAllEmails] = useState([]);
  const [loader, setLoader] = useState(false)
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();
  const [NewseachTerm, setNewSearchTerm] = useState("")
  const toggleDescription = (postId) => {
    setShowFullDescription({
      ...showFullDescription,
      [postId]: !showFullDescription[postId],
    });
  };
  useEffect(() => {
    getAllEmails(); // Fetch all emails
  }, []);

  const getAllEmails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/emaillist");
      console.log("response", response?.data);
      const allemail = response?.data?.map(x => {
        return {
          label: x?.email,
          value: x?.email
        }
      })
      setAllEmails(allemail);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };
  const setPasstoparent = (data) => {
    setNewSearchTerm(data)
  }
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


  const handleCreatableSelectChange = (newValue) => {
    console.log("Selected mails:", newValue);
    setSelectedEmails(newValue);
  };


  const sendEmailformultiple = () => {
    setLoader(true)
    const getpostlist = posts?.filter(x => selectedPosts.includes(x.id))
    selectedEmails?.forEach(async (p, index) => {
      const postlist = getpostlist?.map(x => {
        return {
          ...x,
          email: p?.value
        }
      })

      postlist?.map(async (data) => {
        try {
          await axios.post(`http://localhost:8080/sendEmail`, data);
        } catch (error) {
          console.error("Error deleting post:", error);
        }


      })

    })
    setLoader(false);
    setSelectedEmails([]);
    setSelectAll([])
    setSelectedPosts([])

  }
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
    } else {
      const allPostIds = posts.map((post) => post.id);
      setSelectedPosts(allPostIds);
    }
    setSelectAll(!selectAll);
  };


  return (
    <>
      <Header />
      <SearchInput
        setPosts={setPosts}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        setPasstoparent={setPasstoparent}

      />
      <div className="container mb-5">
        {posts.length > 0 ? (
          <>
            <div className="mb-3 d-flex justify-content-evenly"
              style={{}}>
              <div className="w-50" style={{ position: "relative" }}>
                <CreatableSelect
                  isMulti
                  isClearable
                  onChange={handleCreatableSelectChange}
                  options={allEmails}
                  value={selectedEmails}
                />
              </div>
              <Button disabled={loader} onClick={sendEmailformultiple} style={{ position: "relative", right: "140px" }} >
                {loader ? (
                  <Spinner animation="border" size="sm" /> // Show spinner when loading
                ) : (
                  "Send"
                )}

              </Button>
            </div>

            <div style={{ position: "relative ", bottom: "40px" }}>
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
                    className={styles.groupbox}

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
          <div>
            <div className="d-flex justify-content-center text-secondary  ">
              < CiSearch style={{ color: "", width: 100, height: "100", fontWeight: "100" }} />
            </div>
            <p className="d-flex justify-content-center">We couldn’t find any changelog entries matching<span className="fw-bold">"{NewseachTerm}"</span> </p>
            <p className="d-flex justify-content-center">Try searching for other keywords.</p>
          </div>
        )}

      </div>
      <Footer />
    </>
  );
}

export default ViewForm;

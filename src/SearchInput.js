import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiFilter } from "react-icons/ci";
import styles from "./App.module.css";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

export default function SearchInput({ setPosts }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length >= 4 || value.length==0) {
      handleSearch(value);
    } else {
      setPosts([]);
    }
  };

  const handleSearch = (term) => {
    // Send a GET request to the backend to search for posts
    axios
      .get(`http://localhost:8080/search?searchTerm=${term}`)
      .then((response) => {
        if (response.data) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
        // Handle the retrieved posts
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      });
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-end ">
          <Col className="mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                style={{ width: "10px", position: "relative", left: "14%" }}
                aria-label="Text input with radio button"
                placeholder="Search Entries..."
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col>
            <Dropdown className={styles.filterbutton}>
              <Dropdown.Toggle
                variant="outline-light"
                style={{ color: "black", border: "1px solid #EEF0F2" }}
              >
                <CiFilter style={{ marginBottom: "10px", margin: "5px" }} />
                Filters
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.filterdropdown}>
                <p style={{ marginLeft: "15px" }}>Filter</p>
                <hr />
                <Dropdown.Item>New</Dropdown.Item>
                <Dropdown.Item>All entries</Dropdown.Item>
                <Dropdown.Item>Improved</Dropdown.Item>
                <Dropdown.Item>Fixed</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

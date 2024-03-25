import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiFilter, CiSearch } from "react-icons/ci";
import styles from "./App.module.css";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

export default function SearchInput({
  setPosts,
  selectedFilter,
  setSelectedFilter,
  setPasstoparent
  
  
}) {
  const [NewseachTerm, setNewSearchTerm] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    handleSearch(searchedTerm);
  }, [selectedFilter, searchedTerm]); 

  const handleChange = (event) => {
    const value = event.target.value;
    setNewSearchTerm(value);
    setPasstoparent(value)
    if (value.length >= 3 || value.length === 0) {
      setSearchedTerm(value);
    } else {
      setNoResults(false);
      setPosts([]);
    }
  };

  const handleSearch = (term) => {
    axios
      .get(`http://localhost:8080/search?searchTerm=${term}`)
      .then((response) => {
        if (response.data) {
          setPosts(response.data);
          setNoResults(response.data.length === 0);
        } else {
          setPosts([]);
          setNoResults(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFilterSelect = (selectedValue) => {
    setSelectedFilter(selectedValue);
  };

  return (
    <div>
      <Container className=" d-flex justify-content-end  mb-5">
        <Row className="w-30">
          <Col className="mt-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                // style={{ width: "10px", position: "relative", left: "14%" }}
                aria-label="Text input with radio button"
                placeholder="Search Entries..."
                value={NewseachTerm}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col>
            <Dropdown className={styles.filterbutto}>
              <Dropdown.Toggle
                variant="outline-light"
                style={{
                  color: "black",
                  border: "1px solid #EEF0F2",
                  marginTop: "5px",
                }}
              >
                <CiFilter style={{ marginBottom: "10px", margin: "5px" }} />
                Filters
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.filterdropdown}>
                <p style={{ marginLeft: "15px" }}>Filter</p>
                <hr />
                <Dropdown.Item onClick={() => handleFilterSelect("New")}>
                  New
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleFilterSelect("All entries")}
                >
                  All entries
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect("Improved")}>
                  Improved
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect("Fixed")}>
                  Fixed
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {/* {noResults && (
          <div className="d-flex flex-column align-items-center mt-3">
            <CiSearch
              style={{
                color: "gray",
                width: 100,
                height: 100,
                fontWeight: 100,
              }}
            />
            <p className="text-secondary">
              No Logs Found for "{NewseachTerm}"
            </p>
            <p className="text-secondary">Try a Different Search</p>
          </div>
        )} */}
      </Container>
    </div>
  );
}


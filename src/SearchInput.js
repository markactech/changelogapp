import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiFilter } from "react-icons/ci";
import { IoSearch, IoChevronDownOutline } from "react-icons/io5"; // Import the IoSearch icon
import Button from "react-bootstrap/Button";
import styles from "./App.module.css";
import { Dropdown } from "react-bootstrap";


export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-end ">
          <Col className="mt-2 ">
          
            <div className="input-group">
              <input
              
                type="text"
                className="form-control"
                style={{ width: "10px",position:"relative" , left:"14%" }}
                aria-label="Text input with radio button"
                placeholder="Search Entries..."
                value={searchTerm}
                onChange={handleChange}
              />
              {/* <IoSearch
              style={{ position: "relative", right: "95%" , top:"10px" }}
              className=""
            /> */}
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
                <p>Filter</p>
                {/* Add Dropdown.Item components for each filter option */}
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

import React from "react";
import { CiWifiOn } from "react-icons/ci";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./App.module.css";
function Header() {
  return (
    <header>
      <Container className="me-3 mt-4">
        <Row>
          <h1>Changelog</h1>
          <p>
            Follow up on the latest improvements and updates. |{" "}
            <span className={StyleSheet.icon}>
              <CiWifiOn />
            </span>
            RSS{" "}
          </p>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

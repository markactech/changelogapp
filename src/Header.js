import React from "react";
 import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
  function Header() {
  return (
    <header>
      <Container className="me-3 mt-4">
        <Row>
          <h1>Changelog</h1>
          <p>
            Follow up on the latest improvements and updates.
            
          </p>
        </Row>
      </Container>
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import { MdCancel } from "react-icons/md";
import Form from "./Form";
import styles from "./App.module.css";
function Add() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Container>
        {!showForm && (
          <Button variant="primary" className={styles.addbutton}  onClick={toggleForm}>
            Add
          </Button>
        )}
        {showForm && (
          <div>
            <Form onCancel={setShowForm} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Add;

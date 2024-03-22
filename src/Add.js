import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styles from "./App.module.css";
import { IoAddCircleSharp } from "react-icons/io5";

function Add() {
  const navigate = useNavigate();

  const navigateToAnotherComponent = () => {
    navigate("/addlogs");
  };

  return (
    <div>
      <Container>
        <Button
          variant="primary"
          className={styles.addbutton}
          onClick={navigateToAnotherComponent}
        >
         <IoAddCircleSharp className="me-2 mb-1"/> Add logs
        </Button>
      </Container>
    </div>
  );
}

export default Add;

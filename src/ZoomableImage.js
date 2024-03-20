import React, { useState } from "react";
import styles from "./App.module.css";

const ZoomableImage = ({ src }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className={styles.container}>
      <img
        src={src}
        alt="Preview"
        className={zoomed ? styles.zoomed : styles.normal}
        onClick={() => setZoomed(!zoomed)}
      />
    </div>
  );
};

export default ZoomableImage;

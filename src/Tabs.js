import React from "react";
import { useState } from "react";
import AddLogForm from "./AddLogForm";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [previewData, setPreviewData] = useState({
    imageUrl: "",
    description: "",
    title: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const updatePreviewData = (imageUrl, description, title) => {
    setPreviewData({ imageUrl, description, title });
  };

  return (
    <div className="container mt-5">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
            onClick={() => handleTabChange("tab1")}
          >
            Add
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
            onClick={() => handleTabChange("tab2")}
          >
            Preview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
            onClick={() => handleTabChange("tab3")}
          >
            Settings
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        <div className={`tab-pane ${activeTab === "tab1" ? "active" : ""}`}>
          <AddLogForm updatePreviewData={updatePreviewData} />
        </div>
        <div className={`tab-pane ${activeTab === "tab2" ? "active" : ""}`}>
          <div className="mt-3 ms-5">
            <h6>Preview:</h6>
            <div>
              <h3>{previewData.title}</h3>
              <p>{previewData.description}</p>
              {previewData.imageUrl && (
                <img
                  src={previewData.imageUrl}
                  alt="Preview"
                  className="img-fluid"
                />
              )}
            </div>
          </div>
        </div>
        <div className={`tab-pane ${activeTab === "tab3" ? "active" : ""}`}>
          <h6>Settings page</h6>
        </div>
      </div>
    </div>
  );
}

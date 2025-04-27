import React from "react";
import { createRoot } from "react-dom/client";
import "./PopupComponent.scss";
import UserSelections from "./components/UserSelections";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Popup = () => {
  return (
    <>
      <div id="popup-window">
        <UserSelections />
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

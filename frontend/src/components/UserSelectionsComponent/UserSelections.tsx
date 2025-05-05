import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IFilterSettings } from "../../interfaces/IFilterSettings";
import {
  defaultPreferences,
  UserPreferencesService,
} from "../../services/UserPreferencesService";
import { setChromeStorage } from "../../functions/chromeStorage";

import "./UserSelections.scss";

const UserSelections = () => {
  const [userPreferences, setPreferences] = useState<IFilterSettings>(
    defaultPreferences!
  );

  const handleToggle = (key: keyof IFilterSettings) => {
    const updatedPreferences = {
      ...userPreferences,
      [key]: !userPreferences[key],
    };
    setChromeStorage(updatedPreferences);

    UserPreferencesService.setUserPreferences(updatedPreferences);
  };

  useEffect(() => {
    UserPreferencesService.subscribe((updatedPreferences) => {
      setPreferences(updatedPreferences);
    });
  }, []);

  return (
    <div id="user-selections">
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand
            className="text-white d-flex align-items-center justify-content-between"
            href="#"
          >
            <img className="header-logo" src="icon.png" alt="x-filter-icon" /> X
            Filter
          </Navbar.Brand>
          <Form className="ms-auto">
            <Form.Check
              className="text-white"
              type="switch"
              id="body-switch-0"
              label="Off / On"
              checked={userPreferences.enabled}
              onChange={() => handleToggle("enabled")}
            />
          </Form>
        </Container>
      </Navbar>

      <Container className="mt-4 h-100 w-100">
        <Row>
          <Col xs="auto" className=" w-100">
            <Form>
              <Form.Check
                type="switch"
                id="body-switch-2"
                label="Advertisements"
                checked={userPreferences.ads}
                onChange={() => handleToggle("ads")}
                disabled={!userPreferences.enabled}
              />

              <div className="border-top my-3 w-100"></div>

              <div className="d-flex align-items-center justify-content-between">
                <Form.Check
                  type="switch"
                  id="body-switch-1"
                  label="Political"
                  checked={userPreferences.political}
                  onChange={() => handleToggle("political")}
                  disabled={!userPreferences.enabled}
                />

                <span className="ms-3">
                  AI <i className="bi bi-robot"></i>
                </span>
              </div>
            </Form>

            <div className="border-top my-3 w-100"></div>
          </Col>
        </Row>

        {/* Debugging: show current preferences */}
        {/* <pre className="mt-3">{JSON.stringify(userPreferences, null, 2)}</pre> */}
      </Container>
    </div>
  );
};

export default UserSelections;

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { IFilterSettings } from "../interfaces/IFilterSettings";
// import { filterSettings as defaultPreferences } from "../functions/content";
// import { loadFilterSettings } from "../functions/filter";

const UserSelections = () => {
  //   const [userPreferences, setPreferences] = useState<IFilterSettings>(
  //     defaultPreferences!,
  //   );

  //   const handleToggle = (key: keyof IFilterSettings) => {
  //     const updatedPreferences = {
  //       ...userPreferences,
  //       [key]: !userPreferences[key],
  //     };

  //     chrome.storage.sync.set({ filterSettings: updatedPreferences });

  //     setPreferences(updatedPreferences);
  //   };

  //   useEffect(() => {
  //     loadFilterSettings().then((result) => {
  //       setPreferences(result);
  //     });
  //   }, []);

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand className="text-white" href="#">
            <span>
            <i className="bi bi-funnel"></i> X Filter
            </span>
          </Navbar.Brand>
          <Form className="ms-auto">
            <Form.Check
              className="text-white"
              type="switch"
              id="body-switch-0"
              label="Off / On"
              // checked={userPreferences.enabled}
              // onChange={() => handleToggle("enabled")}
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
                id="body-switch-1"
                label="Political"
                // checked={userPreferences.political}
                // onChange={() => handleToggle("political")}
                // disabled={!userPreferences.enabled}
              />
              <div className="border-top my-3 w-100"></div>
              <Form.Check
                type="switch"
                id="body-switch-2"
                label="Advertisements"
                // checked={userPreferences.ads}
                //onChange={() => handleToggle("ads")}
                // disabled={!userPreferences.enabled}
              />
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Debugging: show current preferences */}
      <pre className="mt-3">{JSON.stringify({}, null, 2)}</pre>
    </>
  );
};

export default UserSelections;

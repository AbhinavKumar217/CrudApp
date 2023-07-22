import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Form, Button, FloatingLabel } from "react-bootstrap";

function AddEmployee() {
  const employeeFirstName = useRef();
  const employeeLastName = useRef();
  const employeeDepartment = useRef();
  const employeeSkills = useRef();
  const employeeImageUrl = useRef();

  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  function AlertDismissibleExample() {
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Status Code : ???</Alert.Heading>
          <p>
            Would you really know what the code would mean?
            <br />
            Just check if all the details  are valid or not.
          </p>
        </Alert>
      );
    }
  }

  function addEmployeeHandler() {
    var payload = {
      firstName: employeeFirstName.current.value,
      lastName: employeeLastName.current.value,
      department: employeeDepartment.current.value,
      skills: employeeSkills.current.value,
      imageUrl: employeeImageUrl.current.value,
    };
    axios.post("https://localhost:7035/api/Employee", payload)
    .then((response) => {
        navigate("/")
    })
    .catch((error) => {
      setShow(true)
    })
  }

  return (
    <>
    <AlertDismissibleExample />
      <legend>Add a New Employee</legend>
      <Form>
      <FloatingLabel
          controlId="floatingInput"
          label="First Name"
          className="mb-3"
        >
          <Form.Control type="text" ref={employeeFirstName} />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Last Name"
          className="mb-3"
        >
          <Form.Control type="text" ref={employeeLastName} />
        </FloatingLabel>

          <FloatingLabel
          controlId="floatingInput"
          label="Department"
          className="mb-3"
        >
          <Form.Control type="text" ref={employeeDepartment} />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Skills"
          className="mb-3"
        >
          <Form.Control type="text" ref={employeeSkills} />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Image Url"
          className="mb-3"
        >
          <Form.Control type="text" ref={employeeImageUrl} />
        </FloatingLabel>

        <Button variant="primary" type="button" onClick={addEmployeeHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default AddEmployee;

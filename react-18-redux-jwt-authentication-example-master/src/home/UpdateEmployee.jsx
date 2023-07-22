import { useRef, useEffect, useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateEmployee() {
  const employeeFirstName = useRef();
  const employeeLastName = useRef();
  const employeeDepartment = useRef();
  const employeeSkills = useRef();
  const employeeImageUrl = useRef();

  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`https://localhost:7035/api/Employee/${id}`)
    .then((response) => {
        employeeFirstName.current.value = response.data.firstName
        employeeLastName.current.value = response.data.lastName
        employeeDepartment.current.value = response.data.department
        employeeSkills.current.value = response.data.skills
        employeeImageUrl.current.value = response.data.imageUrl
    })
  }, [])

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

  function UpdateEmployeeHandler() {
    var payload = {
      id:id,
      firstName: employeeFirstName.current.value,
      lastName: employeeLastName.current.value,
      department: employeeDepartment.current.value,
      skills: employeeSkills.current.value,
      imageUrl: employeeImageUrl.current.value,
    };

    axios.put("https://localhost:7035/api/Employee", payload)
    .then((response) => {
      navigate("/")
    })
    .catch((error) => {
      setShow(true)
    })
    
  }

  return (
    <>
      <legend>Update an Employee</legend>
      <AlertDismissibleExample />
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

        <Button variant="primary" type="button" onClick={UpdateEmployeeHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateEmployee;
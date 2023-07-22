import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DeleteConfirmation from "_components/DeleteConfirmation";

export { Home };

function Home() {
  const { user: authUser } = useSelector((x) => x.auth);

  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [employeetoDelete, setEmployeeToDelete] = useState(0);

//   const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7035/api/Employee").then((response) => {
      setEmployees((existingData) => {
        return response.data;
      });
    });
  }, []);

  console.log(employees)

  function showConfirmDeletePopupHandler(id) {
    setShowModal(true);
    setEmployeeToDelete(id);
  }

  function closeConfirmDeletePopupHandler() {
    setShowModal(false);
    setEmployeeToDelete(0);
  }

  function deleteConfirmHandler() {
    axios
      .delete(`https://localhost:7035/api/Employee/${employeetoDelete}`)
      .then((response) => {
        setEmployees((existingdata) => {
          return existingdata.filter((_) => _.id !== employeetoDelete);
        });
        setEmployeeToDelete(0);
        setShowModal(false);
      });
  }

  return (
    <div>
      <h1>Hello {authUser?.firstName}!</h1>
      

      <Container>
    <DeleteConfirmation showModal={showModal} title = "Delete Confirmation!" body = "Do you really want to delete the employee data?" closeConfirmDeletePopupHandler = {closeConfirmDeletePopupHandler} deleteConfirmHandler = {deleteConfirmHandler} />
      <Row className="mt-2">
        <Col md={{ span: 5, offset: 4 }}>
          <NavLink to="/add-employee" className="nav-item nav-link"><Button className="addbutton">Add Employee Data</Button></NavLink>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4 mt-1">
        {employees.map((sv) => (
          <Col key={sv.id}>
            <Card>
              <Container>
              <Card.Img variant="top" src={sv.imageUrl} />
              <Card.Body>
                <Card.Title>{sv.firstName + " " + sv.lastName}</Card.Title>
                <Card.Text>
                  <b>Department : </b> {sv.department}
                </Card.Text>
                <Card.Text>
                  <b>Skills : </b> {sv.skills}
                </Card.Text>
                <NavLink to={`/update-employee/${sv.id}`} className="nav-item nav-link"><Button>Update Employee Data</Button></NavLink>
                <Button
                  className="deletebutton"
                  variant="danger"
                  type="button"
                  onClick={()=> {showConfirmDeletePopupHandler(sv.id)}}
                >
                  Delete Employee Data
                </Button>
              </Card.Body>
              </Container>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
    </div>
  );
}

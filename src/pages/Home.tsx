import { Link } from "react-router-dom";
import { Table, Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Row>
      <Col xs={9}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th style={{ width: "10%" }}>Top Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link to="/info">lurem ipsum dollar asd sad </Link>
              </td>
              <td>Otto</td>
              <td style={{ textAlign: "center" }}>
                <Form.Check // prettier-ignore
                  type="switch"
                />
              </td>
              <td>
                <ButtonGroup aria-label="Basic example">
                  <Button variant="danger">Delete</Button>
                </ButtonGroup>
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
      <Col>
        <h5>Filter By Status</h5>
        <Form.Select>
          <option value="">Select Status</option>
          <option value="Publish">Publish</option>
          <option value="Draft">Draft</option>
          <option value="Blocked">Blocked</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Home;

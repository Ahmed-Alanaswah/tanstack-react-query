import useGetPosts from "../hooks/useGetPosts";
import { Form, Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostList = () => {
  const { isLoading, isError, error, data } = useGetPosts();
  if (isLoading) {
    return <div>data loading pease wait </div>;
  }

  if (isError) {
    return <div>error : {error.message}</div>;
  }
  return (
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
        {data?.map((el, idx) => (
          <tr>
            <td>{idx++}</td>
            <td>
              <Link to="/info">{el.title}</Link>
            </td>
            <td>{el.status}</td>
            <td style={{ textAlign: "center" }}>
              <Form.Check checked={!!el.topRate} type="switch" />
            </td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostList;

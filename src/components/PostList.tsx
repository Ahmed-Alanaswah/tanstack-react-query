import useGetPosts from "../hooks/useGetPosts";
import { Form, Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { postStatusType } from "../types";
import useSearch from "../hooks/useSearch";
import { useState } from "react";

interface PostListProps {
  selectedPostStatus: postStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);
  const { isLoading, isError, error, data, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );
  const searchData = useSearch(searchQuery);
  if (isLoading || searchData.isLoading) {
    return <div>data loading pease wait </div>;
  }

  if (isError) {
    return <div>error : {error.message}</div>;
  }

  if (searchData.isError) {
    return <div>error : {searchData.error.message}</div>;
  }

  return (
    <>
      {isStale && searchQuery.length == 0 && (
        <Button onClick={() => refetch()} className="mb-3">
          update data
        </Button>
      )}
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
          {searchQuery.length == 0 &&
            data?.map((el, idx) => (
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

          {searchQuery.length > 0 &&
            searchData?.data?.map((el, idx) => (
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
      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;

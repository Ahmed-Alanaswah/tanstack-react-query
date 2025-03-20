import { useSearchParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import useGetPost from "../hooks/useGetPost";
import React, { useState } from "react";
import useAddComment from "../hooks/useAddComment";

const Info = () => {
  const [comment, setComment] = useState("");
  const [searcParams] = useSearchParams();
  const id = searcParams.get("id") as string;
  const paramType = searcParams.get("type") as string;
  const paramKey = searcParams.get("key") as string;

  const { data, isLoading, error, isError } = useGetPost(
    id,
    paramKey,
    paramType
  );
  const addComment = useAddComment();
  if (isLoading) {
    return <p>loadin please wait</p>;
  }

  if (isError) {
    <div> error:{error.message}</div>;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      {
        body: comment,
        post_id: +id,
      },
      {
        onSuccess: () => setComment(""),
      }
    );
  };

  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title: {data?.title} </h4>
          <p>Status: {data?.status} </p>
          <p>Top Rate:{data?.topRate}</p>
          <p>Body: {data?.body} </p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>
          <p>Comment 1</p>
          <p>Comment 2</p>
        </div>
      </Col>
    </Row>
  );
};

export default Info;

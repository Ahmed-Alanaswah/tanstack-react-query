import { Form } from "react-bootstrap";
import { postStatusType } from "../types";
import React from "react";

interface PostFilterProps {
  selectedPostStatus: postStatusType;
  setSelectedPostStatus: (value: postStatusType) => void;
}

const PostFilter = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: PostFilterProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostStatus(e.target.value as postStatusType);
  };
  return (
    <div>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
        <option value="all">Select Status</option>
        <option value="Publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="blocked">Blocked</option>
      </Form.Select>
    </div>
  );
};

export default PostFilter;

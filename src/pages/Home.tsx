import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { postStatusType } from "../types";
import SearchQueryCopmonent from "../components/SearchQuery";

const Home = () => {
  const [selectedPostStatus, setSelectedPostStatus] =
    useState<postStatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Row>
      <Col xs={9}>
        <PostList
          selectedPostStatus={selectedPostStatus}
          searchQuery={searchQuery}
        />
      </Col>
      <Col>
        <SearchQueryCopmonent setSearchQuery={setSearchQuery} />
        {searchQuery.length == 0 && (
          <PostFilter
            selectedPostStatus={selectedPostStatus}
            setSelectedPostStatus={setSelectedPostStatus}
          />
        )}
      </Col>
    </Row>
  );
};

export default Home;

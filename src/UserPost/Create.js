import React, { useState } from "react";
import { Input, Button, Card } from "antd";
import LoadingCard from "./LoadingCard";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/features/postSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const [showPost, setShowPost] = useState(false);
  const dispatch = useDispatch();
  const { loading, post, edit } = useSelector((state) => ({ ...state.app }));
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };
  

  const showPostBlog = () => {
    return (
      <>
        {loading ? (
          <LoadingCard count={1} />
        ) : (
          <div>
            <Card type="inner" title={post[0].title}>
              <p>User Id: {post[0].id}</p>
              <span>{post[0].body}</span>
            </Card>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container" style={{ marginTop: "20px" }}>
          <h1>Create Post</h1>
          <Input
            placeholder="Enter title"
            type="text"
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            value={values.title}
            style={{ width: "400px" }}
          />
          <br />

          <br />
          <br />
          <Input
            placeholder="Enter Body"
            type="text"
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            value={values.body}
            style={{ width: "400px" }}
            size="large"
          />
          <br />
          <br />
          <br />
          <br />
          <div style={{ margin: 10 }}>
            <Button style={{ width: "100px" }} onClick={() => navigate("/")}>
              Go Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!(values.body && values.title)}
              style={{ width: "100px", position: "relative", left: "8px" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <br />
      <br />
      {showPost && <div>{showPostBlog()}</div>}
    </>
  );
};

export default CreatePost;

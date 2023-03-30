import React, { useState } from "react";
import LoadingCard from "./LoadingCard";
import {
  getPost,
  deletePost,
  setEdit,
  updatePost,
} from "../redux/features/postSlice";
import { Button, Card, Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const UserPost = () => {
  const [id, setId] = useState();
  const [bodyText, setBodyText] = useState("");
  const navigate = useNavigate();

  const {register,formState:{errors}}=useForm()
  const { loading, post, edit, body } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    setBodyText(body);
  }, [body]);

  const onChangeInput = (e) => {
    setId(e.target.value);
  };

  const fetchUserPost = () => {
    if (!id) {
      window.alert("Please enter id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Fetch Post</h1>
      <form>
      <Input
        placeholder="Enter User Id"
        type="number"
        onChange={onChangeInput}
        value={id}
        style={{ width: "300px" }}
      />
      <br />
      <br />
      <Space size="middle" style={{ margin: 10 }}>
        <Button type="primary" onClick={fetchUserPost}>
          Fetch User Post
        </Button>
        <Button type="primary" onClick={() => navigate("/create")}>
          Create User Post
        </Button>
        
      </Space>
      </form>
      <br />
      <br />
      {loading ? (
        <LoadingCard count={1} />
        // <h1>loading</h1>
      ) : (
        <>
          {post.length > 0 && (
            <div className="site-card-border-less-wrapper">
              <Card type="inner" title={post[0].title}>
                <p>User Id: {post[0].id}</p>
                {edit ? (
                  <>
                    <Input.TextArea
                    {...register("id",{
                      required:"required field!!!"
                    })}
                      rows={4}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                    />
                    <small></small>
                    <Space
                      size="middle"
                      style={{
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          dispatch(
                            updatePost({
                              id: post[0].id,
                              body: bodyText,
                              title: post[0].title,
                            })
                          );
                          dispatch(
                            setEdit({ edit: false, body: post[0].body })
                          );
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          dispatch(
                            setEdit({
                              edit: false,
                              body: post[0].body,
                            })
                          )
                        }
                      >
                        Cancel
                      </Button>
                    </Space>
                  </>
                ) : (
                  <span>{post[0].body}</span>
                )}
              </Card>
              <div
                size="middle"
                style={{
                  marginTop: 35,
                  marginLeft: 5,
                }}
              >
                <Button
                  style={{ cursor: "pointer",width:"80px" }}
                  type="primary"
                  disabled={edit}
                  danger
                  onClick={() => dispatch(deletePost({ id: post[0].id }))}
                >
                  Delete
                </Button>

                <Button
                  type="primary"
                  style={{ cursor: "pointer",width:"80px",marginLeft:"4px" }}
                  onClick={() =>
                    dispatch(
                      setEdit({
                        edit: true,
                        body: post[0].body,
                      })
                    )
                  }
                >
                  Edit{" "}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserPost;

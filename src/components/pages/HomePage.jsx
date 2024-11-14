import React, { useEffect } from "react";
import { Container } from "../index";
import { useDispatch, useSelector } from "react-redux";
// import { getPostsThunk } from "../../features/postSlice";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { postsArr } = useSelector((state) => state.post);
  const authstatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPostsThunk());
  // }, []);

  if (authstatus) {
    if (postsArr && postsArr.length === 0) {
      return (
        <div className="text-center">
          <p>No posts are availbale to show</p>
        </div>
      );
    } else {
      return (
        <>
          <Container childElemClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-20">
            {postsArr.map((post) => (
              <Link to={`/post/${post.slug}`} key={post.$id}>
                <PostCard post={post} />
              </Link>
            ))}
          </Container>
        </>
      );
    }
  } else {
    return (
      <div className="text-center">
        <p>Login to read post!</p>
        <p>
          Don't have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    );
  }
}

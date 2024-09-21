import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, logout, fetchBlogPosts, createBlogPost } from "./services/api";
import Login from "./components/Login";
import BlogPosts from "./components/BlogPosts";
import CreateBlogPost from "./components/CreateBlogPost";
import Navbar from "./components/Navbar";
import UpdateBlogPost from "./components/UpdateBlogPost";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchBlogPosts(token)
        .then(setPosts)
        .catch((error) => {
          console.error("Error fetching posts:", error);
          toast.error("Failed to fetch posts");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleLogin = async (email, password) => {
    try {
      const { token, user } = await login(email, password);
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logout(token);
        toast.success("Logout successful!");
      }
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await createBlogPost(postData);
      setPosts([...posts, postData]);
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Create post error:", error);
      toast.error("Failed to create post.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <ToastContainer />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/login"
            element={
              token ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />
            }
          />
          <Route
            path="/"
            element={
              token ? <BlogPosts posts={posts} setPosts={setPosts} token={token} />
              : <Navigate to="/login" />
            }
          />
          <Route
            path="/create-post"
            element={
              token ? (
                <CreateBlogPost
                  token={token}
                  setPosts={setPosts}
                  posts={posts}
                  handleCreatePost={handleCreatePost}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/update-post/:id"
            element={
              token ? (
                <UpdateBlogPost
                  token={token}
                  posts={posts}
                  setPosts={setPosts}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

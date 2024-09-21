import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteBlogPost } from "../services/api";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogPosts = ({ posts, setPosts, token }) => {
    const [selectedPost, setSelectedPost] = useState(null);

    const handleDelete = async () => {
        try {
            if (selectedPost) {
                await deleteBlogPost(selectedPost.id, token);
                toast.success('Blog post deleted successfully!');
                setPosts(posts.filter((post) => post.id !== selectedPost.id));
                setSelectedPost(null);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error(error.toString() || 'Failed to delete blog post.');
        }
    };

    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="card mb-3" style={{ backgroundColor: "antiquewhite"}}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <div className="d-flex justify-content-between">
                                <Link
                                    to={`/update-post/${post.id}`}
                                    className="btn btn-secondary"
                                >
                                    <FontAwesomeIcon icon={faEdit} className="me-1" /> Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className="me-1" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">
                    No blog posts available.
                </div>
            )}

            {selectedPost && (
                <div className="modal fade show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedPost(null)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete the post titled "{selectedPost.title}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedPost(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogPosts;

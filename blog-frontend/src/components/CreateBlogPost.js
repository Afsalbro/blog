import React, { useState } from 'react';
import { createBlogPost } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateBlogPost = ({ token, setPosts, posts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost = await createBlogPost(title, content, token);
            setPosts([newPost, ...posts]); 
            setTitle('');
            setContent('');
            toast.success('Post Created successfully!');
            navigate('/');
        } catch (err) {
            setError('Failed to create the post');
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2 className="text-center">Create New Blog Post</h2>
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Content</label>
                        <textarea
                            className="form-control"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlogPost;
